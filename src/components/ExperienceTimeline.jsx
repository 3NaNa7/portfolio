import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, animate } from "framer-motion";
import { experiences } from "../data/experience.js";

// Technology logo icons
import {
  SiNodedotjs,
  SiExpress,
  SiBootstrap,
  SiHtml5,
  SiJavascript,
  SiWordpress,
  SiGithub,
  SiFlutter,
  SiSupabase,
  SiOpenstreetmap,
} from "react-icons/si";
import {
  FaGlobe,
  FaChalkboardTeacher,
  FaChartLine,
  FaServer,
  FaCodeBranch,
} from "react-icons/fa";

const techIconMap = {
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  "Bootstrap": SiBootstrap,
  "HTML5 & CSS3": SiHtml5,
  "JavaScript": SiJavascript,
  "WordPress": SiWordpress,
  "GitHub Pages": SiGithub,
  "Web Tech (HTML/CSS/JS)": FaGlobe,
  "Virtual Classroom Tech": FaChalkboardTeacher,
  "Social Media Analytics": FaChartLine,
  "System Admin": FaServer,
  "Flutter": SiFlutter,
  "Riverpod": FaCodeBranch,
  "Supabase": SiSupabase,
  "OpenStreetMap API": SiOpenstreetmap,
};

// Animation variants for direction-based slide
const panelVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : direction < 0 ? -50 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -50 : direction < 0 ? 50 : 0,
    opacity: 0,
  }),
};

export default function ExperienceTimeline() {
  const [activeIndex, setActiveIndex] = useState(experiences.length - 1);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = backward
  const [isDragging, setIsDragging] = useState(false);
  const [trackWidth, setTrackWidth] = useState(0);
  const [hasNudged, setHasNudged] = useState(false);
  
  const trackRef = useRef(null);
  const x = useMotionValue(0);

  // Measure track width and listen for window resizing
  useEffect(() => {
    if (!trackRef.current) return;
    const handleResize = () => {
      setTrackWidth(trackRef.current.getBoundingClientRect().width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update handle position or play initial nudge animation
  useEffect(() => {
    if (trackWidth === 0) return;
    const startX = (activeIndex / (experiences.length - 1)) * trackWidth;

    if (!hasNudged) {
      x.set(startX);
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!prefersReduced) {
        setHasNudged(true);
        
        // Custom nudge sequence based on the starting position
        let nudgeSequence;
        if (activeIndex === 0) {
          nudgeSequence = [startX, startX + 20, startX];
        } else if (activeIndex === experiences.length - 1) {
          nudgeSequence = [startX, startX - 20, startX];
        } else {
          nudgeSequence = [startX, startX - 15, startX + 15, startX];
        }

        animate(x, nudgeSequence, {
          times: nudgeSequence.length === 3 ? [0, 0.5, 1] : [0, 0.33, 0.66, 1],
          duration: 0.6,
          ease: "easeInOut",
          delay: 0.8,
        });
      } else {
        setHasNudged(true);
      }
    } else if (!isDragging) {
      animate(x, startX, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [activeIndex, trackWidth, isDragging, hasNudged]);

  const changeActiveIndex = (newIndex) => {
    if (newIndex === activeIndex) return;
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  const handleDotClick = (index) => {
    changeActiveIndex(index);
  };

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const nearestIndex = Math.min(
      experiences.length - 1,
      Math.max(0, Math.round((clickX / rect.width) * (experiences.length - 1)))
    );
    handleDotClick(nearestIndex);
  };

  const handleDrag = () => {
    const currentX = x.get();
    const nearestIndex = Math.min(
      experiences.length - 1,
      Math.max(0, Math.round((currentX / trackWidth) * (experiences.length - 1)))
    );
    if (nearestIndex !== activeIndex) {
      changeActiveIndex(nearestIndex);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const targetX = (activeIndex / (experiences.length - 1)) * trackWidth;
    animate(x, targetX, { type: "spring", stiffness: 300, damping: 30 });
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = Math.min(experiences.length - 1, activeIndex + 1);
      handleDotClick(nextIndex);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = Math.max(0, activeIndex - 1);
      handleDotClick(prevIndex);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* Slider / Timeline Track Wrapper */}
      <div
        role="slider"
        tabIndex={0}
        aria-valuenow={activeIndex}
        aria-valuemin={0}
        aria-valuemax={experiences.length - 1}
        aria-valuetext={`${experiences[activeIndex].role} at ${experiences[activeIndex].org}`}
        onKeyDown={handleKeyDown}
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative w-full h-12 flex items-center cursor-pointer select-none outline-none group"
      >
        {/* Dashed Track Line (matches Hero path style) */}
        <div className="absolute left-0 right-0 h-1 pointer-events-none flex items-center">
          <svg className="w-full h-8 overflow-visible" aria-hidden="true">
            <line
              x1="0%"
              y1="50%"
              x2="100%"
              y2="50%"
              stroke="var(--color-ink)"
              strokeWidth="3"
              strokeDasharray="8 8"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Solid Teal Progress Line (Framer Motion connected to handle position) */}
        <div className="absolute left-0 h-1 pointer-events-none flex items-center" style={{ right: 0 }}>
          <motion.div
            style={{ width: x }}
            className="h-[3px] bg-teal opacity-80 rounded-full"
          />
        </div>

        {/* Timeline Dots & Date Labels */}
        {experiences.map((exp, i) => {
          const isActive = i === activeIndex;
          const startYear = exp.dateRange.match(/\b\d{4}\b/)?.[0] || "";
          
          return (
            <motion.button
              key={exp.id}
              onClick={(e) => {
                e.stopPropagation();
                handleDotClick(i);
              }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 -ml-2 rounded-full cursor-pointer focus:outline-none z-10 flex items-center justify-center overflow-visible"
              style={{ left: `${(i / (experiences.length - 1)) * 100}%` }}
              animate={{
                scale: isActive ? 1.4 : 1.0,
                opacity: isActive ? 1.0 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              aria-label={`Show details for ${exp.org}`}
            >
              {/* Year marker above the dot */}
              <span className="absolute -top-7 text-xs font-semibold font-body text-ink/60 select-none pointer-events-none whitespace-nowrap">
                {startYear}
              </span>
              <div className="w-full h-full bg-coral rounded-full" />
            </motion.button>
          );
        })}

        {/* Draggable Handle */}
        <motion.div
          drag="x"
          dragElastic={0}
          dragMomentum={false}
          dragConstraints={{ left: 0, right: trackWidth }}
          onDragStart={() => setIsDragging(true)}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 w-8 h-8 -ml-4 bg-paper border-4 border-coral rounded-full shadow-lg cursor-grab active:cursor-grabbing z-20 flex items-center justify-center group-focus:ring-2 group-focus:ring-teal group-focus:outline-none"
        >
          <div className="w-2.5 h-2.5 bg-coral rounded-full" />
        </motion.div>
      </div>

      {/* Experience Details Display (Directional Slide Transitions) */}
      <div className="mt-12 min-h-[220px]">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={panelVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-ink/10 pb-4">
              <div>
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {experiences[activeIndex].role}
                </h3>
                <p className="font-heading text-lg text-teal font-semibold mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span>{experiences[activeIndex].org}</span>
                  <span className="hidden sm:inline text-ink/30 font-light">•</span>
                  <span className="font-body text-xs sm:text-sm text-ink/60 font-normal">
                    {experiences[activeIndex].location}
                  </span>
                </p>
              </div>
              <span className="font-body text-sm font-semibold px-3 py-1 bg-coral/10 text-coral rounded-full whitespace-nowrap">
                {experiences[activeIndex].dateRange}
              </span>
            </div>
            <p className="font-body text-base text-ink/80 leading-relaxed pt-2">
              {experiences[activeIndex].description}
            </p>

            {/* Technologies Used */}
            {experiences[activeIndex].tech && experiences[activeIndex].tech.length > 0 && (
              <div className="pt-4 mt-6 border-t border-ink/10">
                <span className="block text-[11px] font-bold font-body text-ink/50 uppercase tracking-widest mb-3">
                  Technologies Used & Contribution
                </span>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {experiences[activeIndex].tech.map((t) => (
                    <TechPill key={t.name} tech={t} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Interactive Technology Pill with bulging hover animation & tooltip
function TechPill({ tech }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = techIconMap[tech.name] || FaGlobe;

  return (
    <motion.div
      className="relative group inline-block"
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-expanded={isHovered}
      aria-label={`${tech.name}: ${tech.usage}`}
    >
      <div
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border cursor-pointer select-none transition-colors duration-200 flex items-center gap-2 shadow-xs ${
          isHovered
            ? "bg-teal/15 border-teal/50 text-teal-800 shadow-md ring-2 ring-teal/20"
            : "bg-paper border-ink/15 text-ink/80 hover:border-teal/40 hover:text-teal"
        }`}
      >
        <IconComponent
          className={`w-3.5 h-3.5 shrink-0 transition-all duration-200 ${
            isHovered ? "text-coral scale-110" : "text-teal/80"
          }`}
        />
        <span>{tech.name}</span>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 4, scale: 0.92, x: "-50%" }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-full left-1/2 mb-2.5 w-60 sm:w-64 p-3 bg-ink text-paper rounded-xl shadow-2xl z-50 pointer-events-none text-left border border-paper/10 max-w-[80vw]"
          >
            <div className="flex items-center gap-2 mb-1.5 border-b border-paper/15 pb-1">
              <IconComponent className="w-3.5 h-3.5 text-coral shrink-0" />
              <span className="font-heading font-bold text-xs text-coral tracking-wide">
                {tech.name}
              </span>
            </div>
            <p className="font-body text-[11.5px] text-paper/90 leading-relaxed">
              {tech.usage}
            </p>
            {/* Tooltip Downward Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-ink" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
