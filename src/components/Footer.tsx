import React from 'react';
import { 
  Bot, 
  Send, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Heart
} from 'lucide-react';
import { KazakhOrnamentDivider } from './KazakhOrnamentDivider';

interface Props {
  onOpenAuditModal: () => void;
  onOpenAiTestModal: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenAuditModal, onOpenAiTestModal }) => {
  return (
    <footer className="bg-[#08080A] border-t border-[#22222E] relative overflow-hidden pt-16 pb-12 text-[#A3A3A8] text-xs">
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-[#C9A15A]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Pre-footer Call to Action Banner */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#171720] via-[#1A1A24] to-[#14141A] border border-[#C9A15A]/30 mb-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-[#C9A15A]/15 text-[#C9A15A] font-mono-code font-bold text-[11px] border border-[#C9A15A]/30">
              ЗАПУСК ЗА 24–48 ЧАСОВ
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#F5F1EA]">
              Готовы автоматизировать ваше заведение?
            </h3>
            <p className="text-xs sm:text-sm text-[#A3A3A8] max-w-xl">
              Получите персональный аудит меню и расчет окупаемости для заведений общепита и HoReCa Казахстана и СНГ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenAuditModal}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Заказать аудит заведения</span>
            </button>

            <button
              onClick={onOpenAiTestModal}
              className="px-4 py-3.5 rounded-xl bg-[#20202B] hover:bg-[#2A2A38] text-[#F5F1EA] font-semibold text-xs border border-[#333342] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C9A15A]" />
              <span>AI Тест-драйв</span>
            </button>
          </div>
        </div>

        {/* Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-[#C9A15A]/40 flex items-center justify-center bg-[#0B0B0D] shadow-md">
                <img 
                  src="/logo.png" 
                  alt="RestAI Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="font-display font-black text-lg tracking-tight text-[#F5F1EA]">
                REST<span className="text-[#C9A15A]">.AI</span>
              </div>
            </div>

            <p className="text-xs text-[#A3A3A8] leading-relaxed">
              Цифровая экосистема и автоматизация для заведений общепита и HoReCa. Быстрые сайты, удобные QR-меню и AI-сервисы с адаптацией дизайна под ваш бренд (от минимализма до Dark Tech).
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono-code text-[#6FA98A]">
              <span className="w-2 h-2 rounded-full bg-[#6FA98A] animate-pulse"></span>
              <span>Cloud Engine v2.4 • 99.9% Uptime</span>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono-code font-bold text-xs uppercase text-[#F5F1EA] tracking-wider">
              Сервисы платформы
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">Интерактивное QR-меню</a></li>
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">AI-описания для меню</a></li>
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">Авто-ответы 2GIS & Яндекс</a></li>
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">ИИ-техкарты и себестоимость</a></li>
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">Telegram-бот визитка</a></li>
              <li><a href="#services" className="hover:text-[#C9A15A] transition-colors">Ежедневный ИИ-дайджест</a></li>
            </ul>
          </div>

          {/* Col 3: Live Demos */}
          <div className="space-y-3">
            <h4 className="font-mono-code font-bold text-xs uppercase text-[#F5F1EA] tracking-wider">
              Живые проекты
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://freshfish.qrmenu98.workers.dev/" target="_blank" rel="noreferrer" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1">
                  <span>FreshFish QR-Menu</span>
                  <ExternalLink className="w-3 h-3 text-[#C9A15A]" />
                </a>
              </li>
              <li>
                <a href="https://sabr.qrmenu98.workers.dev/" target="_blank" rel="noreferrer" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1">
                  <span>SABR Halal Lounge</span>
                  <ExternalLink className="w-3 h-3 text-[#C9A15A]" />
                </a>
              </li>
              <li>
                <a href="https://sudo.akikating123.workers.dev/" target="_blank" rel="noreferrer" className="hover:text-[#C9A15A] transition-colors flex items-center gap-1">
                  <span>SUDO Asian Bistro</span>
                  <ExternalLink className="w-3 h-3 text-[#C9A15A]" />
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#C9A15A] transition-colors">
                  Калькулятор окупаемости
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contacts */}
          <div className="space-y-3">
            <h4 className="font-mono-code font-bold text-xs uppercase text-[#F5F1EA] tracking-wider">
              Контакты & Запуск
            </h4>
            
            <div className="space-y-2.5 text-xs text-[#D1D1D6]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C9A15A] shrink-0" />
                <span className="text-[#F5F1EA]">Работаем по всему Казахстану</span>
              </div>
              <div className="text-[11px] text-[#A3A3A8] pl-5.5">
                Алматы, Астана, Шымкент, Караганда, Актобе и все регионы РК
              </div>
              
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#6FA98A] shrink-0" />
                <a href="tel:87086558518" className="hover:text-[#6FA98A] text-[#F5F1EA] font-mono-code font-bold">
                  +7 (708) 655-85-18
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-[#2AABEE] shrink-0" />
                <a href="https://t.me/Ak1kat" target="_blank" rel="noreferrer" className="hover:text-[#2AABEE] text-[#E6C280] font-mono-code font-semibold">
                  Telegram: @Ak1kat
                </a>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <a
                href="https://wa.me/77086558518?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%BA%D0%BE%D0%BD%D1%81%D1%83%D0%BB%D1%8C%D1%82%D0%B0%D1%86%D0%B8%D1%8E%20%D0%B8%20%D0%B0%D1%83%D0%B4%D0%B8%D1%82%20%D0%B4%D0%BB%D1%8F%20%D0%B7%D0%B0%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F."
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#132219] hover:bg-[#1a2f23] border border-[#6FA98A]/40 text-[#6FA98A] font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href="https://t.me/Ak1kat"
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-3 rounded-xl bg-[#181822] hover:bg-[#20202E] border border-[#2AABEE]/40 text-[#2AABEE] font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
              >
                <span>Telegram</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom divider & copyright */}
        <div className="pt-8 border-t border-[#1C1C24] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7E7E88]">
          <div>
            © {new Date().getFullYear()} RestoAI Kazakhstan. Автоматизация общепита и HoReCa.
          </div>

          <div className="flex items-center gap-4 font-mono-code">
            <span>₸ KZT Direct Pricing</span>
            <span>•</span>
            <span>По всему Казахстану</span>
            <span>•</span>
            <span>RestoAI Engine</span>
            <span>•</span>
            <span>0.18s SLA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
