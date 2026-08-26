import React, { useState } from 'react';
import { 
  UserCheck, 
  ChefHat, 
  Crown, 
  Smartphone, 
  MessageSquare, 
  Calculator, 
  TrendingUp, 
  ArrowRight,
  Zap,
  Activity,
  CheckCircle2,
  Send,
  Layers
} from 'lucide-react';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';
import { KINETIC_FLOW_STEPS } from '../data/servicesData';

export const KineticDataFlow: React.FC = () => {
  const [activeFlowId, setActiveFlowId] = useState<string>('flow-qr');

  const activeStep = KINETIC_FLOW_STEPS.find(s => s.id === activeFlowId) || KINETIC_FLOW_STEPS[0];

  return (
    <section id="data-flow" className="py-20 md:py-28 relative bg-[#0F0F13] overflow-hidden">
      
      {/* Background kinetic particle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#C9A15A]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#17171E] border border-[#C9A15A]/30 text-xs font-mono-code text-[#E6C280]">
            <Zap className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>KINETIC DATA FLOW — ЕДИНЫЙ ПОТОК ДАННЫХ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1EA] tracking-tight">
            Как система связывает <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F1EA] via-[#C9A15A] to-[#B8794A]">3 ключевые роли</span>
          </h2>

          <p className="text-[#A3A3A8] text-sm sm:text-base">
            Не разрозненные боты, а непрерывный золотой поток информации от сканирования меню до утреннего финансового отчета владельцу.
          </p>
        </div>

        {/* Stream Scenario Switcher Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {KINETIC_FLOW_STEPS.map(step => {
            const isActive = step.id === activeFlowId;
            return (
              <button
                key={step.id}
                onClick={() => setActiveFlowId(step.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono-code transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#C9A15A] to-[#B8794A] text-[#0B0B0D] shadow-[0_0_20px_rgba(201,161,90,0.3)] font-bold scale-105'
                    : 'bg-[#17171E] text-[#A3A3A8] hover:text-[#F5F1EA] border border-[#272732]'
                }`}
              >
                <span>{step.title}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-[#0B0B0D]' : 'bg-zinc-800 text-[#C9A15A]'}`}>
                  {step.speed}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3-PILLAR HORIZONTAL KINETIC DATA FLOW SCHEMATIC */}
        <div className="relative">
          
          {/* Animated Connecting SVG Data Lines (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-16 z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 60">
              <defs>
                <linearGradient id="goldGradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C9A15A" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#B8794A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#E6C280" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              
              {/* Base track */}
              <line x1="160" y1="30" x2="840" y2="30" stroke="#252530" strokeWidth="2" strokeDasharray="4 4" />
              
              {/* Active Golden Animated Line */}
              <line 
                x1="160" 
                y1="30" 
                x2="840" 
                y2="30" 
                stroke="url(#goldGradientFlow)" 
                strokeWidth="3" 
                strokeLinecap="round"
                className="animate-pulse"
              />
              
              {/* Pulse Packets flowing */}
              <circle cx="320" cy="30" r="5" fill="#C9A15A">
                <animate attributeName="cx" from="180" to="500" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="680" cy="30" r="5" fill="#E6C280">
                <animate attributeName="cx" from="500" to="820" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">

            {/* PILLAR 1: GUEST */}
            <div className="p-6 rounded-2xl bg-[#14141A] border border-[#272734] hover:border-[#C9A15A]/50 transition-all flex flex-col justify-between shadow-xl relative group">
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C9A15A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#C9A15A] bg-[#C9A15A]/10 px-2.5 py-1 rounded-md border border-[#C9A15A]/25">
                    ШАГ 1 • ВХОД
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#C9A15A]/15 border border-[#C9A15A]/40 flex items-center justify-center text-[#C9A15A]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">1. Гость в зале или онлайн</h3>
                <p className="text-xs text-[#A3A3A8] mb-4">
                  Точка первого контакта: сканирование QR, вопрос боту или отзыв на картах.
                </p>

                <div className="p-3.5 rounded-xl bg-[#0B0B0E] border border-[#22222C] text-xs text-[#D1D1D6] leading-relaxed">
                  <strong className="text-[#C9A15A] block mb-1">Действие гостя сейчас:</strong>
                  {activeStep.guestAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F1F28] flex items-center justify-between text-[11px] font-mono-code text-[#A3A3A8]">
                <span>Канал: QR / 2GIS / TG</span>
                <span className="text-[#6FA98A]">● Без барьеров</span>
              </div>
            </div>

            {/* PILLAR 2: KITCHEN & SERVICE */}
            <div className="p-6 rounded-2xl bg-[#16161D] border border-[#B8794A]/40 hover:border-[#B8794A] transition-all flex flex-col justify-between shadow-xl relative group">
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#B8794A] to-transparent"></div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#B8794A] bg-[#B8794A]/10 px-2.5 py-1 rounded-md border border-[#B8794A]/30">
                    ШАГ 2 • ИСПОЛНЕНИЕ
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#B8794A]/20 border border-[#B8794A]/40 flex items-center justify-center text-[#B8794A]">
                    <ChefHat className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">2. Кухня, бар & сервис</h3>
                <p className="text-xs text-[#A3A3A8] mb-4">
                  Четкая передача заказа, работа по ИИ-техкартам и моментальный стоп-лист.
                </p>

                <div className="p-3.5 rounded-xl bg-[#0B0B0E] border border-[#22222C] text-xs text-[#D1D1D6] leading-relaxed">
                  <strong className="text-[#B8794A] block mb-1">Реакция кухни и зала:</strong>
                  {activeStep.kitchenAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F1F28] flex items-center justify-between text-[11px] font-mono-code text-[#A3A3A8]">
                <span>POS: iiko / R-Keeper / КДС</span>
                <span className="text-[#E6C280]">● 0 ошибок официанта</span>
              </div>
            </div>

            {/* PILLAR 3: OWNER & MANAGEMENT */}
            <div className="p-6 rounded-2xl bg-[#14141A] border border-[#272734] hover:border-[#C9A15A]/50 transition-all flex flex-col justify-between shadow-xl relative group">
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#E6C280] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono-code font-bold uppercase tracking-wider text-[#E6C280] bg-[#E6C280]/10 px-2.5 py-1 rounded-md border border-[#E6C280]/25">
                    ШАГ 3 • КОНТРОЛЬ И ПРИБЫЛЬ
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#E6C280]/15 border border-[#E6C280]/40 flex items-center justify-center text-[#E6C280]">
                    <Crown className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">3. Владелец & управление</h3>
                <p className="text-xs text-[#A3A3A8] mb-4">
                  Защита чистой маржи, контроль рейтинга и утренняя сводка в Telegram.
                </p>

                <div className="p-3.5 rounded-xl bg-[#0B0B0E] border border-[#22222C] text-xs text-[#D1D1D6] leading-relaxed">
                  <strong className="text-[#E6C280] block mb-1">Результат для владельца:</strong>
                  {activeStep.ownerAction}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#1F1F28] flex items-center justify-between text-[11px] font-mono-code text-[#A3A3A8]">
                <span>Контроль: Telegram / Web</span>
                <span className="text-[#6FA98A]">● +18% маржи</span>
              </div>
            </div>

          </div>

        </div>

        {/* Live Active Data Stream Payload Strip */}
        <div className="mt-10 p-4 rounded-xl bg-[#111116] border border-[#C9A15A]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2 text-[#F5F1EA]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C9A15A] animate-ping"></span>
            <span className="text-[#A3A3A8]">АКТИВНЫЙ ПАКЕТ ДАННЫХ:</span>
            <span className="text-[#E6C280] font-bold">{activeStep.dataPayload}</span>
          </div>
          <div className="flex items-center gap-2 text-[#6FA98A] font-bold shrink-0">
            <span>СКОРОСТЬ ПЕРЕДАЧИ: {activeStep.speed}</span>
          </div>
        </div>

        <KazakhOrnamentDivider variant="copper" className="mt-14" />

      </div>
    </section>
  );
};
