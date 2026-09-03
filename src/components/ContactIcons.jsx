import { useState } from 'react';
import {
  motion,
  AnimatePresence,
} from 'framer-motion';
import {
  FaGithub,
  FaEnvelope,
} from 'react-icons/fa';

export default function ContactIcons({
  className = '',
  iconSize = 20,
}) {
  const [copied, setCopied] = useState(false);
  const [hoveredEmail, setHoveredEmail] =
    useState(false);
  const [hoveredGithub, setHoveredGithub] =
    useState(false);

  const handleEmailClick = () => {
    // 1. Copy to clipboard
    if (
      navigator.clipboard &&
      navigator.clipboard.writeText
    ) {
      navigator.clipboard.writeText(
        'samuelsonacheampong@gmail.com',
      );
    }

    // 2. Show tooltip
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const springTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 15,
  };

  return (
    <div
      className={`flex items-center gap-4 ${className}`}
    >
      {/* GitHub Link */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <motion.a
          href='https://github.com/3NaNa7'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='GitHub Profile'
          className='hover:text-coral transition-colors duration-200'
          whileHover={{ scale: 1.12, rotate: -2 }}
          transition={springTransition}
          onMouseEnter={() =>
            setHoveredGithub(true)
          }
          onMouseLeave={() =>
            setHoveredGithub(false)
          }
          style={{
            color: 'currentColor',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaGithub size={iconSize} />
        </motion.a>

        {/* GitHub Tooltip */}
        <AnimatePresence>
          {hoveredGithub && (
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
                bottom: '140%',
                left: '50%',
                background: 'var(--color-ink)',
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
              GitHub
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
                    '4px solid var(--color-ink)',
                }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Email Link */}
      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
        }}
      >
        <motion.a
          role='button'
          onClick={handleEmailClick}
          onMouseEnter={() =>
            setHoveredEmail(true)
          }
          onMouseLeave={() =>
            setHoveredEmail(false)
          }
          whileHover={{ scale: 1.12, rotate: 2 }}
          transition={springTransition}
          aria-label='Send email and copy address to clipboard'
          className='hover:text-coral transition-colors duration-200'
          style={{
            padding: 0,
            cursor: 'pointer',
            color: 'currentColor',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 'none',
            textDecoration: 'none',
          }}
        >
          <FaEnvelope size={iconSize} />
        </motion.a>

        {/* Email Tooltip */}
        <AnimatePresence>
          {(copied || hoveredEmail) && (
            <motion.span
              key={copied ? 'copied' : 'copy'}
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
                bottom: '140%',
                left: '50%',
                background: copied
                  ? 'var(--color-teal)'
                  : 'var(--color-ink)',
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
              {copied ? 'Copied!' : 'Copy Email'}
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
                  borderTop: `4px solid ${copied ? 'var(--color-teal)' : 'var(--color-ink)'}`,
                }}
              />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
