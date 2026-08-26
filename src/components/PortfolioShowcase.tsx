import React, { useState } from 'react';
import { 
  ExternalLink, 
  Smartphone, 
  Globe, 
  Sparkles, 
  CheckCircle2, 
  Maximize2, 
  X,
  Layers,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/servicesData';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';

export const PortfolioShowcase: React.FC = () => {
  const [activePreviewUrl, setActivePreviewUrl] = useState<string | null>(null);
  const [activePreviewTitle, setActivePreviewTitle] = useState<string>('');

  const openLiveModal = (url: string, title: string) => {
    setActivePreviewUrl(url);
    setActivePreviewTitle(title);
  };

  const closeLiveModal = () => {
    setActivePreviewUrl(null);
    setActivePreviewTitle('');
  };

  return (
    <section id="portfolio" className="py-20 md:py-28 relative bg-[#0D0D10]">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#C9A15A]/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#B8794A]/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17171C] border border-[#C9A15A]/30 text-xs font-mono-code text-[#C9A15A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>РЕАЛЬНЫЕ ПРОЕКТЫ И ВНЕДРЕНИЯ</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F5F1EA] tracking-tight">
            Доказательство качества: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A15A] to-[#B8794A]">наши работы</span>
          </h2>

          <p className="text-[#A3A3A8] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Оцените реальную скорость отклика (0.16 сек), чистоту и удобство наших действующих проектов.
            <span className="block text-[#D1D1D6] text-xs sm:text-sm mt-1.5 font-medium">
              По запросу реализуем любой визуальный стиль — от лаконичного минимализма до эксклюзивного Dark Tech-Luxury под брендбук заведения.
            </span>
          </p>
        </div>

        {/* 3 Portfolio Project Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PORTFOLIO_DATA.map((project, idx) => (
            <div 
              key={project.id}
              className="rounded-2xl bg-[#141418] border border-[#272734] hover:border-[#C9A15A]/50 transition-all p-6 flex flex-col justify-between group shadow-xl hover:shadow-[0_0_30px_rgba(201,161,90,0.15)]"
            >
              <div>
                
                {/* Top Badge & Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#C9A15A]/15 text-[#C9A15A] border border-[#C9A15A]/30 text-[11px] font-mono-code font-bold">
                    {project.tag}
                  </span>
                  <span className="text-xs font-mono-code text-[#6FA98A] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#6FA98A]"></span> LIVE DEMO
                  </span>
                </div>

                {/* Mockup Frame (Dark Luxury Browser / Phone style) */}
                <div className="rounded-xl bg-[#09090C] border border-[#22222E] p-3 mb-5 relative overflow-hidden group-hover:border-[#C9A15A]/30 transition-all">
                  
                  {/* Browser Bar */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#1C1C24] text-[10px] font-mono-code text-[#A3A3A8]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                      <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                      <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                    </div>
                    <span className="truncate max-w-[140px] text-zinc-400">{project.url.replace('https://', '')}</span>
                    <Globe className="w-3 h-3 text-[#C9A15A]" />
                  </div>

                  {/* Visual Preview Graphic */}
                  <div className="h-44 rounded-lg bg-gradient-to-b from-[#181820] to-[#101014] border border-[#22222D] p-4 flex flex-col justify-between relative overflow-hidden">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono-code text-[#C9A15A] uppercase tracking-wider">
                        {project.type}
                      </span>
                      <h4 className="text-lg font-bold text-[#F5F1EA]">{project.title}</h4>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-[#D1D1D6]">
                        <Smartphone className="w-3.5 h-3.5 text-[#E6C280]" />
                        <span>Интерактивное электронное QR-меню</span>
                      </div>
                      <div className="p-2 rounded bg-black/40 border border-white/5 text-[11px] font-mono-code text-[#6FA98A]">
                        Скорость загрузки: 0.16 сек • 0% лагов
                      </div>
                    </div>

                    {/* Interactive Overlay Button */}
                    <div className="absolute inset-0 bg-[#0B0B0D]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs p-4">
                      <button
                        onClick={() => openLiveModal(project.url, project.title)}
                        className="px-3.5 py-2 rounded-xl bg-[#C9A15A] text-[#0B0B0D] font-bold text-xs flex items-center gap-1.5 shadow-lg cursor-pointer hover:bg-[#E6C280]"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Открыть превью</span>
                      </button>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-[#1E1E26] text-[#F5F1EA] border border-[#33333E] hover:border-[#C9A15A]"
                        title="Открыть в новой вкладке"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </div>

                {/* Project Description */}
                <h3 className="text-xl font-bold text-[#F5F1EA] mb-2">{project.title}</h3>
                <p className="text-xs text-[#A3A3A8] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 mb-5">
                  {project.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#D1D1D6]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A15A] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#0B0B0E] border border-[#22222A] text-center font-mono-code mb-4">
                  {project.metrics.map((m, i) => (
                    <div key={i} className="border-r last:border-0 border-[#1C1C24] px-1">
                      <span className="text-[9px] text-[#A3A3A8] block leading-tight">{m.label}</span>
                      <strong className="text-xs text-[#E6C280] font-extrabold mt-0.5 block">{m.value}</strong>
                    </div>
                  ))}
                </div>

              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-[#22222A] flex items-center justify-between gap-2">
                <button
                  onClick={() => openLiveModal(project.url, project.title)}
                  className="text-xs font-semibold text-[#C9A15A] hover:text-[#F5F1EA] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Интерактивный тест</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-[#A3A3A8] hover:text-[#F5F1EA] flex items-center gap-1"
                >
                  <span>На сайт ↗</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Live Interactive Iframe Modal */}
        {activePreviewUrl && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
            <div className="w-full max-w-5xl h-[85vh] rounded-2xl bg-[#111116] border border-[#C9A15A]/40 shadow-2xl flex flex-col overflow-hidden">
              
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#171720] border-b border-[#252532]">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#6FA98A] animate-pulse"></div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F5F1EA]">{activePreviewTitle}</h3>
                    <p className="text-[11px] font-mono-code text-[#A3A3A8]">{activePreviewUrl}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={activePreviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-[#22222D] hover:bg-[#2D2D3B] text-xs text-[#E6C280] font-semibold flex items-center gap-1.5 border border-[#3A3A4C]"
                  >
                    <span>Открыть во весь экран</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={closeLiveModal}
                    className="p-1.5 rounded-lg bg-[#22222D] hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Iframe View */}
              <div className="flex-1 bg-black relative">
                <iframe 
                  src={activePreviewUrl} 
                  title={activePreviewTitle}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>

            </div>
          </div>
        )}

        <KazakhOrnamentDivider variant="gold" className="mt-14" />

      </div>
    </section>
  );
};
