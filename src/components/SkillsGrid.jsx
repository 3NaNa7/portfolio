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
        border: `1.5px solid ${active ? tokens.pillActive : 'rgba(32,48,46,0.20)'}`,
        background: active ? tokens.pillActive : 'transparent',
        color: active ? tokens.pillText : 'rgba(32,48,46,0.60)',
        cursor: 'pointer',
        transition: 'background 0.18s, border-color 0.18s, color 0.18s',
        whiteSpace: 'nowrap',
        outline: 'none',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.borderColor = tokens.pillActive;
          e.currentTarget.style.color = 'var(--color-ink)';
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.borderColor = 'rgba(32,48,46,0.20)';
          e.currentTarget.style.color = 'rgba(32,48,46,0.60)';
        }
      }}
    >
      {label}
    </button>
  );
}

// ─── Skill tag ────────────────────────────────────────────────────────────────
function SkillTag({ skill, categoryColor, index }) {
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
    transition: 'transform 0.15s',
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
        background: 'rgba(32,48,46,0.05)',
        border: '1.5px solid rgba(32,48,46,0.10)',
        fontFamily: 'var(--font-body, sans-serif)',
        fontSize: '0.75rem',
        fontWeight: 400,
        color: 'var(--color-ink)',
      }}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          style={{ width: '14px', height: '14px', color: 'rgba(32,48,46,0.55)', flexShrink: 0 }}
        />
      )}
      {skill.name}
    </span>
  );
}

// ─── Main grid ────────────────────────────────────────────────────────────────
export default function SkillsGrid() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = activeFilter === 'all'
    ? skills
    : skills.filter(s => s.category === activeFilter);

  // Find color for currently active category (used for "All" pill when category active)
  const activeCat = skillCategories.find(c => c.id === activeFilter);

  return (
    <div style={{ fontFamily: 'var(--font-body, sans-serif)' }}>
      {/* ── Filter pills ─────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '24px',
        }}
        role="group"
        aria-label="Filter skills by category"
      >
        <FilterPill
          label="All"
          color={activeCat?.color ?? 'teal'}
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

      {/* ── Skill tags ───────────────────────────────────────────────────── */}
      <motion.div
        layout
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          alignContent: 'flex-start',
        }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((skill, i) => {
            const catColor = skillCategories.find(c => c.id === skill.category)?.color ?? 'teal';
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.18,
                  delay: i * 0.012,   // stagger: deterministic, not random
                  ease: 'easeOut',
                }}
              >
                <SkillTag
                  skill={skill}
                  categoryColor={catColor}
                  index={i}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'rgba(32,48,46,0.50)', fontFamily: 'var(--font-body, sans-serif)' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(44,110,104,0.20)', border: '1.5px solid rgba(44,110,104,0.40)' }} />
          Core skill
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: 'rgba(32,48,46,0.50)', fontFamily: 'var(--font-body, sans-serif)' }}>
          <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '3px', background: 'rgba(32,48,46,0.05)', border: '1.5px solid rgba(32,48,46,0.15)' }} />
          Also comfortable with
        </span>
      </div>
    </div>
  );
}
