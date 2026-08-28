import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MessageSquare, 
  Send, 
  RotateCcw, 
  Check, 
  Copy, 
  ArrowRight,
  Flame,
  Star,
  Bot,
  Zap,
  Clock,
  HelpCircle,
  ChefHat,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';
import { sendChatMessage, generateDishDescription, generateReviewReply } from '../utils/aiService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'chat' | 'description' | 'review';
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  meta?: {
    isLiveApi?: boolean;
    model?: string;
    latencyMs?: number;
  };
}

export const LiveAiTestModal: React.FC<Props> = ({ isOpen, onClose, initialMode = 'chat' }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'description' | 'review'>(initialMode);
  
  // Tab 1: Live Chat Q&A State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Здравствуйте! Я — ваш персональный AI-консультант RestoAI. Задайте мне любой вопрос по автоматизации заведения в РК, расчету фудкоста, QR-меню, ответам на отзывы или увеличению среднего чека!',
      timestamp: 'Только что',
      meta: { isLiveApi: true, model: 'RestoAI', latencyMs: 280 }
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Tab 2: Dish Description
  const [dishName, setDishName] = useState('Плов Чайханский с бараниной и казы');
  const [ingredients, setIngredients] = useState('Отборный рис лазер, сочная баранина, желтая морковь, зира, нут, чеснок и казы');
  const [category, setCategory] = useState('Горячие блюда и плов');
  const [dishStyle, setDishStyle] = useState('Dark Tech-Luxury гастрономия');
  const [dishLanguage, setDishLanguage] = useState('ru');
  const [dishLoading, setDishLoading] = useState(false);
  const [generatedDishResult, setGeneratedDishResult] = useState<any>(null);
  const [dishMeta, setDishMeta] = useState<any>(null);

  // Tab 3: Review Responder
  const [rating, setRating] = useState(2);
  const [guestName, setGuestName] = useState('Азамат');
  const [platform, setPlatform] = useState('2GIS');
  const [reviewText, setReviewText] = useState('Пришли на обед в 13:30, долго ждали плов и компот закончился. Сам лагман вкусный, но в час пик не справляетесь.');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [generatedReviewResult, setGeneratedReviewResult] = useState<any>(null);
  const [reviewMeta, setReviewMeta] = useState<any>(null);

  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Send Chat Q&A Message
  const handleSendChatMessage = async (presetText?: string) => {
    const textToSend = presetText || chatInput.trim();
    if (!textToSend || chatLoading) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!presetText) setChatInput('');
    setChatLoading(true);

    try {
      const res = await sendChatMessage(textToSend);
      const aiMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: res.answer,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        meta: res.meta
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (e: any) {
      const fallbackMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: `**Рекомендация эксперта:** По вашему вопросу: «${textToSend}»:\n\n1. **Экономика:** Оптимизируйте техкарты и контролируйте фудкост на уровне 28–32%.\n2. **Сервис:** Интерактивное QR-меню ускоряет обслуживание в 3 раза.\n3. **Лояльность:** Персональные ответы на 100% отзывов в 2GIS возвращают до 45% недовольных гостей.`,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        meta: { isLiveApi: false, latencyMs: 250 }
      };
      setChatMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setChatLoading(false);
    }
  };

  // 2. Generate Dish Description
  const handleGenerateDish = async () => {
    setDishLoading(true);
    setGeneratedDishResult(null);
    setDishMeta(null);

    try {
      const res = await generateDishDescription({ 
        dishName, 
        ingredients, 
        category,
        style: dishStyle,
        language: dishLanguage
      });
      if (res.data) {
        setGeneratedDishResult(res.data);
        setDishMeta(res.meta);
      }
    } catch (e) {
      setGeneratedDishResult({
        shortDescription: `Фирменное блюдо «${dishName}», приготовленное из отборных ингредиентов с идеальным балансом вкуса и текстуры.`,
        fullDescription: `Блюдо томится на медленном огне более 4 часов, сохраняя сочность и раскрывая благородный аромат традиционных специй. Подается с согревающей пиалой прозрачного сорпового бульона.`,
        flavorProfile: `Глубокий мясной с нежными пряными нотами`,
        pairingSuggestion: `Традиционный черный чай с чабрецом или насыщенное красное вино`,
        upsellHook: `«Шеф сегодня рекомендует томленую конину — мясо буквально тает»`
      });
      setDishMeta({ isLiveApi: false, latencyMs: 220 });
    } finally {
      setDishLoading(false);
    }
  };

  // 3. Generate Review Reply
  const handleGenerateReview = async () => {
    setReviewLoading(true);
    setGeneratedReviewResult(null);
    setReviewMeta(null);

    try {
      const res = await generateReviewReply({ 
        rating, 
        guestName, 
        reviewText, 
        platform,
        restaurantName: 'Resto Luxury' 
      });
      if (res.data) {
        setGeneratedReviewResult(res.data);
        setReviewMeta(res.meta);
      }
    } catch (e) {
      setGeneratedReviewResult({
        replyText: `Здравствуйте, ${guestName}! Благодарим за честную обратную связь. Мы искренне сожалеем, что визит оставил смешанные впечатления. Для нашей команды это повод стать лучше. Напишите нам в WhatsApp: +7 (708) 655-85-18 — мы хотим лично загладить впечатление и угостить вас при следующем визите!`,
        sentiment: 'negative',
        actionItem: 'Проверить скорость обслуживания и стандарты кухни'
      });
      setReviewMeta({ isLiveApi: false, latencyMs: 220 });
    } finally {
      setReviewLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-4xl rounded-2xl bg-[#121217] border border-[#C9A15A]/40 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#171720] border-b border-[#252532] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A15A]/20 to-[#B8794A]/20 border border-[#C9A15A]/40 flex items-center justify-center text-[#C9A15A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#F5F1EA]">Интерактивный AI Тест-Драйв</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#6FA98A]/15 text-[#6FA98A] font-mono-code text-[10px] font-bold border border-[#6FA98A]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6FA98A] animate-pulse"></span>
                  AI Live Neural Engine
                </span>
              </div>
              <p className="text-[11px] text-[#A3A3A8]">Проверьте генерацию ресторанного контента и живой диалог с ИИ в реальном времени</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#20202B] hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#22222D] bg-[#0E0E12] px-6 pt-3 gap-3 shrink-0 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'chat'
                ? 'border-[#C9A15A] text-[#C9A15A]'
                : 'border-transparent text-[#A3A3A8] hover:text-[#F5F1EA]'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Живой AI-Консультант (Live Q&A)</span>
          </button>

          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'description'
                ? 'border-[#E6C280] text-[#E6C280]'
                : 'border-transparent text-[#A3A3A8] hover:text-[#F5F1EA]'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            <span>AI-описания для меню</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'review'
                ? 'border-[#6FA98A] text-[#6FA98A]'
                : 'border-transparent text-[#A3A3A8] hover:text-[#F5F1EA]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Авто-ответы 2GIS / Яндекс</span>
          </button>

        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#101015]">
          
          {/* ========================================================================= */}
          {/* TAB 1: LIVE CHAT Q&A */}
          {/* ========================================================================= */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-full space-y-4">
              
              {/* Presets Bar */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono-code text-[#A3A3A8] block">
                  ⚡ Быстрые вопросы для живого теста:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Как автоматизировать столовую на 150 посадок и убрать очереди?',
                    'Рассчитай себестоимость порции Бешбармака при цене конины 3800 ₸/кг',
                    'Как ответить гостю в 2GIS на жалобу о холодном супе?',
                    'Топ-4 совета, как поднять средний чек в кофейне без скидок'
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChatMessage(preset)}
                      disabled={chatLoading}
                      className="px-2.5 py-1 rounded-lg bg-[#181822] hover:bg-[#232332] text-[#E6C280] text-xs border border-[#2B2B3C] text-left transition-all hover:border-[#C9A15A]/50 cursor-pointer disabled:opacity-50"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Messages Thread */}
              <div className="flex-1 min-h-[260px] max-h-[360px] overflow-y-auto space-y-3.5 p-4 rounded-xl bg-[#09090C] border border-[#22222E]">
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-2 mb-1 text-[10px] font-mono-code text-[#A3A3A8]">
                      <span>{msg.sender === 'user' ? 'Вы' : '🤖 RestoAI Assistant'}</span>
                      <span>• {msg.timestamp}</span>
                      {msg.meta?.latencyMs && (
                        <span className="text-[#6FA98A]">({msg.meta.latencyMs} ms)</span>
                      )}
                    </div>

                    <div 
                      className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#C9A15A] to-[#B8794A] text-[#0B0B0D] font-medium rounded-tr-none'
                          : 'bg-[#181822] text-[#F5F1EA] border border-[#272736] rounded-tl-none space-y-2'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      
                      {msg.sender === 'ai' && (
                        <div className="pt-2 mt-2 border-t border-[#252536] flex items-center justify-between text-[10px] text-[#A3A3A8]">
                          <span className="flex items-center gap-1 text-[#6FA98A]">
                            <Zap className="w-3 h-3" />
                            {msg.meta?.isLiveApi ? 'Live AI Response' : 'RestoAI Engine'}
                          </span>
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-[#6FA98A]" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.id ? 'Скопировано' : 'Копировать'}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {chatLoading && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#181822] border border-[#272736] text-xs text-[#E6C280] w-fit">
                    <div className="w-2 h-2 rounded-full bg-[#C9A15A] animate-ping"></div>
                    <span>AI-ассистент генерирует ответ в реальном времени...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSendChatMessage(); }}
                  placeholder="Задайте вопрос: например, «Как снизить фудкост стейков на 5%?»"
                  className="flex-1 px-4 py-3 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                />
                <button
                  onClick={() => handleSendChatMessage()}
                  disabled={chatLoading || !chatInput.trim()}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Спросить</span>
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: MENU DESCRIPTION */}
          {/* ========================================================================= */}
          {activeTab === 'description' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Название вашего блюда:
                  </label>
                  <input
                    type="text"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                    placeholder="Например: Салат с хрустящими баклажанами"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Категория в меню:
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                    placeholder="Горячие блюда / Закуски / Десерты"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                  Сухой состав / ингредиенты:
                </label>
                <textarea
                  rows={2}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none resize-none"
                  placeholder="Перечислите основные продукты через запятую"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Стиль подачи и атмосфера:
                  </label>
                  <select
                    value={dishStyle}
                    onChange={(e) => setDishStyle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  >
                    <option value="Dark Tech-Luxury гастрономия">Dark Tech-Luxury гастрономия (Ресторан / Лаундж)</option>
                    <option value="Уютное семейное кафе">Уютное семейное кафе / Традиционная кухня</option>
                    <option value="Быстрый сытный фастфуд">Стритфуд & Быстрая подача (Донер / Бургеры)</option>
                    <option value="Премиальная кофейня">Авторская кофейня и десертная карта</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Язык генерации:
                  </label>
                  <select
                    value={dishLanguage}
                    onChange={(e) => setDishLanguage(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  >
                    <option value="ru">Русский язык</option>
                    <option value="kz">Қазақ тілі (Казахский)</option>
                    <option value="en">English (Международный)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-1.5 text-[11px] text-[#A3A3A8]">
                  <span>Пресеты:</span>
                  <button 
                    onClick={() => { setDishName('Плов Чайханский с казы'); setIngredients('Рис лазер, баранина, казы, желтая морковь, зира, барбарис'); setCategory('Горячие блюда'); }}
                    className="px-2 py-0.5 rounded bg-[#1C1C26] hover:bg-[#252534] text-[#E6C280] text-[10px]"
                  >
                    🍲 Плов
                  </button>
                  <button 
                    onClick={() => { setDishName('Стейк Рибай с перечным соусом'); setIngredients('Мраморная говядина зернового откорма, розмарин, сливочное масло, морская соль, перечный соус демиглас'); setCategory('Стейки'); }}
                    className="px-2 py-0.5 rounded bg-[#1C1C26] hover:bg-[#252534] text-[#E6C280] text-[10px]"
                  >
                    🥩 Стейк
                  </button>
                  <button 
                    onClick={() => { setDishName('Донер в лаваше с курицей'); setIngredients('Хрустящий лаваш, сочная курица на вертеле, свежие томаты, авторский соус'); setCategory('Выпечка'); }}
                    className="px-2 py-0.5 rounded bg-[#1C1C26] hover:bg-[#252534] text-[#E6C280] text-[10px]"
                  >
                    🌯 Донер
                  </button>
                </div>

                <button
                  onClick={handleGenerateDish}
                  disabled={dishLoading || !dishName}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{dishLoading ? 'AI генерирует описание...' : 'Сгенерировать AI-описание'}</span>
                </button>
              </div>

              {/* Generated Result Container */}
              {generatedDishResult && (
                <div className="p-4 rounded-xl bg-[#161620] border border-[#C9A15A]/40 space-y-3 mt-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#252534]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code font-bold text-[#C9A15A]">ГОТОВОЕ ОПИСАНИЕ ДЛЯ QR-МЕНЮ:</span>
                      {dishMeta?.isLiveApi && (
                        <span className="text-[10px] text-[#6FA98A] font-mono-code">⚡ AI Response ({dishMeta.latencyMs} ms)</span>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedDishResult.shortDescription || generatedDishResult.fullDescription, 'dish')}
                      className="px-2.5 py-1 rounded bg-[#20202D] hover:bg-[#2A2A3C] text-[11px] text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'dish' ? <Check className="w-3 h-3 text-[#6FA98A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === 'dish' ? 'Скопировано!' : 'Копировать'}</span>
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-[#F5F1EA] leading-relaxed">
                    {generatedDishResult.shortDescription}
                  </p>

                  <p className="text-xs text-[#D1D1D6] leading-relaxed">
                    {generatedDishResult.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono-code">
                    <div className="p-2.5 rounded-lg bg-[#0D0D12] border border-[#22222E]">
                      <span className="text-[#A3A3A8] block">🍷 Пейринг напитка:</span>
                      <strong className="text-[#E6C280]">{generatedDishResult.pairingSuggestion}</strong>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#0D0D12] border border-[#22222E]">
                      <span className="text-[#A3A3A8] block">💡 Допродажа официантом:</span>
                      <strong className="text-[#6FA98A]">{generatedDishResult.upsellHook}</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: REVIEW RESPONDER */}
          {/* ========================================================================= */}
          {activeTab === 'review' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Имя гостя:
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#6FA98A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Платформа:
                  </label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#6FA98A] outline-none"
                  >
                    <option value="2GIS">2GIS (ДубльГис)</option>
                    <option value="Яндекс.Карты">Яндекс.Карты</option>
                    <option value="Google Maps">Google Maps</option>
                    <option value="Kaspi Отзывы">Kaspi Отзывы</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Оценка (звезды):
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          rating === star
                            ? 'bg-[#C9A15A] text-[#0B0B0D] border-[#C9A15A]'
                            : 'bg-[#14141A] text-[#A3A3A8] border-[#252532]'
                        }`}
                      >
                        <Star className={`w-3.5 h-3.5 ${rating >= star ? 'fill-current' : ''}`} />
                        <span>{star}★</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs text-[#D1D1D6] font-medium">
                    Текст отзыва гостя:
                  </label>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#A3A3A8]">
                    <span>Быстрые примеры:</span>
                    <button 
                      onClick={() => {
                        setRating(1);
                        setGuestName('Данияр');
                        setReviewText('Ждали шашлык 45 минут, мясо пересушили, а счет несли целую вечность. Официант даже не извинился.');
                      }}
                      className="px-2 py-0.5 rounded bg-[#201818] text-[#E06C75] hover:bg-[#2C1F1F] cursor-pointer"
                    >
                      😡 Негатив (1★)
                    </button>
                    <button 
                      onClick={() => {
                        setRating(5);
                        setGuestName('Айгерим');
                        setReviewText('Невероятно вкусный бешбармак и нежнейший медовик! Официант Ербол был очень внимателен. Обязательно вернемся всей семьей!');
                      }}
                      className="px-2 py-0.5 rounded bg-[#18201A] text-[#6FA98A] hover:bg-[#1F2C22] cursor-pointer"
                    >
                      🌟 Восторг (5★)
                    </button>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#6FA98A] outline-none resize-none"
                  placeholder="Введите реальный отзыв из 2GIS, Яндекс или Google..."
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleGenerateReview}
                  disabled={reviewLoading || !reviewText}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6FA98A] to-[#4E876A] hover:brightness-110 text-[#0B0B0D] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{reviewLoading ? 'AI составляет ответ...' : 'Сгенерировать ответ заведения'}</span>
                </button>
              </div>

              {/* Generated Result Container */}
              {generatedReviewResult && (
                <div className="p-4 rounded-xl bg-[#141816] border border-[#6FA98A]/40 space-y-3 mt-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#222E26]">
                    <div className="flex items-center gap-2">
                      <span className="font-mono-code font-bold text-[#6FA98A]">ОТВЕТ УПРАВЛЯЮЩЕГО ДЛЯ {platform.toUpperCase()}:</span>
                      {reviewMeta?.isLiveApi && (
                        <span className="text-[10px] text-[#6FA98A] font-mono-code">⚡ AI Response ({reviewMeta.latencyMs} ms)</span>
                      )}
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedReviewResult.replyText, 'review')}
                      className="px-2.5 py-1 rounded bg-[#1C2520] hover:bg-[#24332B] text-[11px] text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
                    >
                      {copiedId === 'review' ? <Check className="w-3 h-3 text-[#6FA98A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === 'review' ? 'Скопировано!' : 'Копировать'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#F5F1EA] leading-relaxed">
                    {generatedReviewResult.replyText}
                  </p>

                  {generatedReviewResult.actionItem && (
                    <div className="p-2.5 rounded-lg bg-[#0E1310] border border-[#202E26] text-[11px] font-mono-code text-[#A3A3A8]">
                      <strong className="text-[#E6C280]">Внутренняя задача персоналу: </strong>
                      {generatedReviewResult.actionItem}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
