import React, { useState } from 'react';
import { 
  Calculator as CalcIcon, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Send, 
  Clock, 
  TrendingUp, 
  DollarSign,
  ShieldCheck,
  Zap,
  HelpCircle
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';

interface Props {
  onOpenAuditModal: (customData?: any) => void;
}

export const PricingAndCalculator: React.FC<Props> = ({ onOpenAuditModal }) => {
  
  // Interactive Calculator State
  const [selectedServices, setSelectedServices] = useState<{ [key: string]: boolean }>({
    'qr-menu': true,
    'ai-menu-descriptions': true,
    'ai-reviews': true,
    'techcards-cost': false,
    'tg-bot': true,
    'daily-digest': false,
  });

  const [dishCount, setDishCount] = useState<number>(45);

  const toggleService = (id: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Pricing calculation
  const calculateTotal = () => {
    let oneTimeMin = 0;
    let oneTimeMax = 0;
    let monthlyMin = 0;
    let monthlyMax = 0;

    SERVICES_DATA.forEach(service => {
      if (selectedServices[service.id]) {
        if (service.id === 'ai-menu-descriptions') {
          // based on dish count or full menu
          oneTimeMin += Math.min(15000, 8000 + dishCount * 150);
          oneTimeMax += Math.min(25000, 15000 + dishCount * 250);
        } else {
          oneTimeMin += service.oneTimePriceMin;
          oneTimeMax += service.oneTimePriceMax;
          monthlyMin += service.monthlyPriceMin;
          monthlyMax += service.monthlyPriceMax;
        }
      }
    });

    return { oneTimeMin, oneTimeMax, monthlyMin, monthlyMax };
  };

  const totals = calculateTotal();
  const activeCount = Object.values(selectedServices).filter(Boolean).length;

  const applyPackage = (pkg: 'start' | 'optimum' | 'full') => {
    if (pkg === 'start') {
      setSelectedServices({
        'qr-menu': true,
        'ai-menu-descriptions': false,
        'ai-reviews': false,
        'techcards-cost': false,
        'tg-bot': true,
        'daily-digest': false,
      });
    } else if (pkg === 'optimum') {
      setSelectedServices({
        'qr-menu': true,
        'ai-menu-descriptions': true,
        'ai-reviews': true,
        'techcards-cost': false,
        'tg-bot': true,
        'daily-digest': false,
      });
    } else {
      setSelectedServices({
        'qr-menu': true,
        'ai-menu-descriptions': true,
        'ai-reviews': true,
        'techcards-cost': true,
        'tg-bot': true,
        'daily-digest': true,
      });
    }
  };

  const handleOrderWithCalculation = () => {
    const selectedNames = SERVICES_DATA
      .filter(s => selectedServices[s.id])
      .map(s => s.title);

    onOpenAuditModal({
      servicesSelected: selectedNames,
      dishCount,
      estimatedOneTime: `${totals.oneTimeMin.toLocaleString('ru-RU')} – ${totals.oneTimeMax.toLocaleString('ru-RU')} ₸`,
      estimatedMonthly: `${totals.monthlyMin.toLocaleString('ru-RU')} – ${totals.monthlyMax.toLocaleString('ru-RU')} ₸/мес`
    });
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17171C] border border-[#C9A15A]/30 text-xs font-mono-code text-[#C9A15A]">
            <CalcIcon className="w-3.5 h-3.5" />
            <span>ПРОЗРАЧНЫЙ ПРАЙС-ЛИСТ И КАЛЬКУЛЯТОР</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1EA] tracking-tight">
            Стоимость услуг <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A15A] to-[#B8794A]">без скрытых наценок</span>
          </h2>

          <p className="text-[#A3A3A8] text-sm sm:text-base">
            Четкое разделение на разовую настройку под ключ и необременительную абонентскую плату.
          </p>
        </div>

        {/* 3 PRE-CONFIGURED BUNDLE PACKAGES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* PACKAGE 1: START */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-[#272734] hover:border-[#C9A15A]/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono-code font-bold text-[#A3A3A8] uppercase tracking-wider block mb-1">
                ТАРИФ 01
              </span>
              <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">«Старт QR + Бот»</h3>
              <p className="text-xs text-[#A3A3A8] mb-5">
                Идеально для быстрого запуска электронного меню и разгрузки администратора.
              </p>

              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-[#22222A] mb-5 space-y-1 font-mono-code">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Разово:</span>
                  <strong className="text-[#F5F1EA] text-sm">40 000 – 60 000 ₸</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Поддержка:</span>
                  <strong className="text-[#C9A15A]">6 000 – 10 000 ₸/мес</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#D1D1D6] mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Интерактивное QR-меню (0.18s)
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Моментальный стоп-лист
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Telegram-бот визитка (бронь и адрес)
                </div>
                <div className="flex items-center gap-2 text-zinc-500 line-through">
                  <Check className="w-3.5 h-3.5 text-zinc-700" /> AI-описания блюд
                </div>
                <div className="flex items-center gap-2 text-zinc-500 line-through">
                  <Check className="w-3.5 h-3.5 text-zinc-700" /> Авто-ответы 2GIS / Яндекс
                </div>
              </div>
            </div>

            <button
              onClick={() => applyPackage('start')}
              className="w-full py-2.5 rounded-xl bg-[#1D1D26] hover:bg-[#282834] text-[#F5F1EA] text-xs font-bold border border-[#333342] transition-all cursor-pointer text-center"
            >
              Загрузить в калькулятор
            </button>
          </div>

          {/* PACKAGE 2: OPTIMUM (POPULAR) */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-[#1A1A22] to-[#121216] border-2 border-[#C9A15A] relative flex flex-col justify-between shadow-[0_0_35px_rgba(201,161,90,0.18)]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#C9A15A] to-[#B8794A] text-[#0B0B0D] font-mono-code font-extrabold text-[10px] uppercase tracking-wider shadow-md whitespace-nowrap">
              ★ ВЫБОР РЕСТОРАНОВ И HORECA
            </div>

            <div>
              <span className="text-xs font-mono-code font-bold text-[#C9A15A] uppercase tracking-wider block mb-1">
                ТАРИФ 02
              </span>
              <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">«Smart HoReCa & Bistro»</h3>
              <p className="text-xs text-[#D1D1D6] mb-5">
                Полный комплекс сервиса: интерактивное меню, аппетитные тексты блюд, Telegram-бот и отзывы 2GIS.
              </p>

              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-[#C9A15A]/30 mb-5 space-y-1 font-mono-code">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Разово:</span>
                  <strong className="text-[#F5F1EA] text-sm">63 000 – 95 000 ₸</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Поддержка:</span>
                  <strong className="text-[#C9A15A]">11 000 – 18 000 ₸/мес</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#F5F1EA] mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Интерактивное QR-меню (0.18s)
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Продающие AI-описания всего меню
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Авто-ответы на отзывы 2GIS / Яндекс
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C9A15A]" /> Telegram-бот визитка с бронью и меню
                </div>
                <div className="flex items-center gap-2 text-zinc-500 line-through">
                  <Check className="w-3.5 h-3.5 text-zinc-700" /> ИИ-техкарты себестоимости
                </div>
              </div>
            </div>

            <button
              onClick={() => applyPackage('optimum')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] text-xs font-extrabold shadow-lg transition-all cursor-pointer text-center"
            >
              Выбрать Smart HoReCa & Bistro
            </button>
          </div>

          {/* PACKAGE 3: FULL AI ECOSYSTEM */}
          <div className="p-6 rounded-2xl bg-[#141418] border border-[#272734] hover:border-[#C9A15A]/40 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <span className="text-xs font-mono-code font-bold text-[#E6C280] uppercase tracking-wider block mb-1">
                ТАРИФ 03
              </span>
              <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">«Full AI Ecosystem»</h3>
              <p className="text-xs text-[#A3A3A8] mb-5">
                Максимальная автоматизация: меню, отзывы, пересчет маржи и утренний отчет в 08:00.
              </p>

              <div className="p-3 rounded-xl bg-[#0B0B0E] border border-[#22222A] mb-5 space-y-1 font-mono-code">
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Разово:</span>
                  <strong className="text-[#F5F1EA] text-sm">113 000 – 175 000 ₸</strong>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#A3A3A8]">Поддержка:</span>
                  <strong className="text-[#C9A15A]">24 000 – 40 000 ₸/мес</strong>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#D1D1D6] mb-6">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6FA98A]" /> Все 6 сервисов платформы
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6FA98A]" /> ИИ-техкарты и автопересчет фудкоста
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6FA98A]" /> Ежедневный дайджест в 08:00 владельцу
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6FA98A]" /> Персональный менеджер внедрения
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#6FA98A]" /> Приоритетный SLA 24/7
                </div>
              </div>
            </div>

            <button
              onClick={() => applyPackage('full')}
              className="w-full py-2.5 rounded-xl bg-[#1D1D26] hover:bg-[#282834] text-[#F5F1EA] text-xs font-bold border border-[#333342] transition-all cursor-pointer text-center"
            >
              Загрузить в калькулятор
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE CUSTOM CALCULATOR */}
        {/* ========================================================================= */}
        <div className="rounded-2xl bg-gradient-to-b from-[#16161D] to-[#101014] border border-[#C9A15A]/30 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            
            {/* Left Column: Service Checkboxes & Sliders */}
            <div className="w-full lg:w-7/12 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono-code text-[#C9A15A] mb-1">
                  <CalcIcon className="w-3.5 h-3.5" />
                  <span>ИНДИВИДУАЛЬНЫЙ КОНФИГУРАТОР ЗАВЕДЕНИЯ</span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F1EA]">
                  Соберите персональный набор модулей
                </h3>
                <p className="text-xs text-[#A3A3A8] mt-1">
                  Включайте только те сервисы, которые необходимы вашему ресторану, кафе или заведению прямо сейчас.
                </p>
              </div>

              {/* Service Selection Toggles */}
              <div className="space-y-2.5">
                {SERVICES_DATA.map(service => {
                  const isChecked = !!selectedServices[service.id];
                  return (
                    <div 
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-[#181822] border-[#C9A15A]/50 shadow-[0_0_15px_rgba(201,161,90,0.1)]' 
                          : 'bg-[#111116] border-[#22222D] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                          isChecked 
                            ? 'bg-[#C9A15A] border-[#C9A15A] text-[#0B0B0D]' 
                            : 'border-zinc-700 bg-zinc-900'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#F5F1EA]">{service.title}</h4>
                          <span className="text-[11px] text-[#A3A3A8] line-clamp-1">{service.shortDesc}</span>
                        </div>
                      </div>

                      <div className="text-right font-mono-code text-xs shrink-0">
                        <strong className="text-[#F5F1EA] block">{service.oneTimePriceRange}</strong>
                        <span className="text-[10px] text-[#C9A15A] block">{service.monthlyPriceRange}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Slider for Menu Size */}
              {selectedServices['ai-menu-descriptions'] && (
                <div className="p-4 rounded-xl bg-[#111116] border border-[#22222D] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-[#D1D1D6]">Количество блюд в меню для AI-описаний:</span>
                    <strong className="text-[#C9A15A] text-sm">{dishCount} позиций</strong>
                  </div>
                  <input 
                    type="range"
                    min="15"
                    max="150"
                    step="5"
                    value={dishCount}
                    onChange={(e) => setDishCount(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#252530] rounded-lg appearance-none cursor-pointer accent-[#C9A15A]"
                  />
                  <div className="flex justify-between text-[10px] font-mono-code text-[#A3A3A8]">
                    <span>15 блюд (Кофейня / Бар)</span>
                    <span>45 блюд (Кафе / Ресторан)</span>
                    <span>150 блюд (Большой комплекс / Сеть)</span>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Calculated Totals & ROI Summary */}
            <div className="w-full lg:w-5/12 lg:sticky lg:top-24 space-y-5">
              
              <div className="p-6 rounded-2xl bg-[#0F0F14] border border-[#C9A15A]/40 shadow-2xl space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-[#22222D]">
                  <span className="text-xs font-mono-code text-[#A3A3A8]">ИТОГОВЫЙ РАСЧЕТ:</span>
                  <span className="px-2 py-0.5 rounded bg-[#C9A15A]/15 text-[#C9A15A] font-mono-code text-[11px] font-bold">
                    {activeCount} из 6 модулей
                  </span>
                </div>

                {/* Totals Breakdown */}
                <div className="space-y-3 font-mono-code">
                  <div>
                    <span className="text-xs text-[#A3A3A8] block mb-0.5">Единоразовое внедрение под ключ:</span>
                    <div className="text-2xl font-extrabold text-[#F5F1EA] flex items-baseline gap-1">
                      <span>{totals.oneTimeMin.toLocaleString('ru-RU')} – {totals.oneTimeMax.toLocaleString('ru-RU')}</span>
                      <span className="text-[#C9A15A] text-xl font-bold">₸</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-[#A3A3A8] block mb-0.5">Ежемесячная поддержка и обновления:</span>
                    <div className="text-xl font-extrabold text-[#C9A15A] flex items-baseline gap-1">
                      <span>{totals.monthlyMin.toLocaleString('ru-RU')} – {totals.monthlyMax.toLocaleString('ru-RU')}</span>
                      <span className="text-sm font-normal text-[#A3A3A8]">₸ / мес</span>
                    </div>
                  </div>
                </div>

                {/* Estimated Value & ROI Widget */}
                <div className="p-3.5 rounded-xl bg-[#15151E] border border-[#252532] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#6FA98A] font-bold">
                    <TrendingUp className="w-4 h-4" />
                    <span>ОЦЕНКА ЭКОНОМИИ И ОКУПАЕМОСТИ:</span>
                  </div>
                  <div className="space-y-1 text-[#D1D1D6] text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A8]">⏱ Экономия времени команды:</span>
                      <strong>~35–45 часов / мес</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A8]">📈 Рост среднего чека (AI):</span>
                      <strong className="text-[#C9A15A]">+12% – +18%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A3A3A8]">🛡 Снижение ошибок стоп-листа:</span>
                      <strong className="text-[#6FA98A]">100% исключено</strong>
                    </div>
                  </div>
                </div>

                {/* Submit Calculation Button */}
                <button
                  onClick={handleOrderWithCalculation}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(201,161,90,0.3)] hover:shadow-[0_0_35px_rgba(201,161,90,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Оставить заявку на этот расчет</span>
                </button>

                <p className="text-[10px] text-center text-[#A3A3A8]">
                  Консультация и аудит меню бесплатны. Свяжемся за 15 минут в Telegram / WhatsApp.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
