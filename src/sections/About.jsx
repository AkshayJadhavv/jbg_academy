import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { GraduationCap, Building2, Briefcase, Wrench, Target, Eye, Users } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'Industry Expert Faculty',
    desc: 'Learn from seasoned professionals with decades of real-world experience in their respective creative fields.',
  },
  {
    icon: Building2,
    title: 'State-of-the-Art Facilities',
    desc: 'Work in modern studios equipped with the latest design tools, software, and infrastructure available today.',
  },
  {
    icon: Briefcase,
    title: 'Placement Assistance',
    desc: '100% dedicated placement support with strong industry partnerships and a proven track record of career launches.',
  },
  {
    icon: Wrench,
    title: 'Hands-on Training',
    desc: 'Project-based learning methodology that ensures every student graduates with a compelling professional portfolio.',
  },
];

const mvw = [
  {
    icon: Users,
    label: 'Who We Are',
    heading: "Baramati's Creative Hub",
    body: "JBG Academy of Design is where passion meets profession. We are Baramati's growing hub for creative education—bridging the gap between local ambition and global opportunity through practical learning and industry-focused training. We believe every student deserves the chance to explore their passion without leaving their hometown.",
    border: 'border-gold/20',
  },
  {
    icon: Target,
    label: 'Our Mission',
    heading: 'Passion into Profession',
    body: "To provide world-class skills in Fashion, Interiors, Animation & Digital Media that empower Baramati's creative minds with industry-ready expertise and global exposure—equipping students with practical knowledge, real-world experience, and future-ready skills to confidently step into the professional world.",
    border: 'border-gold/15',
  },
  {
    icon: Eye,
    label: 'Our Vision',
    heading: 'Local Talent, Global Leaders',
    body: "To establish Baramati as a premier hub for creative excellence—where local talent is transformed into global design leaders through innovation, technology, and boundless imagination. At JBG, we don't just teach design. We shape designers.",
    border: 'border-gold/20',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollReveal(0.05);
  const { ref: mvRef, isVisible: mvVisible } = useScrollReveal(0.05);

  return (
    <section
      id="about"
      className="relative py-12 md:py-20 px-4 md:px-6 overflow-hidden"
      style={{
        background: '#050505',
        backgroundImage: `
          linear-gradient(rgba(212,175,55,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(212,175,55,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    >
      {/* Fade grid out at top and bottom edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #050505 0%, transparent 8%, transparent 92%, #050505 100%)',
        }}
      />

      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/30" />
      <div
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16"
        >
          <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold mb-4">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
            About <span className="text-gradient-gold italic">JBG Academy</span>
          </h2>
          <div className="section-divider" />
          <p className="font-body text-base md:text-lg text-white/60 max-w-2xl mx-auto mt-6 leading-relaxed px-4">
            JBG Academy of Design is a premier institute dedicated to nurturing creative talent and
            transforming aspirations into successful careers. Our commitment to excellence spans
            design, technology, and the arts.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center mb-12 md:mb-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            <div className="relative">
              <div className="img-zoom rounded-2xl overflow-hidden glow-effect">
                <img
                  src="/images/gallery/gallery11.JPG"
                  alt="JBG Academy students"
                  className="w-full h-64 sm:h-80 lg:h-[480px] object-cover"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/800x600/1a1a1a/D4AF37?text=JBG+Academy';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="space-y-4 md:space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight">
              Crafting Creative Minds for{' '}
              <span className="text-gradient-gold italic">Tomorrow's World</span>
            </h3>
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed">
              At JBG Academy, we believe that great design changes the world. Our curriculum is
              built on the principles of innovation, craftsmanship, and professional excellence —
              preparing students not just for jobs, but for impactful careers.
            </p>
            <p className="font-body text-sm md:text-base text-white/60 leading-relaxed">
              Located in the heart of Baramati, our institute has become the go-to destination for
              aspiring designers from across Maharashtra seeking world-class education.
            </p>
            <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
              {[
                ['100%', 'Placement'],
                ['6+', 'Courses'],
              ].map(([val, lbl]) => (
                <div
                  key={lbl}
                  className="glass-card rounded-xl p-3 md:p-4 text-center border border-gold/10"
                >
                  <div className="font-display text-xl md:text-2xl font-bold text-gradient-gold">
                    {val}
                  </div>
                  <div className="font-sans text-[10px] md:text-xs text-white/50 tracking-wider uppercase mt-1">
                    {lbl}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.08 * i + 0.3 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass-card rounded-2xl p-4 md:p-6 group cursor-default transition-all duration-500"
            >
              <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.2)',
                }}
              >
                <f.icon size={18} className="text-gold" />
              </div>
              <h4 className="font-display text-base md:text-lg font-semibold text-white mb-2 md:mb-3">
                {f.title}
              </h4>
              <p className="font-body text-xs md:text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════
            WHO WE ARE · MISSION · VISION
        ══════════════════════════════════════ */}
        <div ref={mvRef} className="mt-12 md:mt-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mvVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
              <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-gold/50" />
              <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-gold">
                Our Vision
              </p>
              <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-gold/50" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold text-white mb-4 px-4 leading-tight">
              Who We Are{' '}
              <span className="text-gradient-gold italic">&amp;</span>{' '}
              <span className="text-gradient-gold italic">What We Stand For</span>
            </h2>

            <div className="section-divider" />
            <p className="font-body text-base md:text-lg text-white/55 max-w-xl mx-auto mt-6 leading-relaxed px-4">
              Creativity is not just a skill — it's a career. We are here to make that journey
              possible for every student in Baramati and beyond.
            </p>
          </motion.div>

          {/* Mission / Vision / Who We Are cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-14">
            {mvw.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 40 }}
                animate={mvVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className={`glass-card rounded-2xl p-5 md:p-8 border ${item.border} relative overflow-hidden group cursor-default transition-all duration-500`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div
                    className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'rgba(212,175,55,0.12)',
                      border: '1px solid rgba(212,175,55,0.25)',
                    }}
                  >
                    <item.icon size={14} className="text-gold" />
                  </div>
                  <span className="font-sans text-[8px] md:text-[10px] tracking-[0.35em] uppercase text-gold/80">
                    {item.label}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4 leading-snug">
                  {item.heading}
                </h3>

                <div className="w-8 md:w-10 h-px bg-gold/40 mb-3 md:mb-4" />

                <p className="font-body text-xs md:text-sm text-white/60 leading-relaxed">{item.body}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom highlight strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mvVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden border border-gold/15"
            style={{ background: 'rgba(212,175,55,0.04)' }}
          >
            <div
              className="absolute -right-24 -top-24 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12), transparent)' }}
            />

            <div className="relative z-10 px-5 md:px-10 py-8 md:py-12 grid md:grid-cols-2 gap-6 md:gap-10 items-center">
              <div>
                <p className="font-sans text-[8px] md:text-[10px] tracking-[0.4em] uppercase text-gold mb-2 md:mb-3">
                  Our Commitment
                </p>
                <h3 className="font-display text-xl md:text-3xl lg:text-4xl font-semibold text-white leading-snug">
                  World-Class Education,{' '}
                  <span className="text-gradient-gold italic">Right Here in Baramati</span>
                </h3>
              </div>
              <div className="space-y-2 md:space-y-4">
                {[
                  'Interior Design · Fashion Design · Graphic Design',
                  'Animation & VFX · Event Management',
                  'Expert Mentors · Industry-Oriented Curriculum',
                  'Hands-on Training · 100% Placement Support',
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={mvVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-2 md:gap-3"
                  >
                    <div className="mt-[6px] w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <p className="font-body text-xs md:text-sm text-white/65 leading-relaxed">{line}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}