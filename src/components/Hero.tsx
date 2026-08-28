import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Smartphone, 
  Star, 
  MessageSquare, 
  Clock, 
  ShieldCheck, 
  ChevronRight,
  Zap,
  Activity,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';

interface Props {
  onOpenCalculator?: () => void;
  onOpenAiTestModal?: (mode?: 'chat' | 'description' | 'review') => void;
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<Props> = ({ onOpenCalculator, onOpenAiTestModal, onOpenAuditModal }) => {
  // Dynamic live metric simulation (ticking every 2.5s)
  const [revenue, setRevenue] = useState(1482600);
  const [qrOrders, setQrOrders] = useState(142);
  const [reviewsAnswered, setReviewsAnswered] = useState(38);
  const [foodCostSaved, setFoodCostSaved] = useState(194200);
  const [pulseActive, setPulseActive] = useState(false);

  const scrollToCalculator = () => {
    if (onOpenCalculator) {
      onOpenCalculator();
    } else {
      const el = document.getElementById('pricing-calculator') || document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 600);

      // Random small increment
      const roll = Math.random();
      if (roll > 0.4) {
        setRevenue(prev => prev + Math.floor(Math.random() * 8500 + 3500));
        setQrOrders(prev => prev + 1);
      }
      if (roll > 0.7) {
        setReviewsAnswered(prev => prev + 1);
      }
      if (roll > 0.5) {
        setFoodCostSaved(prev => prev + Math.floor(Math.random() * 2100 + 800));
      }
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-radial-gradient">
      
      {/* Background Subtle Tech Grid & Kazakh ornament vector backdrop */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none"></div>

      {/* Decorative ambient gold glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C9A15A]/10 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-[#B8794A]/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#17171C]/90 border border-[#C9A15A]/30 text-xs font-mono-code text-[#E6C280] shadow-[0_0_20px_rgba(201,161,90,0.12)]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C9A15A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C9A15A]"></span>
            </span>
            <span className="font-semibold tracking-wide">AI-АВТОМАТИЗАЦИЯ ДЛЯ ОБЩЕПИТА И HORECA</span>
            <span className="text-[#C9A15A] font-bold">₸</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#F5F1EA] tracking-tight leading-[1.12]">
            Единая <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F1EA] via-[#C9A15A] to-[#B8794A]">AI-экосистема</span> и QR-меню для заведений общепита и HoReCa
          </h1>

          <p className="text-[#A3A3A8] text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Создаем сайты, быстрые QR-меню и умные сервисы ресторанного уровня в <span className="text-[#F5F1EA] font-medium">3-5 раз доступнее студий</span>. 
            Увеличиваем скорость обслуживания, привлекаем гостей из 2GIS, защищаем маржинальность блюд и отправляем утренние сводки в Telegram.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md sm:max-w-xl mx-auto">
          <button
            onClick={scrollToCalculator}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-sm transition-all shadow-[0_0_30px_rgba(201,161,90,0.3)] hover:shadow-[0_0_40px_rgba(201,161,90,0.5)] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Рассчитать стоимость для заведения</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#17171D] hover:bg-[#202028] text-[#F5F1EA] border border-[#C9A15A]/30 text-sm font-semibold transition-all hover:border-[#C9A15A] flex items-center justify-center gap-2 text-center"
          >
            <span>Показать живые демки</span>
            <ChevronRight className="w-4 h-4 text-[#C9A15A]" />
          </a>
        </div>

        {/* Subtle Kazakh Ornament Divider */}
        <KazakhOrnamentDivider variant="gold" className="my-10" />

        {/* LIVE DATA VISUALIZATION HERO DASHBOARD */}
        <div className="mt-6 max-w-5xl mx-auto">
          <div className="rounded-2xl bg-gradient-to-b from-[#191920] to-[#111114] border border-[#C9A15A]/25 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Gold Header Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A15A] to-transparent"></div>

            {/* Dashboard Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#252530] text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6FA98A] animate-pulse"></div>
                <span className="font-mono-code font-bold text-[#F5F1EA]">LIVE ПОТОК ДАННЫХ ОБЩЕПИТА</span>
                <span className="px-2 py-0.5 rounded bg-[#C9A15A]/15 text-[#C9A15A] font-mono-code text-[10px] uppercase">
                  РЕАЛЬНОЕ ВРЕМЯ
                </span>
              </div>
              <div className="flex items-center gap-4 text-[#A3A3A8] font-mono-code text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#6FA98A]" />
                  <span>Отклик: <strong>0.18 сек</strong></span>
                </span>
                <span className="hidden sm:inline-block">По всему Казахстану (Алматы, Астана, Шымкент и все регионы)</span>
                <span className="text-[#C9A15A]">{pulseActive ? '● ОБНОВЛЕНИЕ ДАННЫХ' : '● СИНХРОНИЗИРОВАНО'}</span>
              </div>
            </div>

            {/* Live Metrics Grid (4 Key Telemetry Panels) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              
              {/* Metric 1: Revenue Today */}
              <div className="p-4 rounded-xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all">
                <div className="flex items-center justify-between text-xs text-[#A3A3A8] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#C9A15A]" /> Дневная выручка точки
                  </span>
                  <span className="text-[#6FA98A] font-mono-code font-bold">+18.4%</span>
                </div>
                <div className="font-mono-code text-2xl font-extrabold text-[#F5F1EA] flex items-baseline gap-1">
                  <span>{revenue.toLocaleString('ru-RU')}</span>
                  <span className="text-[#C9A15A] text-lg font-bold">₸</span>
                </div>
                <div className="text-[11px] text-[#A3A3A8] mt-1.5 flex items-center justify-between">
                  <span>Ср. чек: 1 850 ₸</span>
                  <span className="text-[#6FA98A]">Касса & POS</span>
                </div>
              </div>

              {/* Metric 2: QR Menu Orders */}
              <div className="p-4 rounded-xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all">
                <div className="flex items-center justify-between text-xs text-[#A3A3A8] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-[#E6C280]" /> Выбор по QR-меню
                  </span>
                  <span className="text-[#6FA98A] font-mono-code font-bold">0.18s отклик</span>
                </div>
                <div className="font-mono-code text-2xl font-extrabold text-[#F5F1EA] flex items-baseline gap-1">
                  <span>{qrOrders}</span>
                  <span className="text-xs text-[#A3A3A8] font-normal">гостей в очереди/зале</span>
                </div>
                <div className="text-[11px] text-[#A3A3A8] mt-1.5 flex items-center justify-between">
                  <span>Меню дня: обновлено</span>
                  <span className="text-[#C9A15A]">+28% к напиткам</span>
                </div>
              </div>

              {/* Metric 3: AI Reviews Auto-Replies */}
              <div className="p-4 rounded-xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all">
                <div className="flex items-center justify-between text-xs text-[#A3A3A8] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#B8794A]" /> Ответы в 2GIS / Карты
                  </span>
                  <span className="text-[#E6C280] font-mono-code font-bold">2GIS / Яндекс</span>
                </div>
                <div className="font-mono-code text-2xl font-extrabold text-[#F5F1EA] flex items-baseline gap-1">
                  <span>{reviewsAnswered}</span>
                  <span className="text-xs text-[#6FA98A] font-bold">отработано (100%)</span>
                </div>
                <div className="text-[11px] text-[#A3A3A8] mt-1.5 flex items-center justify-between">
                  <span>Рейтинг: <strong>4.9 ★</strong></span>
                  <span className="text-[#A3A3A8]">Скор: 1.1 сек</span>
                </div>
              </div>

              {/* Metric 4: Food Cost Protected */}
              <div className="p-4 rounded-xl bg-[#141418] border border-[#272732] hover:border-[#C9A15A]/40 transition-all">
                <div className="flex items-center justify-between text-xs text-[#A3A3A8] mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6FA98A]" /> Маржа порций
                  </span>
                  <span className="text-[#6FA98A] font-mono-code font-bold">59.2% маржа</span>
                </div>
                <div className="font-mono-code text-2xl font-extrabold text-[#6FA98A] flex items-baseline gap-1">
                  <span>+{foodCostSaved.toLocaleString('ru-RU')}</span>
                  <span className="text-[#6FA98A] text-lg font-bold">₸</span>
                </div>
                <div className="text-[11px] text-[#A3A3A8] mt-1.5 flex items-center justify-between">
                  <span>Расчет фудкоста на опте</span>
                  <span className="text-[#C9A15A]">0 кассовых дыр</span>
                </div>
              </div>

            </div>

            {/* Micro Live Event Strip */}
            <div className="mt-4 pt-3 border-t border-[#23232C] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code text-[#A3A3A8]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[#C9A15A] font-bold">{'>'}</span>
                <span className="text-[#E6C280] font-semibold">ПОСЛЕДНЕЕ СОБЫТИЕ:</span>
                <span className="truncate text-[#D1D1D6]">
                  Заказ #318 (Раздача / Стол 6): 2x Комплексный обед (Борщ + Пюре с котлетой + Компот), 2x Самса • 4 900 ₸ • Без очереди на кассе
                </span>
              </div>
              <button 
                onClick={() => onOpenAiTestModal && onOpenAiTestModal('chat')}
                className="text-[#C9A15A] hover:text-[#F5F1EA] underline text-xs font-semibold shrink-0 cursor-pointer"
              >
                Протестировать AI вживую →
              </button>
            </div>

          </div>
        </div>

        {/* 3 Quick Value Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10 text-center md:text-left">
          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#121216]/60 border border-[#22222A]">
            <div className="w-9 h-9 rounded-lg bg-[#C9A15A]/10 border border-[#C9A15A]/30 flex items-center justify-center shrink-0 text-[#C9A15A] font-bold">
              1
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F5F1EA]">Премиальный уровень за доступные деньги</h2>
              <p className="text-xs text-[#A3A3A8] mt-1">Мгновенный отклик 0.16 сек, чистота интерфейса и гибкая стилизация (включая Dark Tech стиль) без переплат.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#121216]/60 border border-[#22222A]">
            <div className="w-9 h-9 rounded-lg bg-[#B8794A]/10 border border-[#B8794A]/30 flex items-center justify-center shrink-0 text-[#B8794A] font-bold">
              2
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F5F1EA]">Гость в очереди → Раздача/Касса → Владелец</h2>
              <p className="text-xs text-[#A3A3A8] mt-1">Гости выбирают блюда заранее с телефона, кассир пробивает в 3 раза быстрее, а вы получаете сводку в Telegram.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-xl bg-[#121216]/60 border border-[#22222A]">
            <div className="w-9 h-9 rounded-lg bg-[#6FA98A]/10 border border-[#6FA98A]/30 flex items-center justify-center shrink-0 text-[#6FA98A] font-bold">
              3
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F5F1EA]">Окупаемость с первых дней работы</h2>
              <p className="text-xs text-[#A3A3A8] mt-1">Прозрачные фиксированные цены в тенге (₸) от 8 000 ₸. Внедрение за 24–48 часов под ключ.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
