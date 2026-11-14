"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const NODES = [
  { x: 350, y: 120 },
  { x: 530, y: 175 },
  { x: 590, y: 310 },
  { x: 500, y: 430 },
  { x: 320, y: 460 },
  { x: 165, y: 375 },
  { x: 120, y: 220 },
  { x: 220, y: 130 },
];

const CENTER = { x: 350, y: 295 };

export function AgentNetwork({ className = "" }: { className?: string }) {
  const pulseRef = useRef<SVGCircleElement>(null);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    let currentLine = 0;
    let animFrame: number;

    const animatePulse = () => {
      const line = lineRefs.current[currentLine];
      if (!line || !pulseRef.current) return;

      const x1 = parseFloat(line.getAttribute("x1") || "0");
      const y1 = parseFloat(line.getAttribute("y1") || "0");
      const x2 = parseFloat(line.getAttribute("x2") || "0");
      const y2 = parseFloat(line.getAttribute("y2") || "0");

      const pulse = pulseRef.current;
      pulse.setAttribute("cx", String(x1));
      pulse.setAttribute("cy", String(y1));
      pulse.style.opacity = "1";

      let progress = 0;
      const duration = 1200;
      let start: number;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        progress = Math.min((timestamp - start) / duration, 1);
        const cx = x1 + (x2 - x1) * progress;
        const cy = y1 + (y2 - y1) * progress;
        pulse.setAttribute("cx", String(cx));
        pulse.setAttribute("cy", String(cy));

        if (progress < 1) {
          animFrame = requestAnimationFrame(step);
        } else {
          pulse.style.opacity = "0";
          currentLine = (currentLine + 1) % NODES.length;
          setTimeout(animatePulse, 1800);
        }
      };

      animFrame = requestAnimationFrame(step);
    };

    const timeout = setTimeout(animatePulse, 800);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animFrame);
    };
  }, [reduce]);

  return (
    <svg
      viewBox="0 0 700 580"
      className={`w-full h-auto pointer-events-none select-none ${className}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Core glow gradient */}
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#7C3AED" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3B1D8F" stopOpacity="0" />
        </radialGradient>
        {/* Ambient glow behind center */}
        <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </radialGradient>
        {/* Node gradient */}
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Ambient background glow */}
      <ellipse
        cx={CENTER.x}
        cy={CENTER.y}
        rx="220"
        ry="180"
        fill="url(#ambientGlow)"
      />

      {/* Connection lines */}
      {NODES.map((node, i) => (
        <line
          key={i}
          ref={(el) => { lineRefs.current[i] = el; }}
          x1={node.x}
          y1={node.y}
          x2={CENTER.x}
          y2={CENTER.y}
          stroke="rgba(167,139,250,0.25)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      ))}

      {/* Core outer ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="52"
        fill="none"
        stroke="rgba(139,92,246,0.3)"
        strokeWidth="1"
      />
      {/* Core mid ring */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="38"
        fill="none"
        stroke="rgba(167,139,250,0.2)"
        strokeWidth="1"
      />
      {/* Core fill */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="26"
        fill="url(#coreGlow)"
      />
      {/* Core inner */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="10"
        fill="rgba(196,181,253,0.9)"
      />

      {/* Agent nodes */}
      {NODES.map((node, i) => (
        <g key={i}>
          {/* Node glow halo */}
          <circle
            cx={node.x}
            cy={node.y}
            r="14"
            fill="rgba(139,92,246,0.08)"
          />
          {/* Node border ring */}
          <circle
            cx={node.x}
            cy={node.y}
            r="9"
            fill="none"
            stroke="rgba(167,139,250,0.4)"
            strokeWidth="1"
          />
          {/* Node fill */}
          <circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill="url(#nodeGrad)"
          />
        </g>
      ))}

      {/* Travelling pulse */}
      <circle
        ref={pulseRef}
        r="4"
        fill="#C4B5FD"
        style={{ opacity: 0, filter: "drop-shadow(0 0 4px #A78BFA)" }}
      />
    </svg>
  );
}
