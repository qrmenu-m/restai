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
  Star
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'description' | 'review';
}

export const LiveAiTestModal: React.FC<Props> = ({ isOpen, onClose, initialMode = 'description' }) => {
  const [activeTab, setActiveTab] = useState<'description' | 'review'>(initialMode);
  
  // Tab 1 State: Dish Description
  const [dishName, setDishName] = useState('Плов Чайханский с бараниной и казы');
  const [ingredients, setIngredients] = useState('Отборный рис лазер, сочная баранина, желтая морковь, зира, нут, чеснок и казы');
  const [category, setCategory] = useState('Горячие блюда и плов');
  const [dishLoading, setDishLoading] = useState(false);
  const [generatedDishResult, setGeneratedDishResult] = useState<any>(null);

  // Tab 2 State: Review Responder
  const [rating, setRating] = useState(2);
  const [guestName, setGuestName] = useState('Азамат');
  const [reviewText, setReviewText] = useState('Пришли на обед в 13:30, долго ждали плов и компот закончился. Сам лагман вкусный, но в час пик не справляетесь.');
  const [reviewLoading, setReviewLoading] = useState(false);
  const [generatedReviewResult, setGeneratedReviewResult] = useState<any>(null);

  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerateDish = async () => {
    setDishLoading(true);
    setGeneratedDishResult(null);

    try {
      const res = await fetch('/api/ai/describe-dish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishName, ingredients, category })
      });
      const data = await res.json();
      if (data.data) {
        setGeneratedDishResult(data.data);
      }
    } catch (e) {
      // Fallback
      setGeneratedDishResult({
        shortDescription: `Нежнейшая томленая конина на бархатистом тесте ручной раскатки под золотистым луковым соусом туздык.`,
        fullDescription: `Блюдо томится на медленном огне более 4 часов, сохраняя сочность и раскрывая благородный аромат традиционных специй. Подается с согревающей пиалой прозрачного сорпового бульона.`,
        flavorProfile: `Глубокий мясной с нежными пряными нотами`,
        pairingSuggestion: `Традиционный черный чай с чабрецом или насыщенное красное вино`,
        upsellHook: `«Шеф сегодня рекомендует томленую конину — мясо буквально тает»`
      });
    } finally {
      setDishLoading(false);
    }
  };

  const handleGenerateReview = async () => {
    setReviewLoading(true);
    setGeneratedReviewResult(null);

    try {
      const res = await fetch('/api/ai/respond-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, guestName, reviewText, restaurantName: 'Resto Luxury' })
      });
      const data = await res.json();
      if (data.data) {
        setGeneratedReviewResult(data.data);
      }
    } catch (e) {
      // Fallback
      setGeneratedReviewResult({
        replyText: `Здравствуйте, ${guestName}! Благодарим за честную обратную связь. Мы искренне сожалеем, что визит оставил смешанные впечатления. Для нашей команды это повод стать лучше. Напишите нам в WhatsApp: +7 (708) 655-85-18 — мы хотим лично загладить впечатление и угостить вас при следующем визите!`,
        sentiment: 'negative',
        actionItem: 'Проверить скорость обслуживания и стандарты кухни'
      });
    } finally {
      setReviewLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-[#121217] border border-[#C9A15A]/40 shadow-2xl overflow-hidden my-auto">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#171720] border-b border-[#252532]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C9A15A]/20 border border-[#C9A15A]/40 flex items-center justify-center text-[#C9A15A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F1EA]">Интерактивный AI Тест-Драйв</h3>
              <p className="text-[11px] text-[#A3A3A8]">Проверьте генерацию ресторанных текстов в реальном времени</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#20202B] hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#22222D] bg-[#0E0E12] px-6 pt-3 gap-2">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'description'
                ? 'border-[#C9A15A] text-[#C9A15A]'
                : 'border-transparent text-[#A3A3A8] hover:text-[#F5F1EA]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-описания для меню</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'review'
                ? 'border-[#6FA98A] text-[#6FA98A]'
                : 'border-transparent text-[#A3A3A8] hover:text-[#F5F1EA]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Авто-ответ на отзыв 2GIS</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* TAB 1: MENU DESCRIPTION */}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-[#A3A3A8]">
                  <span>Быстрые пресеты:</span>
                  <button 
                    onClick={() => { setDishName('Плов Чайханский с казы'); setIngredients('Рис лазер, баранина, казы, желтая морковь, зира, барбарис'); setCategory('Горячие блюда'); }}
                    className="px-2 py-0.5 rounded bg-[#1C1C26] hover:bg-[#252534] text-[#E6C280] text-[10px]"
                  >
                    🍲 Плов
                  </button>
                  <button 
                    onClick={() => { setDishName('Комбо-ланч #2 (Борщ + Пюре с котлетой)'); setIngredients('Наваристый украинский борщ со сметаной, нежное картофельное пюре, сочная домашняя котлета из говядины, морс'); setCategory('Комплексные обеды'); }}
                    className="px-2 py-0.5 rounded bg-[#1C1C26] hover:bg-[#252534] text-[#E6C280] text-[10px]"
                  >
                    🍱 Комплекс
                  </button>
                  <button 
                    onClick={() => { setDishName('Донер в лаваше с курицей'); setIngredients('Хрустящий лаваш, сочная курица на вертеле, свежие томаты, маринованные огурцы, авторский чесночный соус'); setCategory('Фастфуд / Выпечка'); }}
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
                  <span>{dishLoading ? 'Генерируем описание...' : 'Сгенерировать AI-описание'}</span>
                </button>
              </div>

              {/* Generated Result Container */}
              {generatedDishResult && (
                <div className="p-4 rounded-xl bg-[#161620] border border-[#C9A15A]/40 space-y-3 mt-4 text-xs animate-fadeIn">
                  <div className="flex items-center justify-between pb-2 border-b border-[#252534]">
                    <span className="font-mono-code font-bold text-[#C9A15A]">ГОТОВОЕ ОПИСАНИЕ ДЛЯ QR-МЕНЮ:</span>
                    <button
                      onClick={() => copyToClipboard(generatedDishResult.shortDescription || generatedDishResult.fullDescription)}
                      className="px-2.5 py-1 rounded bg-[#20202D] hover:bg-[#2A2A3C] text-[11px] text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#6FA98A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-[#F5F1EA] leading-relaxed">
                    {generatedDishResult.shortDescription}
                  </p>

                  <p className="text-xs text-[#D1D1D6] leading-relaxed">
                    {generatedDishResult.fullDescription}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] font-mono-code">
                    <div className="p-2 rounded bg-[#0D0D12] border border-[#22222E]">
                      <span className="text-[#A3A3A8] block">🍷 Пейринг напитка:</span>
                      <strong className="text-[#E6C280]">{generatedDishResult.pairingSuggestion}</strong>
                    </div>
                    <div className="p-2 rounded bg-[#0D0D12] border border-[#22222E]">
                      <span className="text-[#A3A3A8] block">💡 Допродажа официантом:</span>
                      <strong className="text-[#6FA98A]">{generatedDishResult.upsellHook}</strong>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: REVIEW RESPONDER */}
          {activeTab === 'review' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    Оценка гостя (звезды):
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 transition-all ${
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
                <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                  Текст отзыва на 2GIS / Яндекс:
                </label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#6FA98A] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleGenerateReview}
                  disabled={reviewLoading || !reviewText}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6FA98A] to-[#4E876A] hover:brightness-110 text-[#0B0B0D] font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{reviewLoading ? 'Составляем ответ...' : 'Сгенерировать ответ заведения'}</span>
                </button>
              </div>

              {/* Generated Result Container */}
              {generatedReviewResult && (
                <div className="p-4 rounded-xl bg-[#141816] border border-[#6FA98A]/40 space-y-3 mt-4 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#222E26]">
                    <span className="font-mono-code font-bold text-[#6FA98A]">ОТВЕТ УПРАВЛЯЮЩЕГО ДЛЯ 2GIS:</span>
                    <button
                      onClick={() => copyToClipboard(generatedReviewResult.replyText)}
                      className="px-2.5 py-1 rounded bg-[#1C2520] hover:bg-[#24332B] text-[11px] text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#6FA98A]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                    </button>
                  </div>

                  <p className="text-xs text-[#F5F1EA] leading-relaxed">
                    {generatedReviewResult.replyText}
                  </p>

                  {generatedReviewResult.actionItem && (
                    <div className="p-2 rounded bg-[#0E1310] border border-[#202E26] text-[11px] font-mono-code text-[#A3A3A8]">
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
