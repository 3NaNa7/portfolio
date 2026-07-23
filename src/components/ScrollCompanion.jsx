import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ─── Data (DOM ordered to match index.astro rendering) ────────────────────────
const sections = [
  { id: 'hero',          label: 'Trailhead'    },
  { id: 'about',         label: 'Base Camp'    },
  { id: 'experience',    label: 'The Climb'    },
  { id: 'projects',      label: 'Summit'       },
  { id: 'academic-work', label: 'The Overlook' },
  { id: 'resume',        label: "Trail's End"  },
];

// ─── Companion SVG — mirrors the character drawn in Hero.astro ────────────────
function CompanionIcon({ size = 40, wave = false, reducedMotion = false }) {
  const waveKeyframes = [0, -25, 10, -25, 10, -15, 0];
  const waveTimes = [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1];
  return (
    <svg
      width={size}
      height={(size * 52) / 60}
      viewBox="0 0 60 52"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="15" cy="46" rx="8" ry="4" fill="var(--color-coral)" />
      <ellipse cx="45" cy="46" rx="8" ry="4" fill="var(--color-coral)" />
      <ellipse cx="30" cy="26" rx="25" ry="18" fill="var(--color-coral)" />
      <circle cx="22" cy="21" r="3" fill="var(--color-ink)" />
      <circle cx="38" cy="21" r="3" fill="var(--color-ink)" />
      <AnimatePresence>
        {wave && (
          <motion.g
            key="wave-arm"
            style={{ transformOrigin: '44px 23px' }}
            initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: reducedMotion ? 0 : waveKeyframes,
            }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              opacity: { duration: reducedMotion ? 0 : 0.2 },
              scale: { duration: reducedMotion ? 0 : 0.2 },
              rotate: {
                duration: reducedMotion ? 0 : 1.4,
                times: reducedMotion ? undefined : waveTimes,
                ease: 'easeInOut',
              },
            }}
          >
            <line
              x1="44" y1="23" x2="53" y2="9"
              stroke="var(--color-coral)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <circle cx="53" cy="9" r="4.5" fill="var(--color-coral)" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}

// ─── Shared label pill styles ─────────────────────────────────────────────────
const pillStyle = {
  display: 'block',
  background: 'var(--color-paper)',
  border: '1px solid rgba(32,48,46,0.10)',
  borderRadius: '6px',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  padding: '4px 10px 4px 10px',
  whiteSpace: 'nowrap',
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function ScrollCompanion() {
  const [progress,       setProgress]       = useState(0);
  const [activeId,       setActiveId]       = useState('hero');
  const [isMobile,       setIsMobile]       = useState(false);
  const [reducedMotion,  setReducedMotion]  = useState(false);
  const [mounted,        setMounted]        = useState(false);
  const [sectionOffsets, setSectionOffsets] = useState([]);

  const rafId = useRef(null);

  // ── Framer Motion Springs for smooth organic scrolling (Desktop) ───────────
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, { damping: 25, stiffness: 120 });
  const companionTop   = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // ── Calculate dynamic section offsets based on layout height ────────────
    const updateOffsets = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const offsets = sections.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const absTop = rect.top + window.scrollY;
        return Math.min(1, Math.max(0, absTop / scrollable));
      });
      setSectionOffsets(offsets);
    };

    updateOffsets();
    // Allow fonts/images/layout to settle then recalculate
    const timer = setTimeout(updateOffsets, 500);

    // ── Resize ───────────────────────────────────────────────────────────────
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      updateOffsets();
    };
    window.addEventListener('resize', handleResize);

    // ── Scroll (rAF-throttled) ──────────────────────────────────────────────
    const handleScroll = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const raw = scrollable > 0 ? window.scrollY / scrollable : 0;
        setProgress(Math.min(1, Math.max(0, raw)));

        // Force boundary section states to resolve scroll limits
        if (window.scrollY <= 10) {
          setActiveId(sections[0].id);
        } else if (scrollable > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 25) {
          setActiveId(sections[sections.length - 1].id);
        }

        rafId.current = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── IntersectionObserver (Responsive trigger line: center-based on mobile, top-based on desktop) ──
    const isMobileDevice = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: isMobileDevice ? '-40% 0px -40% 0px' : '-25% 0px -74% 0px',
        threshold: 0
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Update Motion Value when progress changes
  useEffect(() => {
    scrollProgress.set(progress);
  }, [progress, scrollProgress]);

  if (!mounted) return null;

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeLabel = sections[activeIndex]?.label ?? 'Trailhead';
  const activeCounter = `${activeIndex + 1} / ${sections.length}`;

  const dur = (ms) => (reducedMotion ? 0 : ms / 1000);

  // ── Bob animation for the companion ───────────────────────────────────────
  const bobAnimate = reducedMotion
    ? {}
    : { y: [0, -5, 0] };
  const bobTransition = reducedMotion
    ? {}
    : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' };

  // ─────────────────────────────────────────────────────────────────────────
  // DESKTOP RAIL
  // ─────────────────────────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
        className="fixed left-6 top-[10vh] bottom-[10vh] z-40 w-[2px]"
      >
        {/* ── Dashed trail track line & stop markers — always visible, fades out at ends ── */}
        <div
          className="absolute inset-0"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
          }}
        >
          {/* Dashed trail background track */}
          <div
            className="absolute inset-0 w-[2px]"
            style={{ borderLeft: '2px dashed rgba(32,48,46,0.20)' }}
          />

          {/* Topographic section stop markers */}
          {sectionOffsets.map((pct, idx) => {
            const isPassed = progress >= pct - 0.01;
            return (
              <div
                key={`marker-${idx}`}
                style={{
                  position: 'absolute',
                  top: `${pct * 100}%`,
                  left: 0,
                  transform: 'translate(-50%, -50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isPassed ? 'var(--color-coral)' : 'var(--color-paper)',
                  border: `2px solid ${isPassed ? 'var(--color-coral)' : 'rgba(32,48,46,0.3)'}`,
                  transition: 'background 0.3s, border-color 0.3s',
                  zIndex: 2,
                }}
              />
            );
          })}
        </div>

        {/* ── TRAILHEAD ANCHOR (Hero section only) ──────────────────────── */}
        <AnimatePresence>
          {activeId === 'hero' && (
            <div style={{ position: 'absolute', top: 0, left: '26px', transform: 'translateY(-50%)' }}>
              <motion.div
                key="trailhead-anchor"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: dur(350) }}
              >
                {/* Pointer back to the rail */}
                <span
                  style={{
                    position: 'absolute',
                    left: '-6px',
                    top: '50%',
                    transform: 'translateY(-50%) rotate(45deg)',
                    width: '10px',
                    height: '10px',
                    background: 'var(--color-paper)',
                    border: '1px solid rgba(32,48,46,0.10)',
                    borderRight: 'none',
                    borderTop: 'none',
                  }}
                />
                <span
                  style={{
                    ...pillStyle,
                    transform: 'rotate(-3deg)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1px',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-heading, serif)',
                    fontStyle: 'italic',
                    fontSize: '0.8125rem',
                    color: 'var(--color-ink)',
                  }}>
                    Trailhead
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.65rem',
                    color: 'rgba(32,48,46,0.40)',
                    letterSpacing: '0.04em',
                  }}>
                    scroll to journey ↓
                  </span>
                </span>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── MOVING COMPANION + LABEL & PROGRESS FILL (all sections except Hero) ───────── */}
        <AnimatePresence>
          {activeId !== 'hero' && (
            <>
              {/* Progress track fill overlay (only visible when not on Hero) */}
              <motion.div
                key="progress-fill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: dur(400) }}
                className="absolute left-0 top-0 w-[2px]"
                style={{
                  height: companionTop,
                  background: 'var(--color-coral)',
                  maskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 8%, black 92%, transparent)',
                }}
              />

              {/* Companion Container (with smooth spring top movement) */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: companionTop,
                  left: 0,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.div
                  key="rail-companion"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    ...bobAnimate,
                  }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{
                    opacity: { duration: dur(400) },
                    x:       { duration: dur(400) },
                    ...(!reducedMotion ? { y: bobTransition } : {}),
                  }}
                >
                  <CompanionIcon size={36} wave={activeId === 'resume'} reducedMotion={reducedMotion} />
                </motion.div>
              </motion.div>

              {/* Label + counter Container — anchored 26px right (left: '26px') */}
              <div
                style={{
                  position: 'absolute',
                  top: companionTop,
                  left: '26px',
                  transform: 'translateY(-50%)',
                }}
              >
                <motion.div
                  key="rail-label"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: dur(400) }}
                >
                  {/* Pointer back to companion — pointing left, positioned at left: '-6px' */}
                  <span
                    style={{
                      position: 'absolute',
                      left: '-6px',
                      top: '50%',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '10px',
                      height: '10px',
                      background: 'var(--color-paper)',
                      border: '1px solid rgba(32,48,46,0.10)',
                      borderRight: 'none',
                      borderTop: 'none',
                    }}
                  />

                  {/* Label crossfade on section change */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeId}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: dur(200) }}
                      style={{
                        ...pillStyle,
                        transform: 'rotate(-3deg)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1px',
                      }}
                    >
                      {/* Section name */}
                      <span style={{
                        fontFamily: 'var(--font-heading, serif)',
                        fontStyle: 'italic',
                        fontSize: '0.8125rem',
                        color: 'var(--color-ink)',
                      }}>
                        {activeLabel}
                      </span>
                      {/* Counter — e.g. "2 / 5" */}
                      <span style={{
                        fontFamily: 'var(--font-body, sans-serif)',
                        fontSize: '0.65rem',
                        color: 'rgba(32,48,46,0.40)',
                        letterSpacing: '0.04em',
                      }}>
                        {activeCounter}
                      </span>
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MOBILE BOTTOM BAR
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <AnimatePresence>
        {activeId !== 'hero' && (
          <motion.div
            key="mobile-bar"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: dur(300), ease: 'easeOut' }}
            className="fixed bottom-0 inset-x-0 z-40 flex flex-col"
            style={{
              background: 'var(--color-paper)',
              borderTop: '2px dashed rgba(32,48,46,0.20)',
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            {/* Progress fill line */}
            <div className="relative w-full h-[2px] bg-ink/10 overflow-hidden">
              <motion.div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: `${progress * 100}%`,
                  background: 'var(--color-coral)',
                }}
              />
            </div>

            {/* Content row */}
            <div className="flex items-center justify-between px-4 py-2">
              {/* Left: companion (with bob) + label */}
              <div className="flex items-center gap-3">
                <motion.div
                  animate={bobAnimate}
                  transition={bobTransition}
                >
                  <CompanionIcon size={22} wave={activeId === 'resume'} reducedMotion={reducedMotion} />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeId}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: dur(200) }}
                    style={{
                      fontFamily: 'var(--font-heading, serif)',
                      fontStyle: 'italic',
                      fontSize: '0.875rem',
                      color: 'var(--color-ink)',
                    }}
                  >
                    {activeLabel}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Right: section counter */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeId + '-counter'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: dur(200) }}
                  style={{
                    fontFamily: 'var(--font-body, sans-serif)',
                    fontSize: '0.7rem',
                    color: 'rgba(32,48,46,0.40)',
                    letterSpacing: '0.05em',
                  }}
                >
                  {activeCounter}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
