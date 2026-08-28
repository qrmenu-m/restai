import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  MapPin, 
  Building2, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  customData?: any;
}

export const AuditModal: React.FC<Props> = ({ isOpen, onClose, customData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [city, setCity] = useState('Алматы');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          establishment,
          city,
          message,
          servicesSelected: customData?.servicesSelected || ['Комплексный аудит'],
          estimatedOneTime: customData?.estimatedOneTime,
          estimatedMonthly: customData?.estimatedMonthly,
        })
      });
      setSubmitted(true);
    } catch (e) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-xl rounded-2xl bg-[#121217] border border-[#C9A15A]/40 shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#171720] border-b border-[#252532]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#C9A15A]/20 border border-[#C9A15A]/40 flex items-center justify-center text-[#C9A15A]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#F5F1EA]">Заявка на бесплатный аудит</h3>
              <p className="text-[11px] text-[#A3A3A8]">Расчет экономии и запуск меню за 24–48 часов</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#20202B] hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#6FA98A]/20 border border-[#6FA98A]/40 flex items-center justify-center mx-auto text-[#6FA98A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#F5F1EA]">Спасибо, {name || 'партнер'}!</h4>
              <p className="text-xs text-[#A3A3A8] max-w-md mx-auto leading-relaxed">
                Мы получили вашу заявку. Наш специалист свяжется с вами в WhatsApp или по телефону в течение 15 минут для уточнения меню.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://wa.me/77086558518"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#132219] hover:bg-[#1a2f23] border border-[#6FA98A]/50 text-[#6FA98A] font-bold text-xs flex items-center gap-1.5"
                >
                  <span>WhatsApp: +7 (708) 655-85-18</span>
                </a>
                <a
                  href="https://t.me/Ak1kat"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#2AABEE] text-white font-bold text-xs flex items-center gap-1.5 hover:brightness-110"
                >
                  <span>Telegram: @Ak1kat</span>
                </a>
                <button
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-[#20202B] text-[#D1D1D6] font-semibold text-xs cursor-pointer"
                >
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* If calculator data was passed */}
              {customData?.estimatedOneTime && (
                <div className="p-3 rounded-xl bg-[#171722] border border-[#C9A15A]/30 text-xs font-mono-code space-y-1">
                  <span className="text-[#C9A15A] font-bold block">ВЫБРАННЫЙ РАСЧЕТ ИЗ КАЛЬКУЛЯТОРА:</span>
                  <div className="flex justify-between text-[#D1D1D6]">
                    <span>Внедрение: <strong>{customData.estimatedOneTime}</strong></span>
                    <span>Абонплата: <strong className="text-[#C9A15A]">{customData.estimatedMonthly}</strong></span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Алихан"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Телефон / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (701) 000-00-00"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Название заведения (ресторан, кафе, бар, HoReCa)
                  </label>
                  <input
                    type="text"
                    value={establishment}
                    onChange={(e) => setEstablishment(e.target.value)}
                    placeholder="Например: Ресторан «Nomad», Кафе-бистро «Sultan»"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                    Город
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none"
                  >
                    <option value="Алматы">Алматы</option>
                    <option value="Астана">Астана</option>
                    <option value="Шымкент">Шымкент</option>
                    <option value="Караганда">Караганда</option>
                    <option value="Актобе">Актобе</option>
                    <option value="Другой город СНГ">Другой город СНГ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#D1D1D6] font-medium mb-1">
                  Ссылка на текущее меню / Instagram / пожелания:
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Прикрепите ссылку на PDF или Instagram вашего заведения"
                  className="w-full px-3 py-2 rounded-xl bg-[#0A0A0D] border border-[#272734] text-xs text-[#F5F1EA] focus:border-[#C9A15A] outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C9A15A] to-[#B8794A] hover:from-[#D8AF67] hover:to-[#C68758] text-[#0B0B0D] font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(201,161,90,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Отправка...' : 'Отправить заявку на аудит'}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-[#A3A3A8]">
                Нажимая кнопку, вы соглашаетесь на оперативный аудит вашего меню. Данные конфиденциальны.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
