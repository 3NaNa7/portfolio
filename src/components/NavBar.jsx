import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Nav links (order matches index.astro rendering) ──────────────────────────
const NAV_LINKS = [
  { id: 'hero',          label: 'Home'          },
  { id: 'about',         label: 'About'         },
  { id: 'experience',    label: 'Experience'    },
  { id: 'projects',      label: 'Projects'      },
  { id: 'academic-work', label: 'Academic Work' },
  { id: 'resume',        label: 'Resume'        },
];

// ── Smooth-scroll helper ─────────────────────────────────────────────────────
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navH = document.getElementById('site-navbar')?.offsetHeight ?? 64;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ── NavLink ──────────────────────────────────────────────────────────────────
function NavLink({ id, label, isActive, reducedMotion, onClick }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id);
        if (onClick) onClick();
      }}
      style={{
        fontFamily:     'var(--font-body, sans-serif)',
        fontSize:       '0.8125rem',
        fontWeight:     600,
        letterSpacing:  '0.03em',
        textDecoration: 'none',
        color:          isActive ? 'var(--color-teal)' : 'var(--color-ink)',
        paddingBottom:  '2px',
        borderBottom:   isActive
          ? '2px solid var(--color-teal)'
          : '2px solid transparent',
        transition: reducedMotion ? 'none' : 'color 0.2s, border-color 0.2s',
        whiteSpace: 'nowrap',
        display:    'block',
      }}
    >
      {label}
    </a>
  );
}

// ── Wordmark / Logo ──────────────────────────────────────────────────────────
function Wordmark({ scrolled }) {
  return (
    <a
      href="#hero"
      onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
      style={{
        textDecoration: 'none',
        flexShrink:     0,
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '5px',
      }}
    >
      {/* Teal opening angle bracket < */}
      <span style={{
        fontFamily: 'var(--font-body, monospace)',
        fontWeight: 700,
        fontSize:   '1rem',
        color:      'var(--color-teal)',
        lineHeight: 1,
        opacity:    0.75,
      }}>{'<'}</span>

      {/* Initials */}
      <span style={{
        fontFamily:    'var(--font-heading, serif)',
        fontStyle:     'italic',
        fontSize:      '1.1rem',
        fontWeight:    700,
        color:         'var(--color-ink)',
        letterSpacing: '-0.01em',
        lineHeight:    1,
      }}>SBA</span>

      {/* Coral slash / instead of the dot */}
      <span style={{
        fontFamily: 'var(--font-body, monospace)',
        fontWeight: 700,
        fontSize:   '1.1rem',
        color:      'var(--color-coral)',
        lineHeight: 1,
        opacity:    0.9,
      }}>{'/'}</span>

      {/* Teal closing angle bracket > */}
      <span style={{
        fontFamily: 'var(--font-body, monospace)',
        fontWeight: 700,
        fontSize:   '1rem',
        color:      'var(--color-teal)',
        lineHeight: 1,
        opacity:    0.75,
      }}>{'>'}</span>
    </a>
  );
}

// ── HamburgerIcon ─────────────────────────────────────────────────────────────
function HamburgerIcon({ open, dur }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Bar 1 — rotates to form top of × */}
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { rotate: 45, y: 6, originX: '12px', originY: '6px' } : { rotate: 0, y: 0 }}
        transition={{ duration: dur(200), ease: 'easeInOut' }}
        style={{ transformOrigin: '12px 6px' }}
      />
      {/* Bar 2 — fades out */}
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: dur(150), ease: 'easeInOut' }}
        style={{ transformOrigin: '12px 12px' }}
      />
      {/* Bar 3 — rotates to form bottom of × */}
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        stroke="var(--color-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: dur(200), ease: 'easeInOut' }}
        style={{ transformOrigin: '12px 18px' }}
      />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function NavBar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [activeId,      setActiveId]      = useState('hero');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Ref on the entire nav so outside-click handler doesn't catch inner clicks
  const navRef = useRef(null);

  // ── One-time setup ────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    // Past-Hero detection
    const heroEl = document.getElementById('hero');
    const checkScrolled = () => {
      const heroH = heroEl?.offsetHeight ?? window.innerHeight;
      setScrolled(window.scrollY > heroH * 0.6);
    };
    checkScrolled();
    window.addEventListener('scroll', checkScrolled, { passive: true });

    // Active-section tracking
    const isMobile = window.innerWidth < 768;
    const rootMargin = isMobile ? '-40% 0px -40% 0px' : '-20% 0px -75% 0px';
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); }),
      { rootMargin, threshold: 0 }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Page-edge boundary snapping
    const handleScroll = () => {
      if (window.scrollY <= 10) setActiveId('hero');
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 25) {
        setActiveId('resume');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrolled);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // ── Outside-click closes mobile menu ─────────────────────────────────────
  // FIX: attach to document on 'click' (not mousedown) so the hamburger button's
  // own onClick fires first and toggles state, then the document click is checked
  // against the nav ref. Using a small setTimeout ensures correct event ordering.
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    // Small delay so the toggle click resolves before we attach the listener
    const id = setTimeout(() => {
      document.addEventListener('click', handler);
    }, 0);
    return () => {
      clearTimeout(id);
      document.removeEventListener('click', handler);
    };
  }, [menuOpen]);

  const dur = (ms) => (reducedMotion ? 0 : ms / 1000);

  const barStyle = {
    background:   (scrolled || menuOpen) ? 'var(--color-paper)' : 'transparent',
    borderBottom: (scrolled || menuOpen) ? '1.5px dashed rgba(32,48,46,0.18)' : '1.5px dashed transparent',
    transition:   reducedMotion ? 'none' : 'background 0.35s ease, border-color 0.35s ease',
  };

  return (
    <nav
      id="site-navbar"
      ref={navRef}
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top:      0,
        left:     0,
        right:    0,
        zIndex:   50,
        ...barStyle,
      }}
    >
      {/* ── Main row ──────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth:       '80rem',
        margin:         '0 auto',
        padding:        '0 1.5rem',
        height:         'clamp(52px, 8vw, 68px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
      }}>
        <Wordmark scrolled={scrolled} />

        {/* Desktop link row — hidden on mobile via CSS media query (not Tailwind class) */}
        <div style={{
          display:    'none',    // default hidden
          alignItems: 'center',
          gap:        '1.75rem',
        }}
          className="nav-desktop-links"
        >
          {NAV_LINKS.map(({ id, label }) => (
            <NavLink
              key={id}
              id={id}
              label={label}
              isActive={activeId === id}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Hamburger — hidden on desktop via CSS media query */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="nav-hamburger"
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    '8px',
            display:    'flex',        // shown by default (mobile-first)
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HamburgerIcon open={menuOpen} dur={dur} />
        </button>
      </div>

      {/* ── Mobile dropdown ────────────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: dur(180), ease: 'easeOut' }}
            className="nav-mobile-menu"
            style={{
              background:   'var(--color-paper)',
              borderBottom: '1.5px dashed rgba(32,48,46,0.18)',
              padding:      '0.5rem 1.5rem 1rem',
              display:      'flex',
              flexDirection:'column',
              gap:          '1.1rem',
            }}
          >
            {NAV_LINKS.map(({ id, label }) => (
              <NavLink
                key={id}
                id={id}
                label={label}
                isActive={activeId === id}
                reducedMotion={reducedMotion}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive CSS — not relying on Tailwind for show/hide ─────────── */}
      <style>{`
        /* Mobile: show hamburger, hide desktop links */
        .nav-desktop-links { display: none !important; }
        .nav-hamburger     { display: flex !important; }
        .nav-mobile-menu   { display: flex !important; }

        /* Desktop (md = 768px+): flip them */
        @media (min-width: 768px) {
          .nav-desktop-links { display: flex !important; }
          .nav-hamburger     { display: none !important; }
          .nav-mobile-menu   { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
