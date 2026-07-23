import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeHighlights } from '../data/resumeHighlights.js';

export default function ResumeHighlights() {
  const [downloaded, setDownloaded] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  const handleDownloadClick = () => {
    if (downloaded) return;
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 1200);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Cards list */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col gap-4"
      >
        {resumeHighlights.map((item) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            className="flex items-start gap-3.5 bg-teal/[0.02] border border-teal/15 border-l-4 border-l-teal rounded-r-lg p-4 sm:p-5 hover:border-teal/35 transition-all duration-300"
          >
            {/* Teal checkmark icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-teal shrink-0 mt-0.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed">
              {item.text}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Prominent centered Download button */}
      <div className="flex justify-center pt-2">
        <a
          href="/my_resume.pdf"
          download="Samuelson_Boadu-Acheampong_Resume.pdf"
          onClick={handleDownloadClick}
          className="inline-flex items-center gap-3 bg-teal text-paper font-body text-sm sm:text-base font-semibold px-8 py-3.5 rounded-full shadow-md hover:bg-teal/90 hover:shadow-lg active:scale-[0.98] transition-all duration-200"
        >
          <span className="relative w-5 h-5 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {downloaded ? (
                <motion.svg
                  key="check-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-paper absolute"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="download-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-paper absolute"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : 6 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </span>
          <span>Download full CV (PDF)</span>
        </a>
      </div>
    </div>
  );
}
