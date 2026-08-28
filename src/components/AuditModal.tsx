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
  const [lastWaUrl, setLastWaUrl] = useState('');

  React.useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const buildWhatsAppUrl = () => {
    const services = customData?.servicesSelected?.length 
      ? customData.servicesSelected.join(', ') 
      : 'Комплексный аудит меню и AI-автоматизация';

    const calcDetails = customData?.estimatedOneTime 
      ? `\n💰 Расчет калькулятора:\n• Внедрение: ${customData.estimatedOneTime}\n• Абонплата: ${customData.estimatedMonthly}` 
      : '';

    const text = `👋 Здравствуйте! Заявка на аудит с сайта RestoAI:

👤 Имя: ${name || 'Клиент'}
📞 Телефон: ${phone || 'Не указан'}
🏢 Заведение: ${establishment || 'Не указано'}
📍 Город: ${city}
🛠 Услуги: ${services}${calcDetails}
${message ? `💬 Меню/Instagram/Пожелания: ${message}\n` : ''}
⚡ Прошу провести бесплатный аудит и связаться со мной.`;

    return `https://wa.me/77086558518?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const waUrl = buildWhatsAppUrl();
    setLastWaUrl(waUrl);

    try {
      // 1. Save lead to backend log
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
    } catch (err) {
      console.warn('Backend lead log error, continuing to WhatsApp:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
      // 2. Open WhatsApp directly with the structured lead message
      try {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } catch (err) {
        console.warn('Window open was prevented, user can click direct button:', err);
      }
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
              <p className="text-[11px] text-[#A3A3A8]">Прямая связь с ведущим инженером в WhatsApp за 15 минут</p>
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
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#6FA98A]/20 border border-[#6FA98A]/40 flex items-center justify-center mx-auto text-[#6FA98A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#F5F1EA]">Заявка сформирована, {name || 'партнер'}!</h4>
              <p className="text-xs text-[#A3A3A8] max-w-md mx-auto leading-relaxed">
                Мы открыли WhatsApp с готовым текстом вашей заявки на номер <strong className="text-[#F5F1EA]">+7 (708) 655-85-18</strong>. Если окно не открылось автоматически, нажмите зеленую кнопку ниже:
              </p>

              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <a
                  href={lastWaUrl || buildWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-110 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all animate-pulse"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>💬 Отправить заявку в WhatsApp (+7 708 655-85-18)</span>
                </a>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="https://t.me/Ak1kat"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#2AABEE]/15 hover:bg-[#2AABEE]/25 border border-[#2AABEE]/40 text-[#2AABEE] font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <span>Telegram: @Ak1kat</span>
                  </a>
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-[#20202B] text-[#D1D1D6] hover:text-white font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Закрыть окно
                  </button>
                </div>
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
                    placeholder="+7 (708) 000-00-00"
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
                    placeholder="Например: Ресторан «Nomad», Кафе «Sultan»"
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
                  <span>{loading ? 'Формирование заявки...' : 'Отправить заявку на WhatsApp (+7 708 655-85-18)'}</span>
                </button>
              </div>

              <p className="text-[10px] text-center text-[#A3A3A8]">
                Заявка сразу поступит напрямую на WhatsApp <span className="text-[#C9A15A]">+7 (708) 655-85-18</span> для оперативного ответа.
              </p>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
