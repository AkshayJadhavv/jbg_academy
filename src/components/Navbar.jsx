import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import EnquiryModal from './EnquiryModal';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  const handleNav = (href) => {
    setMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 2.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050505]/95 backdrop-blur-xl shadow-lg shadow-black/50 border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative">
              <img
                src="https://customer-assets.emergentagent.com/job_530e28b2-cc7b-4d96-afad-71eaf378d86f/artifacts/fqrrhy00_New%20Logo.png"
                alt="JBG Academy Logo"
                className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/56?text=JBG'; }}
              />
              <div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: '0 0 25px rgba(212,175,55,0.7)' }}
              />
            </div>
            <div>
              <div className="font-display font-bold text-white text-lg leading-none tracking-wide">
                JBG Academy
              </div>
              <div className="font-sans text-gold text-[9px] tracking-[0.3em] uppercase mt-0.5">
                of Design
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="relative font-sans text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group py-2 cursor-pointer"
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-400"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, #F0D060)' }}
                />
              </a>
            ))}
          </nav>

          {/* CTA Button — opens modal */}
          <button
            onClick={() => setModalOpen(true)}
            className="hidden lg:block gold-btn text-xs cursor-pointer"
          >
            Enquire Now
          </button>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white/80 hover:text-gold transition-colors z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gold/10 bg-[#050505]/98 backdrop-blur-xl overflow-hidden"
            >
              <nav className="px-6 py-6 flex flex-col gap-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="font-sans text-base font-medium text-white/70 hover:text-gold transition-colors duration-300 py-3 px-2 border-b border-white/5 active:bg-white/5 rounded-lg"
                  >
                    {link.label}
                  </motion.a>
                ))}
                {/* Mobile Enquire Now — opens modal */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                  className="gold-btn text-center mt-4 py-3 cursor-pointer"
                >
                  Enquire Now
                </motion.button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedCourse=""
      />
    </>
  );
}