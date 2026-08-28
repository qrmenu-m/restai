import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Cpu, 
  Terminal, 
  Briefcase, 
  Calculator, 
  Send, 
  Menu as MenuIcon, 
  X,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface Props {
  onOpenCalculator?: () => void;
  onOpenAuditModal: () => void;
  onOpenAiTestModal: () => void;
}

export const Navbar: React.FC<Props> = ({ onOpenCalculator, onOpenAuditModal, onOpenAiTestModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0B0B0D]/90 backdrop-blur-md border-b border-[#C9A15A]/15 py-3 shadow-xl shadow-black/40' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E1E24] to-[#121215] border border-[#C9A15A]/40 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A15A] group-hover:shadow-[0_0_15px_rgba(201,161,90,0.3)]">
            <Sparkles className="w-5 h-5 text-[#C9A15A]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-[#F5F1EA]">
                Resto<span className="text-[#C9A15A]">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code font-bold uppercase tracking-wider bg-[#C9A15A]/15 text-[#C9A15A] border border-[#C9A15A]/30">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-[#A3A3A8] hidden sm:block">Для заведений общепита и HoReCa</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#141418]/80 border border-[#27272F] p-1.5 rounded-full backdrop-blur-sm">
          <a 
            href="#services" 
            className="px-3.5 py-1.5 text-xs font-medium text-[#D1D1D6] hover:text-[#F5F1EA] hover:bg-[#1E1E24] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>6 Услуг (Bento)</span>
          </a>
          <a 
            href="#data-flow" 
            className="px-3.5 py-1.5 text-xs font-medium text-[#D1D1D6] hover:text-[#F5F1EA] hover:bg-[#1E1E24] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-[#B8794A]" />
            <span>Как это работает</span>
          </a>
          <a 
            href="#terminal" 
            className="px-3.5 py-1.5 text-xs font-medium text-[#D1D1D6] hover:text-[#F5F1EA] hover:bg-[#1E1E24] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-[#6FA98A]" />
            <span>Live Лог</span>
          </a>
          <a 
            href="#portfolio" 
            className="px-3.5 py-1.5 text-xs font-medium text-[#D1D1D6] hover:text-[#F5F1EA] hover:bg-[#1E1E24] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>Портфолио</span>
          </a>
          <a 
            href="#pricing" 
            className="px-3.5 py-1.5 text-xs font-medium text-[#D1D1D6] hover:text-[#F5F1EA] hover:bg-[#1E1E24] rounded-full transition-colors flex items-center gap-1.5"
          >
            <Calculator className="w-3.5 h-3.5 text-[#E6C280]" />
            <span>Прайс & Расчет</span>
          </a>
        </nav>

        {/* Right Action buttons & Live Status */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct WhatsApp / Telegram quick links */}
          <a
            href="https://wa.me/77086558518"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132219] hover:bg-[#1a2f23] border border-[#6FA98A]/40 text-[#6FA98A] text-xs font-semibold transition-all"
            title="WhatsApp: 87086558518"
          >
            <span>WhatsApp</span>
          </a>

          <a
            href="https://t.me/Ak1kat"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#181822] hover:bg-[#20202E] border border-[#2AABEE]/40 text-[#2AABEE] text-xs font-semibold transition-all"
            title="Telegram: @Ak1kat"
          >
            <span>Telegram</span>
          </a>

          <button
            onClick={onOpenAiTestModal}
            className="px-3.5 py-2 rounded-xl bg-[#1A1A22] hover:bg-[#23232D] text-[#E6C280] border border-[#C9A15A]/30 text-xs font-semibold transition-all hover:border-[#C9A15A] flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C9A15A]" />
            <span>AI Тест-драйв</span>
          </button>

          <button
            onClick={onOpenAuditModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-bold text-xs transition-all shadow-[0_0_20px_rgba(201,161,90,0.25)] hover:shadow-[0_0_25px_rgba(201,161,90,0.4)] flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Получить аудит</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-[#19191E] border border-[#27272F] text-[#F5F1EA]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F12] border-b border-[#C9A15A]/20 px-4 pt-4 pb-6 space-y-3 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#17171C] border border-[#27272F] text-xs font-mono-code text-[#6FA98A] w-fit">
            <span className="w-2 h-2 rounded-full bg-[#6FA98A] animate-pulse"></span>
            <span>СИСТЕМА АКТИВНА</span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#141418] text-sm text-[#F5F1EA] flex items-center justify-between border border-[#22222A]"
            >
              <span className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C9A15A]" /> 6 Услуг (Bento Grid)
              </span>
              <span className="text-xs text-[#A3A3A8]">Живые демки →</span>
            </a>
            <a 
              href="#data-flow" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#141418] text-sm text-[#F5F1EA] flex items-center justify-between border border-[#22222A]"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#B8794A]" /> Как это работает
              </span>
              <span className="text-xs text-[#A3A3A8]">Гость-Кухня-Владелец →</span>
            </a>
            <a 
              href="#terminal" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#141418] text-sm text-[#F5F1EA] flex items-center justify-between border border-[#22222A]"
            >
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#6FA98A]" /> Live Терминал
              </span>
              <span className="text-xs text-[#A3A3A8]">Лог ₸ →</span>
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#141418] text-sm text-[#F5F1EA] flex items-center justify-between border border-[#22222A]"
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#C9A15A]" /> Портфолио
              </span>
              <span className="text-xs text-[#A3A3A8]">FreshFish / Sabr / Sudo →</span>
            </a>
            <a 
              href="#pricing" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-lg bg-[#141418] text-sm text-[#F5F1EA] flex items-center justify-between border border-[#22222A]"
            >
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#E6C280]" /> Прайс и Калькулятор
              </span>
              <span className="text-xs text-[#A3A3A8]">Расчет ₸ →</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href="https://wa.me/77086558518"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 rounded-xl bg-[#132219] text-[#6FA98A] border border-[#6FA98A]/30 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>WhatsApp</span>
            </a>
            <a
              href="https://t.me/Ak1kat"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 rounded-xl bg-[#181822] text-[#2AABEE] border border-[#2AABEE]/30 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Telegram: @Ak1kat</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27272F]">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAiTestModal(); }}
              className="w-full py-2.5 rounded-xl bg-[#1A1A22] text-[#E6C280] border border-[#C9A15A]/30 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Тест-драйв
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenAuditModal(); }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] text-[#0B0B0D] text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Бесплатный аудит
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
