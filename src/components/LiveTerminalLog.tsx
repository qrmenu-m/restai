import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  Play, 
  Pause, 
  RotateCcw, 
  Filter, 
  CheckCircle2, 
  Cpu,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { TerminalEvent } from '../types';
import { INITIAL_TERMINAL_LOGS } from '../data/servicesData';

export const LiveTerminalLog: React.FC = () => {
  const [logs, setLogs] = useState<TerminalEvent[]>(INITIAL_TERMINAL_LOGS);
  const [isRunning, setIsRunning] = useState(true);
  const [filterType, setFilterType] = useState<string>('all');

  // Random event generator simulation
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const types: Array<'order' | 'cost' | 'review' | 'digest' | 'stoplist' | 'bot'> = [
        'order', 'cost', 'review', 'stoplist', 'bot', 'digest'
      ];
      const randomType = types[Math.floor(Math.random() * types.length)];
      const orderNum = Math.floor(Math.random() * 800 + 400);
      const tableNum = Math.floor(Math.random() * 20 + 1);
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      let newLog: TerminalEvent;

      switch (randomType) {
        case 'order':
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'order',
            text: `QR-заказ #${orderNum} принят со стола ${tableNum}`,
            highlight: `Стейк Рибай 300г, Чай Ташкентский, Тартар из лосося`,
            details: `Сумма: 16 800 ₸ • Официант уведомлен (0.17s)`
          };
          break;
        case 'cost':
          const costDelta = Math.floor(Math.random() * 180 + 90);
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'cost',
            text: `Автопересчет себестоимости: "Бешбармак Ханский"`,
            highlight: `Закуп мяса изменился (+4%) → Новая себестоимость: ${3200 + costDelta} ₸`,
            details: `Маржинальность в норме (68.4%) • Меню актуализировано`
          };
          break;
        case 'review':
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'review',
            text: `Отзыв 5★ в 2GIS: "Изумительная кухня и быстрая подача"`,
            highlight: `AI-ответ отправлен автоматически за 1.05 сек`,
            details: `Рейтинг заведения: 4.92 ★ • Лояльность гостя +100%`
          };
          break;
        case 'stoplist':
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'stoplist',
            text: `Стоп-лист: Шеф временно скрыл десерт "Медовик"`,
            highlight: `Все активные QR-меню в зале обновлены без задержки`,
            details: `0 конфликтных заказов у официантов`
          };
          break;
        case 'bot':
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'bot',
            text: `Telegram-бот: оформлена бронь стола на вечер`,
            highlight: `Гость: Данияр (+7 701 ***-**-12), 4 персоны, VIP-зал`,
            details: `Бронь добавлена в рабочий чат администратора`
          };
          break;
        case 'digest':
        default:
          newLog = {
            id: Date.now().toString(),
            timestamp: timeStr,
            type: 'digest',
            text: `Синхронизация выручки: текущий чек заведения`,
            highlight: `Кассовый поток: +24 500 ₸ • iiko / R-Keeper синхронизированы`,
            details: `Данные подготовлены к утренней сводке владельцу`
          };
          break;
      }

      setLogs(prev => [newLog, ...prev.slice(0, 15)]);
    }, 3600);

    return () => clearInterval(interval);
  }, [isRunning]);

  const filteredLogs = filterType === 'all' 
    ? logs 
    : logs.filter(l => l.type === filterType);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'order': return 'text-[#C9A15A] bg-[#C9A15A]/10 border-[#C9A15A]/30';
      case 'cost': return 'text-[#B8794A] bg-[#B8794A]/10 border-[#B8794A]/30';
      case 'review': return 'text-[#6FA98A] bg-[#6FA98A]/10 border-[#6FA98A]/30';
      case 'stoplist': return 'text-amber-400 bg-amber-950/40 border-amber-800/40';
      case 'bot': return 'text-[#2AABEE] bg-[#2AABEE]/10 border-[#2AABEE]/30';
      default: return 'text-[#E6C280] bg-[#E6C280]/10 border-[#E6C280]/30';
    }
  };

  return (
    <section id="terminal" className="py-20 bg-[#0B0B0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17171C] border border-[#6FA98A]/30 text-xs font-mono-code text-[#6FA98A] mb-3">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>TERMINAL / REALTIME TELEMETRY LOG</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F1EA]">
              Мощь автоматизации <span className="text-[#C9A15A]">в строках кода</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A3A3A8] mt-1">
              Наглядное доказательство работы экосистемы в реальном времени (₸ Казахстан / СНГ).
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono-code font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isRunning 
                  ? 'bg-[#181820] text-[#A3A3A8] border border-[#272734] hover:text-[#F5F1EA]' 
                  : 'bg-[#6FA98A]/20 text-[#6FA98A] border border-[#6FA98A]/40'
              }`}
            >
              {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isRunning ? 'Пауза потока' : 'Возобновить'}</span>
            </button>

            <button
              onClick={() => setLogs(INITIAL_TERMINAL_LOGS)}
              className="p-1.5 rounded-lg bg-[#181820] text-[#A3A3A8] border border-[#272734] hover:text-[#F5F1EA] transition-all cursor-pointer"
              title="Сбросить лог"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 text-xs font-mono-code">
          <span className="text-[#A3A3A8] flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3" /> Фильтр:
          </span>
          {[
            { id: 'all', label: 'Все события' },
            { id: 'order', label: '🥩 QR-Заказы' },
            { id: 'cost', label: '📊 Себестоимость' },
            { id: 'review', label: '⭐️ AI-Отзывы 2GIS' },
            { id: 'stoplist', label: '⛔️ Стоп-лист' },
            { id: 'bot', label: '🤖 Telegram-бот' },
            { id: 'digest', label: '📈 Утренний отчет' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#C9A15A] text-[#0B0B0D] font-bold'
                  : 'bg-[#141418] text-[#A3A3A8] hover:text-[#F5F1EA] border border-[#22222A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Terminal Window */}
        <div className="rounded-2xl bg-[#09090C] border border-[#272734] shadow-2xl overflow-hidden font-mono-code text-xs">
          
          {/* Terminal Window Chrome */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#121217] border-b border-[#22222C]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="text-[#A3A3A8] text-[11px] ml-2 font-mono-code">resto-core-daemon.sh — active (0.18s latency)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-[#A3A3A8]">
              <span className="w-2 h-2 rounded-full bg-[#6FA98A] animate-pulse"></span>
              <span>STREAMING ACTIVE</span>
            </div>
          </div>

          {/* Terminal Stream Feed */}
          <div className="p-4 sm:p-6 space-y-3.5 max-h-[440px] overflow-y-auto">
            {filteredLogs.map((log) => (
              <div 
                key={log.id} 
                className="p-3 rounded-xl bg-[#111116] border border-[#1E1E26] hover:border-[#C9A15A]/30 transition-all space-y-1 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#A3A3A8] text-[11px]">[{log.timestamp}]</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getBadgeColor(log.type)}`}>
                      {log.type}
                    </span>
                    <span className="text-[#F5F1EA] font-semibold">{log.text}</span>
                  </div>
                  <span className="text-[10px] text-[#6FA98A] font-bold">EXECUTED ✓</span>
                </div>

                {log.highlight && (
                  <div className="pl-4 text-[#E6C280] font-medium border-l-2 border-[#C9A15A]/40 text-[11px]">
                    {log.highlight}
                  </div>
                )}

                {log.details && (
                  <div className="text-[10px] text-[#A3A3A8] pl-4">
                    ↳ {log.details}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Bottom Prompt Line */}
          <div className="px-4 py-2.5 bg-[#121217] border-t border-[#22222C] flex items-center justify-between text-[11px] text-[#A3A3A8]">
            <div className="flex items-center gap-2">
              <span className="text-[#C9A15A] font-bold">resto@cloud:~#</span>
              <span className="text-[#F5F1EA] animate-pulse">listening for pos events, qr traffic and 2gis reviews... _</span>
            </div>
            <span className="hidden sm:inline text-[#6FA98A]">100% SLA uptime</span>
          </div>

        </div>

      </div>
    </section>
  );
};
