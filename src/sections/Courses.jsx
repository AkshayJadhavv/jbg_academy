import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { CheckCircle2, ChevronDown, Clock, GraduationCap, IndianRupee, HelpCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import EnquiryModal from '../components/EnquiryModal';

const courseOptions = [
  {
    label: 'Certification Course',
    duration: '6 Months',
    eligibility: '10th Pass',
    fees: 'Contact for Details',
  },
  {
    label: 'Diploma Course',
    duration: '1 Year',
    eligibility: '12th Pass',
    fees: 'Contact for Details',
  },
  {
    label: 'Degree Course',
    duration: '3 Years',
    eligibility: '12th Pass',
    fees: 'Contact for Details',
  },
];

const courses = [
  {
    title: 'Fashion Design',
    image: 'images/courses/fashiondesign.png',
    desc: 'Master the art of clothing design, textile science, and fashion illustration with hands-on studio practice.',
    highlights: ['Pattern Making & Draping', 'Fashion Illustration', 'Textile Science', 'Portfolio Development'],
  },
  {
    title: 'Interior Design',
    image: 'images/courses/interiordesign.png',
    desc: 'Learn to transform spaces beautifully — from residential homes to commercial spaces with professional design software.',
    highlights: ['Space Planning', 'AutoCAD & 3D Studio', 'Material Selection', 'Client Presentation'],
  },
  {
    title: 'Graphic Design',
    image: 'images/courses/graphicdesign.png',
    desc: 'Build visual communication skills across branding, print, and digital media using industry-standard tools.',
    highlights: ['Adobe Suite Mastery', 'Brand Identity Design', 'Print & Digital Media', 'Typography & Layout'],
  },
  {
    title: 'Animation',
    image: 'images/courses/animation.png',
    desc: 'Bring stories to life through 2D and 3D animation techniques used in film, gaming, and digital media.',
    highlights: ['2D & 3D Animation', 'Character Design', 'Storyboarding', 'After Effects & Maya'],
  },
  {
    title: 'VFX',
    image: 'images/courses/vfx.png',
    desc: 'Create stunning visual effects for films and digital platforms with cutting-edge compositing and CGI techniques.',
    highlights: ['Compositing', 'Motion Graphics', 'CGI & Rendering', 'Nuke & Houdini'],
  },
  {
    title: 'Event Management',
    image: 'images/courses/eventmangement.png',
    desc: 'Plan, produce, and execute memorable events — from corporate conferences to grand weddings and cultural festivals.',
    highlights: ['Event Planning & Design', 'Vendor Management', 'Budget & Logistics', 'Live Event Production'],
  },
];

function CourseCard({ course, index, isVisible, openIndex, setOpenIndex, onEnquire }) {
  const isOpen = openIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group rounded-xl overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(212,175,55,0.15)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(212,175,55,0.08), 0 16px 32px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,175,55,0.15)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/1a1a1a/D4AF37?text=${course.title}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-3 right-3 font-display text-4xl font-bold text-white/10 select-none">
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
            {course.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="font-body text-xs text-white/55 leading-relaxed mb-3 line-clamp-2">{course.desc}</p>

        <p className="font-sans text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Key Highlights:</p>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-1.5 mb-4">
          {course.highlights.map((h) => (
            <li key={h} className="flex items-start gap-1.5">
              <CheckCircle2 size={11} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <span className="font-sans text-[10px] text-white/60 leading-tight">{h}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 mb-3" />

        {/* Accordion trigger */}
        <button
          onClick={() => setOpenIndex(isOpen ? null : index)}
          className="flex items-center justify-between w-full text-left mb-1 group/acc"
        >
          <span className="font-sans text-xs font-semibold text-white/80 group-hover/acc:text-white transition-colors duration-200">
            Course Options Available
          </span>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={14} className="text-[#D4AF37]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 pt-2 pb-1">
                {courseOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className="rounded-lg p-2.5"
                    style={{
                      background: 'rgba(212,175,55,0.06)',
                      border: '1px solid rgba(212,175,55,0.2)',
                    }}
                  >
                    <p className="font-sans text-[10px] font-bold text-[#D4AF37] mb-1.5">{opt.label}</p>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5">
                        <Clock size={10} className="text-white/40 flex-shrink-0" />
                        <span className="font-sans text-[10px] text-white/55">
                          Duration: <span className="text-white/80">{opt.duration}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <GraduationCap size={10} className="text-white/40 flex-shrink-0" />
                        <span className="font-sans text-[10px] text-white/55">
                          Eligibility: <span className="text-white/80">{opt.eligibility}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <IndianRupee size={10} className="text-white/40 flex-shrink-0" />
                        <span className="font-sans text-[10px] text-white/55">
                          Fees: <span className="text-white/80">{opt.fees}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="border-t border-white/10 mt-3 mb-3" />

        <button
          onClick={() => onEnquire(course.title)}
          className="gold-btn text-center text-[11px] w-full block py-2"
        >
          Enquire Now
        </button>
      </div>
    </motion.div>
  );
}

function CareerCounselingCTA({ onEnquire }) {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="mt-16 relative"
    >
      <div
        className="relative rounded-3xl p-8 md:p-12 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 100%)',
          border: '1px solid rgba(212,175,55,0.25)',
        }}
      >
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          <HelpCircle size={32} className="text-gold" />
        </div>

        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
          Not Sure Which Course to Choose?
        </h3>
        <p className="font-body text-base md:text-lg text-white/60 max-w-2xl mx-auto mb-8">
          Our counselors are here to help you find the perfect course that aligns with your career goals
        </p>

        <button
          onClick={() => onEnquire('')}
          className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #D4AF37, #F0D060, #A8861A)',
            color: '#050505',
          }}
        >
          Get Free Career Counseling
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
        </button>

        <p className="font-sans text-[10px] text-white/30 mt-6">
          Limited slots available for counseling sessions
        </p>
      </div>
    </motion.div>
  );
}

export default function Courses() {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [openIndex, setOpenIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  const handleEnquire = (courseTitle) => {
    setSelectedCourse(courseTitle);
    setModalOpen(true);
  };

  return (
    <>
      <section
        id="courses"
        className="relative pt-10 pb-20 px-6 overflow-hidden"
        style={{
          background: '#050505',
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      >
        {/* Fade grid at top and bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #050505 0%, transparent 8%, transparent 92%, #050505 100%)',
          }}
        />

        {/* Top divider — soft, no hard break */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />

        <div ref={ref} className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-14"
          >
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold mb-4">What We Offer</p>
            <h2 className="section-title text-white mb-4">
              Our Professional <span className="text-gradient-gold italic">Courses</span>
            </h2>
            <div className="section-divider" />
            <p className="font-body text-lg text-white/60 max-w-2xl mx-auto mt-6">
              Industry-aligned programs designed to make you job-ready from day one — with real projects, expert mentors, and placement support.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {courses.map((course, i) => (
              <CourseCard
                key={course.title}
                course={course}
                index={i}
                isVisible={isVisible}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                onEnquire={handleEnquire}
              />
            ))}
          </div>

          <CareerCounselingCTA onEnquire={handleEnquire} />
        </div>
      </section>

      <EnquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedCourse={selectedCourse}
      />
    </>
  );
}