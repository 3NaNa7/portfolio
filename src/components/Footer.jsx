import ContactIcons from './ContactIcons';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-paper)',
        position: 'relative',
      }}
      className="w-full flex flex-col items-center justify-center text-center px-6 relative"
    >
      {/* Hand-drawn style decorative wavy top border to mirror rolling hills */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none" style={{ height: '24px' }}>
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-full"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            d="M0,0 C150,15 350,5 500,12 C650,19 850,8 1000,15 C1150,22 1200,0 1200,0 L1200,24 L0,24 Z"
            fill="#A8CFC9"
            opacity="0.18"
          />
        </svg>
      </div>

      <div className="w-full pt-8 pb-20 sm:pb-12 text-ink/65 flex flex-col items-center justify-center gap-4">
        <ContactIcons iconSize={22} className="text-ink" />
        
        <p 
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.01em',
          }}
          className="mt-2"
        >
          Built with{' '}
          <a href="https://astro.build" target="_blank" rel="noopener noreferrer" className="hover:text-teal underline underline-offset-2 transition-colors duration-200">Astro</a>
          ,{' '}
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal underline underline-offset-2 transition-colors duration-200">Tailwind CSS</a>
          ,{' '}
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-teal underline underline-offset-2 transition-colors duration-200">React</a>
          {' '}&amp;{' '}
          <a href="https://framer.com/motion" target="_blank" rel="noopener noreferrer" className="hover:text-teal underline underline-offset-2 transition-colors duration-200">Framer Motion</a>
          .
        </p>
        
        <p 
          style={{
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.7rem',
            opacity: 0.65,
          }}
        >
          &copy; {new Date().getFullYear()} Samuelson Boadu-Acheampong. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
