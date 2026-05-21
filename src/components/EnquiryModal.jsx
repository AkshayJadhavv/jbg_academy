import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ChevronDown } from 'lucide-react';


const GOOGLE_SHEET_URL =
  '';

const courseList = [
  'Fashion Design',
  'Interior Design',
  'Graphic Design',
  'Animation',
  'VFX',
  'Event Management',
];

const courseTypes = [
  'Certification Course – 6 Months',
  'Diploma Course – 1 Year',
  'Degree Course – 3 Years',
];

// Custom styled select
function GoldSelect({ name, value, onChange, options, placeholder, required }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all duration-200 text-left"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1px solid ${value ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)'}`,
          color: value ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
          outline: 'none',
        }}
      >
        <span>{selected || placeholder}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} className="text-gold flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-50 left-0 right-0 mt-1 rounded-xl overflow-hidden"
            style={{
              background: '#111',
              border: '1px solid rgba(212,175,55,0.25)',
              boxShadow: '0 16px 40px rgba(0,0,0,0.6)',
            }}
          >
            {options.map((opt) => (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange({ target: { name, value: opt } });
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150"
                  style={{
                    color: value === opt ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                    background: value === opt ? 'rgba(212,175,55,0.08)' : 'transparent',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212,175,55,0.06)')}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      value === opt ? 'rgba(212,175,55,0.08)' : 'transparent')
                  }
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputStyle = {
  base: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '0.75rem',
    color: 'rgba(255,255,255,0.9)',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
};

export default function EnquiryModal({ isOpen, onClose, preselectedCourse }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: preselectedCourse || '',
    courseType: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Sync preselectedCourse when it changes
  useEffect(() => {
    if (preselectedCourse) {
      setForm((f) => ({ ...f, course: preselectedCourse }));
    }
  }, [preselectedCourse]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setSubmitted(false);
        setError('');
        setForm({ name: '', email: '', phone: '', course: preselectedCourse || '', courseType: '', message: '' });
      }, 400);
    }
  }, [isOpen, preselectedCourse]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        Name: form.name,
        Email: form.email,
        Phone: form.phone,
        Course: form.course,
        CourseType: form.courseType,
        Message: form.message,
        Source: 'Enquiry Modal',
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100]"
            style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center px-4 py-6"
            style={{ pointerEvents: 'none' }}
          >
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
              style={{
                background: 'linear-gradient(145deg, #0e0e0e, #111)',
                border: '1px solid rgba(212,175,55,0.25)',
                boxShadow: '0 0 60px rgba(212,175,55,0.08), 0 32px 64px rgba(0,0,0,0.7)',
                pointerEvents: 'all',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                style={{ background: 'linear-gradient(90deg, #D4AF37, #F0D060, #A8861A)' }}
              />

              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div>
                  <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold mb-1">
                    Start Your Creative Journey
                  </p>
                  <h2 className="font-display text-2xl font-bold text-white">Enquire Now</h2>
                </div>
                <button
                  onClick={onClose}
                  className="mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                    e.currentTarget.style.color = '#D4AF37';
                    e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pb-6">
                {submitted ? (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-10"
                  >
                    <div
                      className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                      style={{
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                        border: '1px solid rgba(212,175,55,0.3)',
                      }}
                    >
                      <CheckCircle2 size={32} className="text-gold" />
                    </div>
                    <h3 className="font-display text-2xl text-white mb-2">Thank You!</h3>
                    <p className="font-body text-sm text-white/60 mb-6">
                      We've received your enquiry and will reach out within 24 hours.
                    </p>
                    <button onClick={onClose} className="gold-btn text-xs px-8">
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={inputStyle.base}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        style={inputStyle.base}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        style={inputStyle.base}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {/* Course Interested In */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Course Interested In *
                      </label>
                      <GoldSelect
                        name="course"
                        value={form.course}
                        onChange={handleChange}
                        options={courseList}
                        placeholder="Select a course"
                        required
                      />
                    </div>

                    {/* Course Type */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Course Type *
                      </label>
                      <GoldSelect
                        name="courseType"
                        value={form.courseType}
                        onChange={handleChange}
                        options={courseTypes}
                        placeholder="Select course type"
                        required
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-sans text-[10px] text-white/40 tracking-wider uppercase block mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your interests..."
                        rows={3}
                        style={{ ...inputStyle.base, resize: 'none' }}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(212,175,55,0.5)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                      />
                    </div>

                    {error && (
                      <p className="font-sans text-xs text-red-400 text-center">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !form.course || !form.courseType}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans font-bold text-sm tracking-widest uppercase transition-all duration-300"
                      style={{
                        background:
                          loading || !form.course || !form.courseType
                            ? 'rgba(212,175,55,0.3)'
                            : 'linear-gradient(135deg, #D4AF37, #F0D060, #A8861A)',
                        color: loading || !form.course || !form.courseType ? 'rgba(255,255,255,0.4)' : '#050505',
                        cursor: loading || !form.course || !form.courseType ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-[#050505]/30 border-t-[#050505] rounded-full"
                        />
                      ) : (
                        <>
                          <Send size={14} />
                          Submit Enquiry
                        </>
                      )}
                    </button>

                    <p className="font-sans text-[10px] text-white/25 text-center">
                      We'll get back to you within 24 hours
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}