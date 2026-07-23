import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories } from '../data/skills.js';
import { skillIcons } from '../data/skillIcons.js';

// ─── Deterministic per-tile variance ──────────────────────────────────────────
// Derived from the skill name's char codes so it's stable across SSR + hydration.
function deterministicVariance(name, min, max) {
  const hash = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return min + (hash % 100) / 100 * (max - min);
}

// ─── Color token helpers ──────────────────────────────────────────────────────
// Maps a category's color string to CSS custom-property values so we
// never hard-code hex and never let react-icons' brand colors through.
const colorMap = {
  teal: {
    pillActive:        'var(--color-teal)',
    pillText:          'var(--color-ink)',
    primaryBg:         'rgba(44,110,104,0.18)',   // --color-teal ~18% opacity
    primaryIconColor:  'var(--color-teal)',
    primaryText:       'var(--color-ink)',
    border:            'rgba(44,110,104,0.35)',
  },
  amber: {
    pillActive:        'var(--color-amber)',
    pillText:          'var(--color-ink)',
    primaryBg:         'rgba(224,164,88,0.22)',   // --color-amber ~22% opacity
    primaryIconColor:  'var(--color-amber)',
    primaryText:       'var(--color-ink)',
    border:            'rgba(224,164,88,0.40)',
  },
};

// ─── Filter pill ──────────────────────────────────────────────────────────────
function FilterPill({ label, color, active, onClick }) {
  const tokens = colorMap[color] ?? colorMap.teal;
  
  const isAll = label === 'All';
  const activeBg = isAll ? 'var(--color-ink)' : tokens.pillActive;
  const activeText = isAll ? 'var(--color-paper)' : tokens.pillText;
  
  // Mobile and Data & Infra categories have amber color assigned
  const inactiveBorder = color === 'amber' 
    ? 'rgba(224,164,88,0.50)' 
    : 'rgba(32,48,46,0.20)';

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.75rem',
        fontWeight: 600,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '5px 14px',
        borderRadius: '999px',
        border: `1.5px solid ${active ? (isAll ? 'var(--color-ink)' : tokens.pillActive) : inactiveBorder}`,
        background: active ? activeBg : 'transparent',
        color: active ? activeText : 'var(--color-ink)',
        cursor: 'pointer',
        transition: 'all 0.18s ease-in-out',
        whiteSpace: 'nowrap',
        outline: 'none',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = isAll ? 'var(--color-ink)' : tokens.pillActive;
          e.currentTarget.style.background = color === 'amber' ? 'rgba(224,164,88,0.12)' : 'rgba(44,110,104,0.10)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = inactiveBorder;
          e.currentTarget.style.background = 'transparent';
        }
      }}
    >
      {label}
    </button>
  );
}

// ─── Skill tag ────────────────────────────────────────────────────────────────
function SkillTag({ skill, categoryColor, isDimmed }) {
  const tokens = colorMap[categoryColor] ?? colorMap.teal;
  const Icon = skillIcons[skill.name];
  const isPrimary = skill.tier === 'primary';
  const isSpecial = skill.special === true;

  // Deterministic rotation: −2° … +2°
  const rotation = deterministicVariance(skill.name, -2, 2);

  // Base style shared by all tags
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    borderRadius: '8px',
    transform: `rotate(${rotation.toFixed(2)}deg)`,
    transition: 'all 0.2s ease',
    opacity: isDimmed ? 0.35 : 1,
    filter: isDimmed ? 'grayscale(0.6)' : 'none',
    cursor: 'default',
    userSelect: 'none',
  };

  if (isSpecial) {
    return (
      <span
        style={{
          ...baseStyle,
          padding: '4px 12px',
          border: '1.5px dashed rgba(32,48,46,0.30)',
          background: 'transparent',
          fontFamily: 'var(--font-heading, serif)',
          fontStyle: 'italic',
          fontSize: '0.75rem',
          color: 'rgba(32,48,46,0.50)',
        }}
      >
        {skill.name}
      </span>
    );
  }

  if (isPrimary) {
    return (
      <span
        style={{
          ...baseStyle,
          padding: '6px 14px',
          background: tokens.primaryBg,
          border: `1.5px solid ${tokens.border}`,
          fontFamily: 'var(--font-body, sans-serif)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: tokens.primaryText,
        }}
      >
        {Icon && (
          <Icon
            aria-hidden="true"
            style={{ width: '15px', height: '15px', color: tokens.primaryIconColor, flexShrink: 0 }}
          />
        )}
        {skill.name}
      </span>
    );
  }

  // Secondary
  return (
    <span
      style={{
        ...baseStyle,
        padding: '4px 10px',
        background: categoryColor === 'amber' ? 'rgba(224,164,88,0.10)' : 'rgba(32,48,46,0.05)',
        border: `1.5px solid ${categoryColor === 'amber' ? 'rgba(224,164,88,0.35)' : 'rgba(32,48,46,0.12)'}`,
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.75rem',
        fontWeight: 400,
        color: 'var(--color-ink)',
      }}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          style={{ width: '14px', height: '14px', color: categoryColor === 'amber' ? 'var(--color-amber)' : 'rgba(32,48,46,0.55)', flexShrink: 0 }}
        />
      )}
      {skill.name}
    </span>
  );
}

// ─── Main grid ────────────────────────────────────────────────────────────────
export default function SkillsGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeTierFilter, setActiveTierFilter] = useState('all'); // 'all' | 'primary' | 'secondary'

  const filtered = (activeFilter === 'all'
    ? skills.filter(s => !s.special)
    : skills.filter(s => s.category === activeFilter)
  );

  const toggleTierFilter = (tier) => {
    setActiveTierFilter(prev => prev === tier ? 'all' : tier);
  };

  return (
    <div style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
      {/* ── Filter pills ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '20px',
        }}
        role="group"
        aria-label="Filter skills by category"
      >
        <FilterPill
          label="All"
          color="teal"
          active={activeFilter === 'all'}
          onClick={() => setActiveFilter('all')}
        />
        {skillCategories.map(cat => (
          <FilterPill
            key={cat.id}
            label={cat.label}
            color={cat.color}
            active={activeFilter === cat.id}
            onClick={() => setActiveFilter(cat.id)}
          />
        ))}
      </div>

      {/* ── Skill tags container with responsive height (scroll on mobile only, full visible on desktop) ───── */}
      <div
        className={`flex flex-wrap gap-2.5 items-start ${
          activeFilter === 'all' ? 'max-md:max-h-[300px] max-md:overflow-y-auto max-md:pr-1.5' : ''
        }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((skill, i) => {
            const catColor = skillCategories.find(c => c.id === skill.category)?.color ?? 'teal';
            const isDimmed = activeTierFilter !== 'all' && skill.tier !== activeTierFilter;

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.2,
                  delay: i * 0.015,
                  ease: 'easeOut',
                }}
              >
                <SkillTag
                  skill={skill}
                  categoryColor={catColor}
                  isDimmed={isDimmed}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Interactive Legend Filter ───────────────────────────────────── */}
      <div
        style={{
          marginTop: '20px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(32,48,46,0.10)',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(32,48,46,0.5)', fontWeight: 600 }}>
          Filter by level:
        </span>

        <button
          type="button"
          onClick={() => toggleTierFilter('primary')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 500,
            padding: '3px 8px',
            borderRadius: '6px',
            background: activeTierFilter === 'primary' ? 'rgba(32,48,46,0.10)' : 'transparent',
            border: `1px solid ${activeTierFilter === 'primary' ? 'var(--color-ink)' : 'transparent'}`,
            color: activeTierFilter === 'primary' ? 'var(--color-ink)' : 'rgba(32,48,46,0.70)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(44,110,104,0.30)', border: '1.5px solid var(--color-teal)' }} />
          Core Skill {activeTierFilter === 'primary' ? '✓' : ''}
        </button>

        <button
          type="button"
          onClick={() => toggleTierFilter('secondary')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.75rem',
            fontWeight: 500,
            padding: '3px 8px',
            borderRadius: '6px',
            background: activeTierFilter === 'secondary' ? 'rgba(32,48,46,0.10)' : 'transparent',
            border: `1px solid ${activeTierFilter === 'secondary' ? 'var(--color-ink)' : 'transparent'}`,
            color: activeTierFilter === 'secondary' ? 'var(--color-ink)' : 'rgba(32,48,46,0.70)',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(32,48,46,0.05)', border: '1.5px solid rgba(32,48,46,0.25)' }} />
          Also comfortable with {activeTierFilter === 'secondary' ? '✓' : ''}
        </button>

        {activeTierFilter !== 'all' && (
          <button
            type="button"
            onClick={() => setActiveTierFilter('all')}
            style={{ fontSize: '0.7rem', color: 'var(--color-coral)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', marginLeft: 'auto' }}
          >
            Show all levels
          </button>
        )}
      </div>
    </div>
  );
}
