import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Tagline() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [flourishKey, setFlourishKey] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReducedMotion(
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }
  }, []);

  const triggerFlourish = () => {
    setFlourishKey((prev) => prev + 1);
  };

  // Static fallback for reduced motion preference
  if (reducedMotion) {
    return (
      <div className="mt-6 max-w-2xl flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-5">
        {/* Row 1 on Mobile: "I think." -> "I design." */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          {/* Shape 1: "I think." */}
          <div className="relative inline-flex items-center justify-center px-5 py-2.5 min-w-[130px] min-h-[48px] border-2 border-dashed border-teal/70 rounded-full bg-teal/[0.05]">
            <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-ink relative z-10 whitespace-nowrap">
              I think.
            </span>
          </div>

          {/* Flow Connector 1 (Think -> Design) */}
          <div className="flex items-center justify-center text-teal/70 select-none">
            <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
              <path
                d="M 2 7 H 20 M 15 2 L 21 7 L 15 12"
                stroke="var(--color-teal)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="4 3"
              />
            </svg>
          </div>

          {/* Shape 2: "I design." */}
          <div className="relative inline-flex items-center justify-center p-3.5 min-w-[140px] min-h-[48px]">
            <div className="absolute inset-0 border-2 border-coral rotate-[12deg] pointer-events-none bg-coral/[0.04]">
              <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-coral" />
              <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-coral" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-coral" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-coral" />
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-ink relative z-10 whitespace-nowrap">
              I design.
            </span>
          </div>
        </div>

        {/* Desktop Horizontal Connector 2 (Design -> Build) */}
        <div className="hidden sm:flex items-center justify-center text-coral/70 select-none">
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <path
              d="M 2 7 H 20 M 15 2 L 21 7 L 15 12"
              stroke="var(--color-coral)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Mobile Diagonal Arrow (Design [top-right] -> Build [bottom-center]) */}
        <div className="flex sm:hidden items-center justify-center my-0.5 text-coral select-none">
          <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path
              d="M 26 3 L 7 19 M 15 19 L 6 19 L 7 10"
              stroke="var(--color-coral)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 3"
            />
          </svg>
        </div>

        {/* Row 2 on Mobile (Centered): "I BUILD." */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <div className="relative inline-flex items-center justify-center px-6 py-3 min-w-[150px] min-h-[50px] bg-amber rounded-none shadow-md border-2 border-ink">
            <svg
              viewBox="0 0 160 54"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              preserveAspectRatio="none"
            >
              <line x1="0" y1="27" x2="160" y2="27" stroke="var(--color-ink)" strokeWidth="2" />
              <line x1="53" y1="0" x2="53" y2="27" stroke="var(--color-ink)" strokeWidth="2" />
              <line x1="106" y1="0" x2="106" y2="27" stroke="var(--color-ink)" strokeWidth="2" />
              <line x1="26" y1="27" x2="26" y2="54" stroke="var(--color-ink)" strokeWidth="2" />
              <line x1="80" y1="27" x2="80" y2="54" stroke="var(--color-ink)" strokeWidth="2" />
              <line x1="133" y1="27" x2="133" y2="54" stroke="var(--color-ink)" strokeWidth="2" />
            </svg>
            <span className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-ink uppercase tracking-wider relative z-10 whitespace-nowrap">
              I BUILD.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-2xl select-none flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-5">
      {/* ── Row 1 on Mobile: "I think." -> "I design." side-by-side with connector ── */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        {/* Shape 1: "I think." */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="group relative inline-flex items-center justify-center px-5 py-2.5 min-w-[130px] min-h-[48px] border-2 border-dashed border-teal/70 rounded-full bg-teal/[0.05] shadow-2xs hover:border-teal hover:bg-teal/15 transition-all duration-200 cursor-pointer"
        >
          <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-ink relative z-10 whitespace-nowrap group-hover:text-teal-900 transition-colors">
            I think.
          </span>
        </motion.div>

        {/* Sequential Flow Arrow 1: Think -> Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.3, delay: 0.28 }}
          className="flex items-center justify-center text-teal/70 select-none"
        >
          <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
            <motion.path
              d="M 2 7 H 20 M 15 2 L 21 7 L 15 12"
              stroke="var(--color-teal)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.35, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        {/* Shape 2: "I design." */}
        <motion.div
          initial={{ opacity: 0, y: 16, rotate: -6, scale: 0.92 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
          whileHover={{ scale: 1.06 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
          className="group relative inline-flex items-center justify-center p-3.5 min-w-[140px] min-h-[48px] cursor-pointer"
        >
          <div className="absolute inset-0 border-2 border-coral rotate-[12deg] pointer-events-none bg-coral/[0.04] shadow-2xs group-hover:border-coral group-hover:bg-coral/[0.1] transition-all duration-200">
            <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-coral group-hover:scale-125 transition-transform duration-200" />
            <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-coral group-hover:scale-125 transition-transform duration-200" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-coral group-hover:scale-125 transition-transform duration-200" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-coral group-hover:scale-125 transition-transform duration-200" />
          </div>
          <span className="font-heading font-bold text-lg sm:text-xl md:text-2xl text-ink relative z-10 whitespace-nowrap">
            I design.
          </span>
        </motion.div>
      </div>

      {/* ── Desktop Flow Arrow 2: Design -> Build (Horizontal) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.3, delay: 0.62 }}
        className="hidden sm:flex items-center justify-center text-coral/70 select-none"
      >
        <svg width="24" height="14" viewBox="0 0 24 14" fill="none">
          <motion.path
            d="M 2 7 H 20 M 15 2 L 21 7 L 15 12"
            stroke="var(--color-coral)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.65 }}
          />
        </svg>
      </motion.div>

      {/* ── Mobile Flow Arrow 2: Diagonal Down-Left (Design [top-right] -> Build [bottom-center]) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.3, delay: 0.62 }}
        className="flex sm:hidden items-center justify-center my-0.5 text-coral select-none"
      >
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
          <motion.path
            d="M 26 3 L 7 19 M 15 19 L 6 19 L 7 10"
            stroke="var(--color-coral)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.65 }}
          />
        </svg>
      </motion.div>

      {/* ── Row 2 on Mobile (Centered): "I BUILD." ── */}
      <div className="flex items-center justify-center w-full sm:w-auto">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 18,
            delay: 0.75,
          }}
          onMouseEnter={triggerFlourish}
          onClick={triggerFlourish}
          className="relative inline-flex items-center justify-center px-6 py-3 min-w-[150px] min-h-[50px] bg-amber rounded-none cursor-pointer shadow-md border-2 border-ink group overflow-hidden"
          role="button"
          tabIndex={0}
          aria-label="I BUILD"
        >
          {/* Internal Structural Brick Grid Lines */}
          <motion.svg
            key={`grid-lines-${flourishKey}`}
            viewBox="0 0 160 54"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="27"
              x2="160"
              y2="27"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: flourishKey > 0 ? 0 : 0.85 }}
            />
            <motion.line
              x1="53"
              y1="0"
              x2="53"
              y2="27"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: flourishKey > 0 ? 0.1 : 0.95 }}
            />
            <motion.line
              x1="106"
              y1="0"
              x2="106"
              y2="27"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: flourishKey > 0 ? 0.15 : 1.0 }}
            />
            <motion.line
              x1="26"
              y1="27"
              x2="26"
              y2="54"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: flourishKey > 0 ? 0.2 : 1.05 }}
            />
            <motion.line
              x1="80"
              y1="27"
              x2="80"
              y2="54"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: flourishKey > 0 ? 0.25 : 1.1 }}
            />
            <motion.line
              x1="133"
              y1="27"
              x2="133"
              y2="54"
              stroke="var(--color-ink)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.25, delay: flourishKey > 0 ? 0.3 : 1.15 }}
            />
          </motion.svg>

          {/* Flourishing text block */}
          <motion.span
            key={`build-text-${flourishKey}`}
            initial={{ scale: flourishKey > 0 ? 0.92 : 1 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="font-heading font-black text-xl sm:text-2xl md:text-3xl text-ink uppercase tracking-wider relative z-10 whitespace-nowrap"
          >
            I BUILD.
          </motion.span>
        </motion.div>
      </div>
    </div>
  );
}
