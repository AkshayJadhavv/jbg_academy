// src/sections/Gallery.jsx
//
// ── Fully data-driven. To add images:
//    1. Drop file into  public/images/gallery/
//    2. Add one entry in  src/data/galleryData.js
//    Nothing else needed.

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { resolvedGallery, galleryCategories } from '../data/galleryData';
import GalleryCard from '../components/GalleryCard';
import GalleryLightbox from '../components/GalleryLightbox';
import { Images } from 'lucide-react';

const INITIAL_SHOW = 12;
const LOAD_MORE_STEP = 8;

function FilterPill({ label, active, count, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="relative flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-400 whitespace-nowrap"
      style={
        active
          ? {
              background: 'linear-gradient(135deg, #D4AF37, #F0D060, #A8861A)',
              color: '#050505',
              fontWeight: 700,
              boxShadow: '0 0 20px rgba(212,175,55,0.4)',
            }
          : {
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(212,175,55,0.18)',
              color: 'rgba(255,255,255,0.55)',
            }
      }
    >
      {label}
      <span
        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
        style={{
          background: active ? 'rgba(0,0,0,0.2)' : 'rgba(212,175,55,0.12)',
          color: active ? '#050505' : 'rgba(212,175,55,0.7)',
        }}
      >
        {count}
      </span>
    </motion.button>
  );
}

export default function Gallery() {
  const { ref, isVisible } = useScrollReveal(0.08);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [showCount, setShowCount] = useState(INITIAL_SHOW);

  const filtered = useMemo(
    () =>
      activeCategory === 'All'
        ? resolvedGallery
        : resolvedGallery.filter((g) => g.category === activeCategory),
    [activeCategory]
  );

  const displayed = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;
  const remaining = filtered.length - showCount;

  const categoryCounts = useMemo(() => {
    const counts = { All: resolvedGallery.length };
    galleryCategories.slice(1).forEach((cat) => {
      counts[cat] = resolvedGallery.filter((g) => g.category === cat).length;
    });
    return counts;
  }, []);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setShowCount(INITIAL_SHOW);
  };

  return (
    <>
      <section
        id="gallery"
        className="relative pt-10 pb-20 px-6 overflow-hidden"
        style={{
          background: '#080808',
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
            background: 'linear-gradient(to bottom, #080808 0%, transparent 8%, transparent 92%, #080808 100%)',
          }}
        />

        {/* Top divider — soft */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }}
        />
        {/* Bottom divider */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
        />

        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-[0.05] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-[0.04] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #D4AF37, transparent)' }}
        />

        <div ref={ref} className="relative max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-5 px-5 py-2 rounded-full"
              style={{
                background: 'rgba(212,175,55,0.07)',
                border: '1px solid rgba(212,175,55,0.22)',
              }}
            >
              <Images size={13} className="text-gold" />
              <span className="font-sans text-xs tracking-[0.35em] uppercase text-gold">Visual Stories</span>
            </motion.div>

            <h2
              className="font-display font-bold text-white mb-4 leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)' }}
            >
              Our{' '}
              <span
                className="italic text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #D4AF37, #F0D060, #D4AF37)' }}
              >
                Gallery
              </span>
            </h2>

            <div
              className="w-24 h-0.5 mx-auto mb-6"
              style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }}
            />

            <p className="font-body text-lg text-white/55 max-w-2xl mx-auto">
              A visual journal of events, workshops, student work, campus moments, and educational journeys.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {galleryCategories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                count={categoryCounts[cat] ?? 0}
                onClick={() => handleCategoryChange(cat)}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center font-sans text-xs text-white/25 tracking-wider mb-10"
          >
            Showing {displayed.length} of {filtered.length} images
            {activeCategory !== 'All' && ` in "${activeCategory}"`}
          </motion.p>

          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {displayed.map((item, i) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={i}
                  onOpen={setLightboxItem}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Images size={40} className="text-gold/20 mx-auto mb-4" />
              <p className="font-sans text-white/30 text-sm">No images in this category yet.</p>
              <p className="font-sans text-white/20 text-xs mt-2">
                Add images to <code className="text-gold/40">public/images/gallery/</code> and update{' '}
                <code className="text-gold/40">galleryData.js</code>
              </p>
            </motion.div>
          )}

          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-3 mt-12"
            >
              <div
                className="w-48 h-0.5 rounded-full overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #D4AF37, #F0D060)' }}
                  animate={{ width: `${(displayed.length / filtered.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="font-sans text-xs text-white/25">{displayed.length} / {filtered.length} loaded</p>

              <motion.button
                onClick={() => setShowCount((c) => c + LOAD_MORE_STEP)}
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="mt-2 flex items-center gap-2 font-sans font-semibold text-sm tracking-widest uppercase px-9 py-4 rounded-full transition-all duration-400"
                style={{ border: '1px solid rgba(212,175,55,0.4)', color: '#D4AF37', background: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg,#D4AF37,#F0D060)';
                  e.currentTarget.style.color = '#050505';
                  e.currentTarget.style.boxShadow = '0 0 35px rgba(212,175,55,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Load More
                <span className="text-xs opacity-60">+{Math.min(remaining, LOAD_MORE_STEP)}</span>
              </motion.button>
            </motion.div>
          )}

          {!hasMore && filtered.length > INITIAL_SHOW && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-sans text-xs text-white/20 tracking-widest mt-10"
            >
              ✦ All {filtered.length} images loaded ✦
            </motion.p>
          )}

        </div>
      </section>

      <AnimatePresence>
        {lightboxItem && (
          <GalleryLightbox
            item={lightboxItem}
            allItems={filtered}
            onClose={() => setLightboxItem(null)}
            onNavigate={setLightboxItem}
          />
        )}
      </AnimatePresence>
    </>
  );
}