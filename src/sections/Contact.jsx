import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react';

const GOOGLE_SHEET_URL =
  '';

export default function Contact() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        Name: form.name,
        Email: form.email,
        Phone: form.phone,
        Message: form.message,
        Source: 'Contact Form',
        Timestamp: new Date().toISOString(),
      });

      await fetch(`${GOOGLE_SHEET_URL}?${params.toString()}`, {
        method: 'GET',
        mode: 'no-cors',
      });

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 bg-[#080808] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div
        className="absolute -top-32 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
      />

      <div ref={ref} className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">Get In Touch</p>
          <h2 className="section-title text-white mb-4">
            Contact <span className="text-gradient-gold italic">Us</span>
          </h2>
          <div className="section-divider" />
          <p className="font-body text-lg text-white/60 max-w-xl mx-auto mt-6">
            Ready to begin your creative journey? Reach out and our team will guide you through everything.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 md:p-10"
            style={{ boxShadow: '0 0 40px rgba(212,175,55,0.05)' }}
          >
            <h3 className="font-display text-2xl font-bold text-white mb-2">Send Us a Message</h3>
            <p className="font-body text-sm text-white/50 mb-8">We'll get back to you within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 size={56} className="text-gold mx-auto mb-4" />
                <h4 className="font-display text-2xl text-white mb-2">Thank You!</h4>
                <p className="font-body text-white/60">We've received your message and will contact you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-sans text-xs text-white/40 tracking-wider uppercase block mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="input-gold"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-sans text-xs text-white/40 tracking-wider uppercase block mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                      className="input-gold"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-white/40 tracking-wider uppercase block mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email"
                      className="input-gold"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-sans text-xs text-white/40 tracking-wider uppercase block mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about the course you're interested in..."
                    rows={5}
                    required
                    className="input-gold resize-none"
                  />
                </div>

                {error && (
                  <p className="font-sans text-xs text-red-400 text-center">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="gold-btn w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Card */}
            <div
              className="glass-card rounded-3xl p-8"
              style={{ boxShadow: '0 0 30px rgba(212,175,55,0.05)' }}
            >
              <h3 className="font-display text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-5">
                {[
                  { icon: Phone, label: 'Phone', lines: ['8983664300', '8983664200'], href: 'tel:8983664300' },
                  { icon: Mail, label: 'Email', lines: ['jbgbaramati@gmail.com'], href: 'mailto:jbgbaramati@gmail.com' },
                  { icon: MapPin, label: 'Address', lines: ['3rd Floor, Above Saraf Honda,', 'Bhigwan Road, Baramati,', 'Maharashtra, India'], href: null },
                ].map(({ icon: Icon, label, lines, href }) => (
                  <div key={label} className="flex gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}
                    >
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-gold/70 tracking-wider uppercase mb-1">{label}</p>
                      {lines.map((line, i) =>
                        href && i === 0 ? (
                          <a key={line} href={href} className="block font-body text-white/80 hover:text-gold transition-colors text-sm">{line}</a>
                        ) : (
                          <p key={line} className="font-body text-white/80 text-sm">{line}</p>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.2)', height: 200 }}
            >
              <iframe
                title="JBG Academy Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.032808433734!2d74.5901653!3d18.162240099999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc3758da6a2daf9%3A0x468b604741780e58!2sJBG%20Academy%20Of%20Design!5e1!3m2!1sen!2sin!4v1779096343291!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/918983664300"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl font-sans font-bold text-white tracking-wider transition-all duration-400"
              style={{
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                boxShadow: '0 0 30px rgba(37,211,102,0.3)',
              }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat With Us on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}