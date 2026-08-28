import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client using official @google/genai SDK
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!aiClient && apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (e) {
      console.warn('Could not initialize GoogleGenAI client with provided key:', e);
    }
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    aiReady: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

// Helper for calling Gemini model with fast fallback
async function callGeminiModel(contents: string, systemInstruction?: string, isJson: boolean = false) {
  const ai = getAIClient();
  if (!ai) return null;

  const modelsToTry = ['gemini-3.7-flash', 'gemini-2.5-flash', 'gemini-3.1-flash-lite'];
  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const config: any = {
        temperature: 0.7,
      };
      if (isJson) {
        config.responseMimeType = 'application/json';
      }
      if (systemInstruction) {
        config.systemInstruction = systemInstruction;
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents,
        config,
      });

      return {
        text: response.text?.trim() || '',
        model: modelName,
      };
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${modelName} call failed, trying next fallback:`, err?.message);
    }
  }

  throw lastError || new Error('All Gemini models failed');
}

// 1. AI Menu Description Generator
app.post('/api/ai/describe-dish', async (req, res) => {
  const startTime = Date.now();
  try {
    const { dishName, ingredients, category, style, language } = req.body;

    if (!dishName) {
      return res.status(400).json({ error: 'Dish name is required' });
    }

    try {
      const prompt = `Ты — первоклассный гастрономический копирайтер и шеф-редактор ресторанных меню.
Твоя задача: составить аппетитное, продающее и уникальное описание блюда строго на основе переданных параметров.

ВХОДНЫЕ ДАННЫЕ:
- Название блюда: "${dishName}"
- Состав и ингредиенты: "${ingredients || 'авторский состав'}"
- Категория: "${category || 'Основное меню'}"
- Желаемый стиль: "${style || 'Ресторанная гастрономия'}"
- Язык ответа: "${language === 'kz' ? 'Казахский (Қазақ тілі)' : language === 'en' ? 'English' : 'Русский'}"

ТРЕБОВАНИЯ:
1. Никаких банальных штампов вроде "насладитесь незабываемым вкусом".
2. Опиши текстуру, оттенки вкуса, технологию приготовления и температуру подачи.
3. Подбери идеальный напиток (чай, морс, вино, авторский лимонад) для допродажи.
4. Дай официанту/кассиру живую рекомендацию (upsell hook) в 1 короткую фразу.

Верни ответ СТРОГО в формате JSON без markdown:
{
  "shortDescription": "Краткое продающее описание для карточки в меню (1-2 предложения)",
  "fullDescription": "Развернутое гастрономическое описание с деталями вкуса и текстуры",
  "flavorProfile": "Вкусовой профиль (например: 'Пряный, с дымными нотами и сливочным послевкусием')",
  "pairingSuggestion": "Рекомендованный напиток или соус для пейринга",
  "upsellHook": "Короткая фраза официанту для предложения гостю"
}`;

      const aiResult = await callGeminiModel(prompt, undefined, true);
      const duration = Date.now() - startTime;

      if (aiResult) {
        const parsed = JSON.parse(aiResult.text || '{}');
        return res.json({ 
          success: true, 
          data: parsed, 
          meta: { 
            isLiveApi: true, 
            model: aiResult.model,
            latencyMs: duration 
          } 
        });
      }
    } catch (genError: any) {
      console.warn('Gemini generateContent error, using smart fallback:', genError?.message);
    }

    // Smart fallback
    const duration = Date.now() - startTime;
    return res.json({
      success: true,
      data: {
        shortDescription: `Фирменное блюдо «${dishName}», приготовленное из отборных ингредиентов с идеальным балансом вкуса и текстуры.`,
        fullDescription: `Блюдо раскрывает богатую гастрономическую палитру благодаря бережной технологии приготовления, подчеркивающей натуральный вкус каждого ингредиента.`,
        flavorProfile: `Гармоничный, насыщенный с ярким послевкусием и аппетитным ароматом`,
        pairingSuggestion: `Фирменный ягодный морс, свежезаваренный чай или авторский лимонад`,
        upsellHook: `«Наш шеф рекомендует попробовать — одно из самых любимых блюд наших гостей!»`
      },
      meta: { 
        isLiveApi: false, 
        latencyMs: duration 
      }
    });
  } catch (err: any) {
    console.error('Error generating dish description:', err);
    res.status(500).json({ error: err.message || 'Failed to generate description' });
  }
});

// 2. AI Review Responder
app.post('/api/ai/respond-review', async (req, res) => {
  const startTime = Date.now();
  try {
    const { rating, guestName, reviewText, restaurantName, platform } = req.body;

    if (!reviewText) {
      return res.status(400).json({ error: 'Review text is required' });
    }

    try {
      const prompt = `Ты — опытный управляющий заведением в Казахстане с высочайшим эмоциональным интеллектом и культурой гостеприимства.
Сгенерируй живой, персональный и безупречный ответ на отзыв гостя.

ДАННЫЕ ОТЗЫВА:
- Платформа: ${platform || '2GIS'}
- Оценка: ${rating} из 5 звезд
- Имя гостя: ${guestName || 'Гость'}
- Текст отзыва: "${reviewText}"
- Заведение: "${restaurantName || 'Resto'}"

ПРАВИЛА СОСТАВЛЕНИЯ ОТВЕТА:
1. Запрещены сухие отписки ("Спасибо за ваш отзыв, мы учтем").
2. Обязательно обратись к гостю по имени.
3. Ответь ИМЕННО на то, о чем написал гость:
   - Если гость похвалил конкретное блюдо или официанта — упомяни это и передай благодарность команде.
   - Если гость пожаловался (на долгое ожидание, холодную еду, невнимательность, шум и т.д.) — искренне извинись без оправданий, покажи, что проблема уже передана шефу/администратору смены, и дай прямой контакт (WhatsApp) для компенсации и комплимента при следующем визите.
4. Тон ответа: тактичный, уважительный, дружелюбный, живой.

Верни ответ СТРОГО в формате JSON без markdown:
{
  "replyText": "Полный текст ответа гостю",
  "sentiment": "positive | negative | neutral",
  "actionItem": "Конкретная управленческая задача смене (например: 'Проверить время отдачи горячих блюд в пик с 13:00 до 15:00')",
  "responseTimeSeconds": 1.1
}`;

      const aiResult = await callGeminiModel(prompt, undefined, true);
      const duration = Date.now() - startTime;

      if (aiResult) {
        const parsed = JSON.parse(aiResult.text || '{}');
        return res.json({ 
          success: true, 
          data: parsed,
          meta: {
            isLiveApi: true,
            model: aiResult.model,
            latencyMs: duration
          }
        });
      }
    } catch (genError: any) {
      console.warn('Gemini review generation error, using smart fallback:', genError?.message);
    }

    const isPositive = Number(rating) >= 4;
    const duration = Date.now() - startTime;
    return res.json({
      success: true,
      data: {
        replyText: isPositive
          ? `Здравствуйте, ${guestName || 'дорогой гость'}! Благодарим вас за высокую оценку и теплые слова. Нашей команде невероятно приятно, что визит доставил вам удовольствие. Обязательно заглядывайте к нам снова на новинки сезона!`
          : `Здравствуйте, ${guestName || 'дорогой гость'}. Приносим самые искренние извинения за испорченное впечатление. Ситуация, о которой вы написали, совершенно недопустима для наших стандартов. Мы уже передали ваши замечания управляющему и шеф-повару. Напишите нам в WhatsApp по номеру +7 (708) 655-85-18 — мы хотим лично принести извинения и угостить вас при следующем визите.`,
        sentiment: isPositive ? 'positive' : 'negative',
        actionItem: isPositive ? 'Передать благодарность смене кухни и зала' : 'Связаться с гостем для персонального комплимента',
        responseTimeSeconds: 1.1
      },
      meta: {
        isLiveApi: false,
        latencyMs: duration
      }
    });
  } catch (err: any) {
    console.error('Error responding to review:', err);
    res.status(500).json({ error: err.message || 'Failed to respond to review' });
  }
});

// 3. Live AI Restaurant Consultant & Q&A Assistant
app.post('/api/ai/chat', async (req, res) => {
  const startTime = Date.now();
  try {
    const { message, category = 'general', context = '' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemInstruction = `Ты — живой, остроумный и высококвалифицированный эксперт по ресторанному бизнесу и цифровизации HoReCa в Казахстане (RestoAI).

ТВОЯ МАНЕРА ОБЩЕНИЯ:
- Если пользователь просто здоровается ("даров", "привет", "салам", "хай", "как дела", "здарова"): отвечай тепло, живо, по-человечески (например: "Салем! / Привет! Рад слышать. Чем помочь твоему заведению? Рассказывай: нужно навести порядок в меню, убрать очереди, посчитать фудкост или подтянуть отзывы в 2GIS?").
- Если задан вопрос по фудкосту, меню, очередям, персоналу, продвижению: давай емкие, профессиональные, практичные советы с конкретными примерами, цифрами в тенге (₸) и процентах.
- Структурируй длинные ответы четкими пунктами, избегай пустой "воды" и канцелярщины.
- Отлично разбирайся в специфике общепита Алматы, Астаны, Шымкента и всего Казахстана (2GIS, Kaspi Pay, обеды для БЦ, национальные и европейские блюда, поставки мяса и продуктов).`;

    try {
      const userPrompt = `Сообщение пользователя: "${message}"\n${category ? `Категория: ${category}` : ''}\n${context ? `Контекст: ${context}` : ''}`;
      const aiResult = await callGeminiModel(userPrompt, systemInstruction, false);
      const duration = Date.now() - startTime;

      if (aiResult) {
        return res.json({
          success: true,
          answer: aiResult.text,
          meta: {
            isLiveApi: true,
            model: aiResult.model,
            latencyMs: duration,
            timestamp: new Date().toISOString()
          }
        });
      }
    } catch (genError: any) {
      console.warn('Gemini chat error, using smart fallback:', genError?.message);
    }

    const duration = Date.now() - startTime;
    const lowerMsg = message.toLowerCase();
    let smartReply = '';

    if (lowerMsg.includes('привет') || lowerMsg.includes('салам') || lowerMsg.includes('здравствуй') || lowerMsg.includes('хай') || lowerMsg.includes('даров')) {
      smartReply = 'Салем! Рад знакомству. Я — AI-консультант RestoAI. Чем могу помочь вашему заведению? Могу рассчитать фудкост блюд, настроить мгновенное QR-меню, оптимизировать автоответы в 2GIS или подготовить расчет внедрения.';
    } else if (lowerMsg.includes('тариф') || lowerMsg.includes('цена') || lowerMsg.includes('стоимость') || lowerMsg.includes('сколько')) {
      smartReply = 'У нас действуют гибкие тарифы под любой формат:\n• **Базовый старт (QR-меню)** — от 45 000 ₸ разово\n• **Smart HoReCa (Меню + AI-описания + 2GIS + Бот)** — 125 000 ₸\n• **Full AI Ecosystem (Все 6 модулей с техкартами и дайджестом)** — 210 000 ₸.\n\nВы также можете выбрать отдельные опции в интерактивном калькуляторе на сайте!';
    } else if (lowerMsg.includes('меню') || lowerMsg.includes('qr') || lowerMsg.includes('кьюар')) {
      smartReply = 'Наше QR-меню открывается за рекордные 0.18 сек без скачивания приложений, поддерживает стоп-листы в 1 клик, авто-перевод на казахский/английский и сочные AI-описания блюд, поднимающие средний чек на 15–20%.';
    } else if (lowerMsg.includes('отзыв') || lowerMsg.includes('2gis') || lowerMsg.includes('2гис') || lowerMsg.includes('яндекс') || lowerMsg.includes('карты')) {
      smartReply = 'Модуль авто-ответов на отзывы анализирует тональность, благодарит за высокие оценки и бережно отрабатывает негатив за 60 секунд, предотвращая слив репутации в 2GIS и Google Maps.';
    } else if (lowerMsg.includes('фудкост') || lowerMsg.includes('техкарт') || lowerMsg.includes('себестоим') || lowerMsg.includes('маржа')) {
      smartReply = 'ИИ-техкарты автоматически пересчитывают себестоимость при каждом изменении цен у поставщиков мяса и овощей. Если маржа порции падает ниже 65%, система сразу сигнализирует шефу и владельцу.';
    } else {
      smartReply = `**Рекомендация эксперта RestoAI:**\n\nПо вашему запросу: *«${message}»*\n\n1. **Экономика и маржинальность:** Оптимизируйте техкарты и зафиксируйте фудкост на уровне 28–34%.\n2. **Скорость обслуживания:** Внедрите электронное QR-меню со стоп-листами для ускорения посадки.\n3. **Увеличение среднего чека:** Настройте умные гастрономические допродажи и комбо-обеды.\n4. **Репутация в 2GIS:** Отвечайте на отзывы персонально в течение 15 минут.`;
    }

    return res.json({
      success: true,
      answer: smartReply,
      meta: {
        isLiveApi: false,
        latencyMs: duration,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err: any) {
    console.error('Error handling AI chat:', err);
    res.status(500).json({ error: err.message || 'Failed to handle chat message' });
  }
});

// 4. Lead & Audit Request
app.post('/api/lead', async (req, res) => {
  try {
    const { name, phone, establishment, city, servicesSelected, message } = req.body;
    console.log('New restaurant audit request:', { name, phone, establishment, city, servicesSelected, message });
    res.json({
      success: true,
      message: 'Заявка на аудит принята. Мы свяжемся с вами в течение 15 минут!'
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to submit lead' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`RestoAI luxury web server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

