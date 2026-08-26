import React, { useState, useEffect } from 'react';
import { 
  Smartphone, 
  Calculator, 
  Sparkles, 
  MessageSquare, 
  Send, 
  TrendingUp, 
  Check, 
  Flame, 
  RefreshCw, 
  Star, 
  Clock, 
  ArrowRight,
  AlertCircle,
  Eye,
  Sliders,
  DollarSign,
  ShieldAlert,
  Bot,
  Layers,
  UtensilsCrossed
} from 'lucide-react';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';

interface Props {
  onOpenCalculator: (serviceId?: string) => void;
  onOpenAiTest: (mode?: 'description' | 'review') => void;
}

export const BentoServices: React.FC<Props> = ({ onOpenCalculator, onOpenAiTest }) => {
  
  // ----------------------------------------------------
  // DEMO 1: QR MENU STATE & INTERACTION FOR CANTEENS / CAFES
  // ----------------------------------------------------
  const [qrCategory, setQrCategory] = useState<'lunches' | 'hot' | 'bakery'>('lunches');
  const [lagmanInStopList, setLagmanInStopList] = useState(false);
  const [qrCartCount, setQrCartCount] = useState(2);

  const qrDishes = {
    lunches: [
      { id: 'l1', name: 'Комплекс #1 (Борщ + Пюре с котлетой + Компот)', price: '1 900 ₸', time: '1 мин', hot: true, inStop: false },
      { id: 'l2', name: 'Лагман уйгурский цомян (жареный)', price: '1 850 ₸', time: '5 мин', hot: false, inStop: lagmanInStopList },
    ],
    hot: [
      { id: 'h1', name: 'Плов праздничный с бараниной 350г', price: '2 100 ₸', time: '1 мин', hot: true, inStop: false },
      { id: 'h2', name: 'Донер с сочной говядиной в лаваше', price: '1 600 ₸', time: '3 мин', hot: true, inStop: false },
    ],
    bakery: [
      { id: 'b1', name: 'Самса тандырная с рубленым мясом', price: '550 ₸', time: '1 мин', hot: true, inStop: false },
      { id: 'b2', name: 'Чай ташкентский с лимоном (чайник)', price: '900 ₸', time: '2 мин', hot: false, inStop: false },
    ]
  };

  // ----------------------------------------------------
  // DEMO 2: AI TECHCARDS & COST RECALCULATION
  // ----------------------------------------------------
  const [selectedDishCost, setSelectedDishCost] = useState<'plov' | 'lunch' | 'doner'>('plov');
  const [supplierPriceDelta, setSupplierPriceDelta] = useState<number>(6); // +6%
  
  const dishCostBaselines = {
    plov: { name: 'Плов праздничный (350г)', baseRaw: 720, menuPrice: 2100, ingredient: 'Баранина + Рис лазер' },
    lunch: { name: 'Комплексный обед дня', baseRaw: 650, menuPrice: 1900, ingredient: 'Мясо на котлеты + Овощи' },
    doner: { name: 'Донер с говядиной', baseRaw: 540, menuPrice: 1600, ingredient: 'Говядина на вертеле' },
  };

  const activeDish = dishCostBaselines[selectedDishCost];
  const calculatedRawCost = Math.round(activeDish.baseRaw * (1 + supplierPriceDelta / 100));
  const calculatedFoodCostPct = ((calculatedRawCost / activeDish.menuPrice) * 100).toFixed(1);
  const netMargin = activeDish.menuPrice - calculatedRawCost;

  // ----------------------------------------------------
  // DEMO 3: AI MENU DESCRIPTIONS (BEFORE / AFTER)
  // ----------------------------------------------------
  const [descTab, setDescTab] = useState<'after' | 'before'>('after');
  const [typedDesc, setTypedDesc] = useState('');
  const fullAiText = 'Рассыпчатый золотистый рис сорта Лазер с отборной томленой бараниной, сладкой желтой морковью, ташкентским нутом и пряной горной зирой. Подается со свежим салатом Ачучук.';

  useEffect(() => {
    if (descTab === 'after') {
      let i = 0;
      setTypedDesc('');
      const interval = setInterval(() => {
        if (i < fullAiText.length) {
          setTypedDesc(fullAiText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 16);
      return () => clearInterval(interval);
    }
  }, [descTab]);

  // ----------------------------------------------------
  // DEMO 4: AI REVIEW RESPONDER (2GIS / MAPS)
  // ----------------------------------------------------
  const [reviewMode, setReviewMode] = useState<'negative' | 'positive'>('negative');
  const [reviewGenerating, setReviewGenerating] = useState(false);
  const [reviewReplied, setReviewReplied] = useState(true);

  const handleReviewSwitch = (mode: 'negative' | 'positive') => {
    setReviewMode(mode);
    setReviewGenerating(true);
    setReviewReplied(false);
    setTimeout(() => {
      setReviewGenerating(false);
      setReviewReplied(true);
    }, 1000);
  };

  // ----------------------------------------------------
  // DEMO 5: TELEGRAM BOT (LUNCHES & PREORDERS)
  // ----------------------------------------------------
  const [tgMessages, setTgMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string }>>([
    { sender: 'user', text: 'Здравствуйте! Что сегодня на комплексный обед?', time: '11:28' },
    { sender: 'bot', text: 'Добрый день! Сегодня в ланче: Наваристый борщ, нежное пюре с сочной котлетой, витаминный салат и ягодный компот. Стоимость комбо — всего 1 900 ₸!', time: '11:28' }
  ]);

  const handleTgAction = (actionText: string, botReply: string) => {
    setTgMessages(prev => [
      ...prev,
      { sender: 'user', text: actionText, time: '11:29' },
      { sender: 'bot', text: botReply, time: '11:29' }
    ]);
  };

  return (
    <section id="services" className="py-20 md:py-28 relative bg-[#0B0B0D]">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9A15A]/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#B8794A]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17171C] border border-[#C9A15A]/30 text-xs font-mono-code text-[#C9A15A]">
            <Layers className="w-3.5 h-3.5" />
            <span>BENTO GRID DASHBOARD — 6 МОДУЛЕЙ АВТОМАТИЗАЦИИ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1EA] tracking-tight">
            Интерактивная карта <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A15A] to-[#B8794A]">для заведений общепита и HoReCa</span>
          </h2>

          <p className="text-[#A3A3A8] text-sm sm:text-base">
            Попробуйте живые мини-демки прямо внутри карточек. Никаких статичных картинок — только реальная работа интерфейсов.
          </p>
        </div>

        {/* BENTO GRID: 2 Flagships (large) + 4 Focused modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ========================================================================= */}
          {/* CARD 1: QR-МЕНЮ (FLAGSHIP - SPAN 7) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 relative overflow-hidden flex flex-col justify-between group">
            
            {/* Top Info Header */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A15A]/15 border border-[#C9A15A]/30 flex items-center justify-center text-[#C9A15A]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F1EA]">Быстрое QR-меню и каталог блюд</h3>
                    <p className="text-xs text-[#A3A3A8]">Увеличение скорости выбора и разгрузка персонала</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#6FA98A]/15 text-[#6FA98A] border border-[#6FA98A]/30 text-xs font-mono-code font-bold">
                  0.18s ОТКЛИК
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#D1D1D6] mb-4">
                Гости сканируют QR-код со смартфона, моментально видят меню с качественными фото и составом, а администратор обновляет стоп-лист в 1 клик.
              </p>

              {/* Price Tag Pill */}
              <div className="flex flex-wrap items-center gap-3 p-2.5 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-5">
                <div>
                  <span className="text-[#A3A3A8]">Запуск под ключ: </span>
                  <strong className="text-[#F5F1EA]">25 000 – 40 000 ₸</strong>
                </div>
                <span className="text-[#272732]">|</span>
                <div>
                  <span className="text-[#A3A3A8]">Поддержка: </span>
                  <strong className="text-[#C9A15A]">3 000 – 5 000 ₸ / мес</strong>
                </div>
              </div>
            </div>

            {/* LIVE MINI-DEMO: PHONE MOCKUP WITH REALTIME STOP-LIST */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 relative">
              
              {/* Demo Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1E1E26] text-xs">
                <span className="font-mono-code text-[11px] text-[#A3A3A8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#6FA98A]"></span>
                  <span>ДЕМО-МЕНЮ (РЕСТОРАН / КАФЕ / HORECA)</span>
                </span>
                
                {/* Manager Stop-List Trigger */}
                <button
                  onClick={() => setLagmanInStopList(!lagmanInStopList)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono-code font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    lagmanInStopList 
                      ? 'bg-[#B8794A]/20 text-[#E6C280] border border-[#B8794A]/50' 
                      : 'bg-[#1E1E26] text-[#A3A3A8] hover:text-[#F5F1EA]'
                  }`}
                >
                  <Sliders className="w-3 h-3" />
                  <span>{lagmanInStopList ? 'Шеф: Лагман в СТОП-ЛИСТЕ ✕' : 'Тест: Скрыть Лагман в Стоп-лист'}</span>
                </button>
              </div>

              {/* Phone Simulator Layout */}
              <div className="space-y-3">
                
                {/* Categories Tab Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <button 
                    onClick={() => setQrCategory('lunches')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      qrCategory === 'lunches' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#17171C] text-[#A3A3A8] hover:text-[#F5F1EA]'
                    }`}
                  >
                    🍲 Обеды и ланчи
                  </button>
                  <button 
                    onClick={() => setQrCategory('hot')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      qrCategory === 'hot' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#17171C] text-[#A3A3A8] hover:text-[#F5F1EA]'
                    }`}
                  >
                    🥩 Плов и донеры
                  </button>
                  <button 
                    onClick={() => setQrCategory('bakery')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                      qrCategory === 'bakery' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#17171C] text-[#A3A3A8] hover:text-[#F5F1EA]'
                    }`}
                  >
                    🥟 Самса и чай
                  </button>
                </div>

                {/* Dish Cards in Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {qrDishes[qrCategory].map(dish => (
                    <div 
                      key={dish.id} 
                      className={`p-3 rounded-lg border transition-all ${
                        dish.inStop 
                          ? 'bg-[#121215]/50 border-red-900/30 opacity-50' 
                          : 'bg-[#14141A] border-[#22222D] hover:border-[#C9A15A]/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-xs font-semibold text-[#F5F1EA] line-clamp-1">{dish.name}</span>
                        {dish.inStop && (
                          <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 text-[9px] font-mono-code font-bold shrink-0">
                            ЗАКОНЧИЛОСЬ
                          </span>
                        )}
                        {dish.hot && !dish.inStop && (
                          <span className="px-1.5 py-0.5 rounded bg-[#C9A15A]/15 text-[#C9A15A] text-[9px] font-mono-code font-bold shrink-0">
                            ХИТ ДНЯ
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1C1C24] text-xs">
                        <span className="font-mono-code font-extrabold text-[#E6C280]">{dish.price}</span>
                        <button 
                          disabled={dish.inStop}
                          onClick={() => setQrCartCount(prev => prev + 1)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                            dish.inStop 
                              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                              : 'bg-[#C9A15A]/20 hover:bg-[#C9A15A] text-[#E6C280] hover:text-[#0B0B0D]'
                          }`}
                        >
                          + В поднос
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Simulated Order Bar */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-[#191922] border border-[#272734] text-xs font-mono-code">
                  <span className="text-[#A3A3A8]">Выбор гостя ({qrCartCount} блюда)</span>
                  <span className="text-[#6FA98A] font-bold">Раздатчик видит заказ ✓</span>
                </div>

              </div>

            </div>

            {/* Bottom CTA */}
            <div className="mt-4 pt-4 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">Примеры: FreshFish, Sabr Cafe, SUDO</span>
              <button 
                onClick={() => onOpenCalculator('qr-menu')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Выбрать тариф QR-меню</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CARD 2: ИИ-ТЕХКАРТЫ & СЕБЕСТОИМОСТЬ (FLAGSHIP - SPAN 5) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 relative overflow-hidden flex flex-col justify-between group">
            
            {/* Top Info Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#B8794A]/15 border border-[#B8794A]/30 flex items-center justify-center text-[#B8794A]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#F5F1EA]">ИИ-техкарты и маржа порций</h3>
                    <p className="text-xs text-[#A3A3A8]">Контроль фудкоста при скачках цен на опте</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#D1D1D6] mb-3">
                Подорожало мясо, масло или мука на оптовом рынке? ИИ мгновенно пересчитывает себестоимость порции и маржу.
              </p>

              {/* Price Tag Pill */}
              <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-4">
                <div>
                  <span className="text-[#A3A3A8]">Внедрение: </span>
                  <strong className="text-[#F5F1EA]">30 000 – 50 000 ₸</strong>
                </div>
                <span className="text-[#272732]">|</span>
                <div>
                  <span className="text-[#C9A15A]">5 000 – 10 000 ₸/мес</span>
                </div>
              </div>
            </div>

            {/* LIVE MINI-DEMO: INTERACTIVE COST SIMULATOR */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 space-y-3">
              
              {/* Dish Selector */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#A3A3A8] font-mono-code">ПОЗИЦИЯ:</span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setSelectedDishCost('plov')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      selectedDishCost === 'plov' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#181820] text-[#A3A3A8]'
                    }`}
                  >
                    Плов
                  </button>
                  <button 
                    onClick={() => setSelectedDishCost('lunch')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      selectedDishCost === 'lunch' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#181820] text-[#A3A3A8]'
                    }`}
                  >
                    Ланч
                  </button>
                  <button 
                    onClick={() => setSelectedDishCost('doner')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      selectedDishCost === 'doner' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'bg-[#181820] text-[#A3A3A8]'
                    }`}
                  >
                    Донер
                  </button>
                </div>
              </div>

              {/* Slider for Supplier Price Increase */}
              <div className="space-y-1 bg-[#14141A] p-2.5 rounded-lg border border-[#22222D]">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-[#D1D1D6] text-[11px]">Закуп сырья ({activeDish.ingredient}):</span>
                  <span className={`font-bold ${supplierPriceDelta > 0 ? 'text-[#B8794A]' : 'text-[#6FA98A]'}`}>
                    {supplierPriceDelta > 0 ? `+${supplierPriceDelta}%` : `${supplierPriceDelta}%`}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="-10" 
                  max="30" 
                  value={supplierPriceDelta} 
                  onChange={(e) => setSupplierPriceDelta(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#252530] rounded-lg appearance-none cursor-pointer accent-[#C9A15A]"
                />
              </div>

              {/* Calculated Results */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <div className="p-2.5 rounded-lg bg-[#14141A] border border-[#22222D]">
                  <span className="text-[10px] text-[#A3A3A8] block">СЕБЕСТОИМОСТЬ ПОРЦИИ</span>
                  <strong className="text-sm font-extrabold text-[#F5F1EA]">{calculatedRawCost} ₸</strong>
                  <span className="text-[10px] text-[#B8794A] block">Фудкост: {calculatedFoodCostPct}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#14141A] border border-[#22222D]">
                  <span className="text-[10px] text-[#A3A3A8] block">ЧИСТАЯ МАРЖА</span>
                  <strong className="text-sm font-extrabold text-[#6FA98A]">+{netMargin} ₸</strong>
                  <span className="text-[10px] text-[#A3A3A8] block">Цена: {activeDish.menuPrice} ₸</span>
                </div>
              </div>

              {/* Terminal Log Snippet */}
              <div className="p-2 rounded bg-[#09090B] border border-[#1C1C24] text-[10px] font-mono-code text-[#A3A3A8] truncate">
                <span className="text-[#C9A15A]">{'>'}</span> alert: {activeDish.name} пересчитан ({calculatedFoodCostPct}% фудкост)
              </div>

            </div>

            {/* Bottom CTA */}
            <div className="mt-4 pt-4 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">Синхронизация с кассой</span>
              <button 
                onClick={() => onOpenCalculator('techcards-cost')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Подключить техкарты</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CARD 3: AI-ОПИСАНИЯ ДЛЯ МЕНЮ (SPAN 6) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#C9A15A]/15 border border-[#C9A15A]/30 flex items-center justify-center text-[#C9A15A]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F5F1EA]">Аппетитные AI-описания блюд</h3>
                    <p className="text-xs text-[#A3A3A8]">Сухие ингредиенты → Сочное описание, вызывающее аппетит</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#C9A15A]/15 text-[#C9A15A] text-[10px] font-mono-code font-bold">
                  +18% К ЧЕКУ
                </span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-4">
                <span>Меню: <strong className="text-[#F5F1EA]">8 000 – 15 000 ₸</strong></span>
                <span className="text-[#272732]">|</span>
                <span>Позиция: <strong className="text-[#C9A15A]">250 – 400 ₸ / блюдо</strong></span>
              </div>
            </div>

            {/* LIVE DEMO: BEFORE VS AFTER TYPEWRITER */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono-code text-[#A3A3A8]">Позиция: «Праздничный плов»</span>
                <div className="flex items-center p-0.5 rounded-lg bg-[#191922] border border-[#272732]">
                  <button
                    onClick={() => setDescTab('before')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                      descTab === 'before' ? 'bg-[#272732] text-[#F5F1EA]' : 'text-[#A3A3A8]'
                    }`}
                  >
                    До (сухой текст)
                  </button>
                  <button
                    onClick={() => setDescTab('after')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-all flex items-center gap-1 ${
                      descTab === 'after' ? 'bg-[#C9A15A] text-[#0B0B0D]' : 'text-[#A3A3A8]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>AI Режим</span>
                  </button>
                </div>
              </div>

              <div className="min-h-[90px] p-3 rounded-lg bg-[#14141A] border border-[#22222D] text-xs leading-relaxed">
                {descTab === 'before' ? (
                  <p className="text-[#A3A3A8] font-mono-code">
                    «Рис лазер, мясо баранина, морковь желтая, нут, изюм, лук, зира, масло. Вес: 350г.»
                  </p>
                ) : (
                  <p className="text-[#F5F1EA]">
                    {typedDesc}
                    <span className="inline-block w-1.5 h-3 bg-[#C9A15A] ml-1 animate-pulse"></span>
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#A3A3A8]">
                <span className="text-[#6FA98A] flex items-center gap-1">
                  <Check className="w-3 h-3" /> Стимулирует взять выпечку и напиток
                </span>
                <button
                  onClick={() => onOpenAiTest('description')}
                  className="text-[#C9A15A] hover:underline cursor-pointer"
                >
                  Ввести свое блюдо →
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">Языки: RU, KZ, EN</span>
              <button 
                onClick={() => onOpenCalculator('ai-menu-descriptions')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Заказать AI-описания</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 4: АВТО-ОТВЕТЫ НА ОТЗЫВЫ (SPAN 6) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#6FA98A]/15 border border-[#6FA98A]/30 flex items-center justify-center text-[#6FA98A]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F5F1EA]">Авто-ответы на отзывы 2GIS и Карты</h3>
                    <p className="text-xs text-[#A3A3A8]">Привлечение офисных работников на обеды 24/7</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#6FA98A]/15 text-[#6FA98A] text-[10px] font-mono-code font-bold">
                  ОТКЛИК 1.1 СЕК
                </span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-4">
                <span>Настройка: <strong className="text-[#F5F1EA]">15 000 – 25 000 ₸</strong></span>
                <span className="text-[#272732]">|</span>
                <span>Абонплата: <strong className="text-[#C9A15A]">5 000 – 8 000 ₸ / мес</strong></span>
              </div>
            </div>

            {/* LIVE DEMO: REVIEWS RESPONSE SIMULATION */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 space-y-3">
              
              {/* Review Type Switcher */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono-code text-[10px] font-bold">2GIS</span>
                  <span className="text-xs text-[#A3A3A8]">Отзыв гостя:</span>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleReviewSwitch('negative')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      reviewMode === 'negative' ? 'bg-amber-900/80 text-amber-200' : 'bg-[#181820] text-[#A3A3A8]'
                    }`}
                  >
                    Замечание 2★
                  </button>
                  <button 
                    onClick={() => handleReviewSwitch('positive')}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
                      reviewMode === 'positive' ? 'bg-[#6FA98A] text-[#0B0B0D]' : 'bg-[#181820] text-[#A3A3A8]'
                    }`}
                  >
                    Похвала 5★
                  </button>
                </div>
              </div>

              {/* Guest Review Card */}
              <div className="p-2.5 rounded-lg bg-[#14141A] border border-[#22222D] text-xs space-y-1">
                <div className="flex items-center justify-between text-[#A3A3A8]">
                  <span className="font-semibold text-[#F5F1EA]">
                    {reviewMode === 'negative' ? 'Ерлан Б.' : 'Айсулу К.'}
                  </span>
                  <div className="flex text-[#C9A15A]">
                    {reviewMode === 'negative' ? '★★☆☆☆' : '★★★★★'}
                  </div>
                </div>
                <p className="text-[#A3A3A8] italic">
                  {reviewMode === 'negative' 
                    ? '«В обед в 13:20 была большая очередь на кассе, плов уже остывал. Хотя порция большая.»' 
                    : '«Всегда обедаем здесь всем отделом! Очень сытно, плов и лагман просто бомба, цены честные!»'}
                </p>
              </div>

              {/* AI Auto-Answer */}
              <div className="p-2.5 rounded-lg bg-[#171720] border border-[#C9A15A]/30 text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-[#C9A15A] font-mono-code font-bold">
                  <span>AI ОТВЕТ ЗАВЕДЕНИЯ ({reviewGenerating ? 'Генерация...' : 'Отправлен за 1.1с'})</span>
                  <span className="text-[#6FA98A]">✓ Опубликован</span>
                </div>
                <p className="text-[#F5F1EA] text-[11px] leading-relaxed">
                  {reviewGenerating ? (
                    <span className="text-[#A3A3A8] animate-pulse">Анализ тональности и мгновенная генерация вежливого ответа...</span>
                  ) : reviewMode === 'negative' ? (
                    '«Ерлан, добрый день! Спасибо за обратную связь. Мы уже вывели второго кассира в пик с 13:00 до 14:00 и настроили подогрев линии раздачи. Приходите завтра — угостим вас фирменным чаем с самсой!»'
                  ) : (
                    '«Айсулу, спасибо огромное всей вашей команде! Готовим каждое утро только из свежего мяса на чистом масле. Всегда рады накормить вас горячим и сытным обедом!»'
                  )}
                </p>
              </div>

            </div>

            <div className="mt-4 pt-3 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">ТОП-3 в 2GIS по району</span>
              <button 
                onClick={() => onOpenCalculator('ai-reviews')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Подключить 2GIS / Яндекс</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 5: TELEGRAM-БОТ РАССЫЛКИ ЛАНЧЕЙ И ПРЕДЗАКАЗА (SPAN 6) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#2AABEE]/15 border border-[#2AABEE]/30 flex items-center justify-center text-[#2AABEE]">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F5F1EA]">Telegram-бот: Меню ланчей и самовывоз</h3>
                    <p className="text-xs text-[#A3A3A8]">Рассылка обедов в 11:30 и предзаказ без очередей</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#2AABEE]/15 text-[#2AABEE] text-[10px] font-mono-code font-bold">
                  ЛАНЧИ & ПРЕДЗАКАЗ
                </span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-4">
                <span>Сборка: <strong className="text-[#F5F1EA]">15 000 – 20 000 ₸</strong></span>
                <span className="text-[#272732]">|</span>
                <span>ТО: <strong className="text-[#C9A15A]">3 000 – 5 000 ₸ / мес</strong></span>
              </div>
            </div>

            {/* LIVE DEMO: TELEGRAM INTERACTIVE CHAT */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1E26] text-xs font-mono-code text-[#A3A3A8]">
                <span>@Stolovaya_Lunch_Bot</span>
                <span className="text-[#6FA98A]">online</span>
              </div>

              {/* Chat Bubble Scroll */}
              <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1 text-xs">
                {tgMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-xl max-w-[85%] ${
                      msg.sender === 'user' 
                        ? 'ml-auto bg-[#C9A15A] text-[#0B0B0D] font-medium rounded-br-none' 
                        : 'mr-auto bg-[#181822] text-[#F5F1EA] border border-[#272734] rounded-bl-none'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{msg.text}</p>
                    <span className={`text-[9px] block text-right mt-1 ${msg.sender === 'user' ? 'text-black/60' : 'text-zinc-500'}`}>
                      {msg.time} ✓✓
                    </span>
                  </div>
                ))}
              </div>

              {/* Interactive Quick Buttons */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  onClick={() => handleTgAction('🍲 Меню обеда на сегодня', 'Сегодня на ланче: Борщ со сметаной, Плов праздничный, салат Витаминный, компот из сухофруктов. Комплекс всего 1 900 ₸!')}
                  className="p-1.5 rounded-lg bg-[#16161E] hover:bg-[#20202C] text-[#E6C280] border border-[#272734] text-[11px] font-mono-code transition-all text-center"
                >
                  🍲 Меню дня (обед)
                </button>
                <button
                  onClick={() => handleTgAction('📦 Предзаказ навынос к 13:00', 'Ваш предзаказ #42 принят! Соберем к 13:00 в термобоксах без очереди на кассе.')}
                  className="p-1.5 rounded-lg bg-[#16161E] hover:bg-[#20202C] text-[#E6C280] border border-[#272734] text-[11px] font-mono-code transition-all text-center"
                >
                  📦 Заказ навынос
                </button>
                <button
                  onClick={() => handleTgAction('📍 Как пройти к вам?', 'Мы находимся: 1 этаж БЦ "Алатау", вход со двора. Маршрут в 2GIS: https://2gis.kz/...')}
                  className="p-1.5 rounded-lg bg-[#16161E] hover:bg-[#20202C] text-[#D1D1D6] border border-[#272734] text-[11px] font-mono-code transition-all text-center"
                >
                  📍 2GIS Маршрут
                </button>
                <button
                  onClick={() => handleTgAction('🏷 Скидка после 17:30', 'Каждый день с 17:30 скидка -30% на всю выпечку и готовые блюда раздачи!')}
                  className="p-1.5 rounded-lg bg-[#16161E] hover:bg-[#20202C] text-[#D1D1D6] border border-[#272734] text-[11px] font-mono-code transition-all text-center"
                >
                  🏷 Скидка -30%
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">Авто-рассылка соседним офисам</span>
              <button 
                onClick={() => onOpenCalculator('tg-bot')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Создать бота</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CARD 6: УТРЕННИЙ ИИ-ДАЙДЖЕСТ 08:00 (SPAN 6) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 rounded-2xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E6C280]/15 border border-[#E6C280]/30 flex items-center justify-center text-[#E6C280]">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#F5F1EA]">Утренний отчёт владельцу в 08:00</h3>
                    <p className="text-xs text-[#A3A3A8]">Выручка, проданные порции и остаток кассы в Telegram</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E6C280]/15 text-[#E6C280] text-[10px] font-mono-code font-bold">
                  08:00 AM ОТЧЕТ
                </span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-xl bg-[#0F0F12] border border-[#22222A] text-xs font-mono-code mb-4">
                <span>Интеграция: <strong className="text-[#F5F1EA]">20 000 – 30 000 ₸</strong></span>
                <span className="text-[#272732]">|</span>
                <span>Аналитика: <strong className="text-[#C9A15A]">8 000 – 12 000 ₸ / мес</strong></span>
              </div>
            </div>

            {/* LIVE DEMO: 08:00 AM TELEGRAM NOTIFICATION CARD */}
            <div className="rounded-xl bg-[#0B0B0D] border border-[#22222A] p-4 space-y-2.5 font-mono-code text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#1E1E26] text-[#A3A3A8] text-[11px]">
                <span className="text-[#C9A15A] font-bold">📊 СВОДКА ЗА ВЧЕРА (ОТЧЕТ В 08:00)</span>
                <span>Доставлено владельцу ✓</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#D1D1D6] leading-relaxed bg-[#14141B] p-3 rounded-lg border border-[#22222E]">
                <div className="flex justify-between">
                  <span className="text-[#A3A3A8]">💰 Выручка за сутки:</span>
                  <strong className="text-[#6FA98A] font-extrabold">580 400 ₸ (+16%)</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A3A3A8]">👥 Пробито чеков:</span>
                  <span className="text-[#F5F1EA]">318 чеков (ср. чек 1 820 ₸)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A3A3A8]">👑 Топ по марже:</span>
                  <span className="text-[#E6C280]">Плов (85 порций), Донер (64 шт)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A3A3A8]">⭐️ Новых отзывов 2GIS:</span>
                  <span className="text-[#F5F1EA]">4 (все 5★, отвечены за 1.1с)</span>
                </div>
                <div className="mt-2 pt-2 border-t border-[#22222E] text-[11px] text-[#A3A3A8]">
                  <strong className="text-[#C9A15A]">💡 AI-СОВЕТ:</strong> «Закуп говядины на оптовке вырос на 4%. Фудкост порции лагмана поднялся. Рекомендуем кассирам активнее предлагать комбо с напитками».
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#22222A] flex items-center justify-between">
              <span className="text-xs text-[#A3A3A8]">Без ручного сведения тетрадей и Excel</span>
              <button 
                onClick={() => onOpenCalculator('daily-digest')}
                className="text-xs font-bold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1 cursor-pointer"
              >
                <span>Подключить отчеты</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
