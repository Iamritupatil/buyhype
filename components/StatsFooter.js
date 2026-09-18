"use client";

import { useEffect, useRef } from "react";

const STATS = [
  { symbol: "↑", target: 24, suffix: "H", label: "Signal Monitoring" },
  { symbol: "#", target: 100, suffix: "K+", label: "Signals Tracked" },
  { symbol: "*", target: 7, suffix: "+", label: "Data Sources" },
  { symbol: "%", target: 100, suffix: "%", label: "Free To Explore" },
];

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function formatValue(value, suffix) {
  return Math.round(value).toString() + suffix;
}

export default function StatsFooter() {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function animateValue(el, target, suffix, index) {
      if (reduceMotion) {
        el.textContent = formatValue(target, suffix);
        return;
      }

      const duration = 1500 + index * 80;
      const startOffset = 480 + index * 90;

      setTimeout(() => {
        let startTime = null;

        function step(timestamp) {
          if (startTime === null) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          el.textContent = formatValue(target * eased, suffix);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = formatValue(target, suffix);
          }
        }

        requestAnimationFrame(step);
      }, startOffset);
    }

    function runAll() {
      STATS.forEach((stat, i) => {
        const el = valueRefs.current[i];
        if (el) animateValue(el, stat.target, stat.suffix, i);
      });
    }

    const section = sectionRef.current;
    if (!section) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      runAll();
      return;
    }

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !fired) {
            fired = true;
            runAll();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="stats" ref={sectionRef}>
      {STATS.map((stat, i) => (
        <div
          className="stat anim"
          style={{ "--d": `${(0.5 + i * 0.08).toFixed(2)}s` }}
          key={stat.label}
        >
          <div className="stat-figure">
            <span className="stat-symbol">{stat.symbol}</span>
            <span
              className="stat-value"
              ref={(el) => (valueRefs.current[i] = el)}
            >
              0{stat.suffix}
            </span>
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </footer>
  );
}
