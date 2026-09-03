import { useState, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import { resumeHighlights } from '../data/resumeHighlights.js';

// Deterministic per-tile variance to match SkillsGrid.jsx logic
function deterministicVariance(name, min, max) {
  const hash = name
    .split('')
    .reduce(
      (acc, ch) => acc + ch.charCodeAt(0),
      0,
    );
  return min + ((hash % 100) / 100) * (max - min);
}

export default function ResumeHighlights() {
  const [downloaded, setDownloaded] =
    useState(false);
  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReducedMotion(
        window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches,
      );
    }
  }, []);

  const handleDownloadClick = () => {
    if (downloaded) return;
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 1200);
  };

  const [copiedEmail, setCopiedEmail] =
    useState(false);
  const handleGetInTouchClick = () => {
    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard.writeText(
        'samuelsonacheampong@gmail.com',
      );
    }
    setCopiedEmail(true);
    setTimeout(() => {
      setCopiedEmail(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
      }}
      className='w-full flex flex-col items-center text-center max-w-2xl mx-auto gap-8'
    >
      {/* 1. TRAIL ACCENT — A small hand-drawn signpost SVG drifting slowly */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : {
                y: [0, -4, 0],
                rotate: [-1.5, 1.5, -1.5],
              }
        }
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut',
        }}
        className='w-16 h-16 shrink-0'
        aria-hidden='true'
      >
        <svg
          viewBox='0 0 60 60'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='w-full h-full'
        >
          {/* Post */}
          <path
            d='M 30 12 L 30 52'
            stroke='var(--color-ink)'
            strokeWidth='2.5'
            strokeLinecap='round'
            opacity='0.6'
          />
          {/* Mound/Base */}
          <path
            d='M 22 52 C 25 50.5, 35 50.5, 38 52'
            stroke='var(--color-ink)'
            strokeWidth='2.5'
            strokeLinecap='round'
            opacity='0.6'
          />
          {/* Sign board */}
          <path
            d='M 14 18 Q 30 16 46 18 L 44 32 Q 30 34 16 32 Z'
            stroke='var(--color-teal)'
            strokeWidth='2.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            fill='rgba(44,110,104,0.06)'
          />
          {/* Small coral marker dot/symbol */}
          <circle
            cx='30'
            cy='25'
            r='3'
            fill='var(--color-coral)'
          />
        </svg>
      </motion.div>

      {/* 2. TYPOGRAPHIC RECAP & PULL-QUOTE */}
      <div className='flex flex-col gap-6 w-full px-2'>
        <p className='font-body text-base sm:text-lg text-ink/80 leading-relaxed max-w-xl mx-auto'>
          {resumeHighlights.paragraph1}
        </p>

        {/* Pull-quote Callout */}
        <div className='relative py-2 select-none'>
          <span className='font-heading text-2xl sm:text-3xl text-ink font-bold relative inline-block'>
            I'm currently looking for my next{' '}
            <span className='text-teal relative inline-block'>
              opportunity
              {/* Subtle hand-drawn styled underline flourish */}
              <svg
                className='absolute left-0 -bottom-1.5 w-full h-2 text-amber'
                viewBox='0 0 100 10'
                preserveAspectRatio='none'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 5 C 30 2, 70 8, 97 4'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                />
              </svg>
            </span>
            .
          </span>
        </div>
      </div>

      {/* 3. ROW OF "OPEN TO" TAGS */}
      <div className='flex flex-wrap justify-center gap-3 max-w-lg mt-2'>
        {resumeHighlights.openTo.map((role) => {
          const rotation = deterministicVariance(
            role,
            -2,
            2,
          );
          return (
            <div
              key={role}
              style={{
                transform: `rotate(${rotation}deg)`,
                fontFamily:
                  'var(--font-body, sans-serif)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                padding: '7px 16px',
                borderRadius: '999px',
                border:
                  '1.5px solid rgba(44,110,104,0.22)',
                background:
                  'rgba(44,110,104,0.04)',
                color: 'var(--color-ink)',
                boxShadow:
                  '0 2px 5px -1px rgba(0,0,0,0.02)',
                display: 'inline-block',
                whiteSpace: 'nowrap',
              }}
              className='hover:border-teal/50 hover:bg-teal/[0.08] transition-colors duration-200'
            >
              {role}
            </div>
          );
        })}
      </div>

      {/* 4. BUTTON ROW */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full'>
        {/* Resume Download Button */}
        <a
          href='/my_resume.pdf'
          download='Samuelson_Boadu-Acheampong_Resume.pdf'
          onClick={handleDownloadClick}
          className='inline-flex items-center gap-3 bg-teal text-paper font-body text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-md hover:bg-teal/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200'
        >
          <span className='relative w-5 h-5 flex items-center justify-center'>
            <AnimatePresence
              mode='wait'
              initial={false}
            >
              {downloaded ? (
                <motion.svg
                  key='check-icon'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  className='w-5 h-5 text-paper absolute'
                  initial={{
                    opacity: 0,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.2,
                  }}
                >
                  <path
                    fillRule='evenodd'
                    d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                    clipRule='evenodd'
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key='download-icon'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='2.5'
                  stroke='currentColor'
                  className='w-5 h-5 text-paper absolute'
                  initial={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: reducedMotion ? 0 : 6,
                  }}
                  transition={{
                    duration: reducedMotion
                      ? 0
                      : 0.2,
                  }}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
          <span>Download full CV (PDF)</span>
        </a>

        {/* Get in Touch Button */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
          }}
        >
          <a
            role='button'
            onClick={handleGetInTouchClick}
            className='inline-flex items-center gap-3 border-2 border-amber bg-transparent text-ink font-body text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full hover:bg-amber/10 active:scale-[0.98] transition-all duration-200 cursor-pointer'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2.5'
              stroke='var(--color-amber)'
              className='w-5 h-5 shrink-0'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5'
              />
            </svg>
            <span>
              {copiedEmail
                ? 'Copied email!'
                : 'Get in touch'}
            </span>
          </a>

          {/* Tooltip */}
          <AnimatePresence>
            {copiedEmail && (
              <motion.span
                initial={{
                  opacity: 0,
                  y: 6,
                  scale: 0.9,
                  x: '-50%',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  x: '-50%',
                }}
                exit={{
                  opacity: 0,
                  y: 6,
                  scale: 0.9,
                  x: '-50%',
                }}
                transition={{ duration: 0.12 }}
                style={{
                  position: 'absolute',
                  bottom: '125%',
                  left: '50%',
                  background: 'var(--color-teal)',
                  color: 'var(--color-paper)',
                  fontSize: '0.625rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow:
                    '0 4px 6px -1px rgba(0,0,0,0.15)',
                  zIndex: 100,
                }}
              >
                Copied!
                <span
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft:
                      '4px solid transparent',
                    borderRight:
                      '4px solid transparent',
                    borderTop:
                      '4px solid var(--color-teal)',
                  }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
