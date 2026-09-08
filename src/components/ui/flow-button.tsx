'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface FlowButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  variant?: 'dark' | 'light';
}

export function FlowButton({
  text = "Explore Properties",
  onClick,
  className = "",
  variant = "dark",
}: FlowButtonProps) {
  const isDark = variant === "dark";

  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-transparent hover:rounded-[12px] active:scale-[0.95] px-8 py-3 text-sm font-semibold tracking-wide select-none ${
        isDark
          ? "border-white/60 bg-black/40 backdrop-blur-md text-white hover:text-black shadow-lg shadow-black/40"
          : "border-[#333333]/40 bg-transparent text-[#111111] hover:text-white"
      } ${className}`}
    >
      {/* Left arrow (arr-2) */}
      <ArrowRight
        className={`absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "stroke-white group-hover:stroke-black"
            : "stroke-[#111111] group-hover:stroke-white"
        }`}
      />

      {/* Text */}
      <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out whitespace-nowrap">
        {text}
      </span>

      {/* Circle expansion */}
      <span
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[260px] group-hover:h-[260px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)] ${
          isDark ? "bg-white" : "bg-[#111111]"
        }`}
      />

      {/* Right arrow (arr-1) */}
      <ArrowRight
        className={`absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isDark
            ? "stroke-white group-hover:stroke-black"
            : "stroke-[#111111] group-hover:stroke-white"
        }`}
      />
    </button>
  );
}

export const ExploreProperties = FlowButton;
export default FlowButton;
