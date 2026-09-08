'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

export const zoomParallaxImages = [
  {
    src: 'https://cdn.21st.dev/assets/mirror/de/de2a384dfac96d1a31a641ba6667c56747b8138ba0f4e633dbea0e7051311479.jpg',
    alt: 'Modern architecture building',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/bb/bbc200e370140ed6d4bc9dfd7b9de0957419ee0facd61f8698ed0e14281b13f5.jpg',
    alt: 'Urban cityscape at sunset',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/96/9624bda260e246bd41ab7d26ac6d8e3ad427c62cb1bed10fe22f0aca7bd727c6.jpg',
    alt: 'Abstract geometric pattern',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/e0/e09b97c0849e748eb1d19a8d23e341835806a6a384540bfd4f7ce88f97b97b51.jpg',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/28/28ab2843d2f3bb3b8439f0c198d9846be80044955263bff6ac49d89691dad55d.jpg',
    alt: 'Minimalist design elements',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/96/96e261f67a4f180e273ca711f7b86abe72dd0fdc84dd75d9322b2d79baac46f0.jpg',
    alt: 'Ocean waves and beach',
  },
  {
    src: 'https://cdn.21st.dev/assets/mirror/85/8590b403bb542a124c7de796e9ecf5da86509818f2969e4d94af8c440953a852.jpg',
    alt: 'Forest trees and sunlight',
  },
];

export function ZoomParallaxSection() {
  return (
    <section id="explore-section" className="zoom-parallax-section relative w-full bg-black text-white overflow-hidden">
      {/* Top transition & spotlight header */}
      <div className="relative flex flex-col h-[50vh] items-center justify-center px-4">
        {/* Radial spotlight */}
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
            'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.14),transparent_55%)]',
            'blur-[36px]',
          )}
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="text-xs uppercase tracking-[0.28em] text-neutral-400 font-semibold mb-3">
            Curated Architectural Portfolio
          </span>
          <h2 className="text-center text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-2xl">
            Scroll Down for Zoom Parallax
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 max-w-md">
            Interactive multi-perspective zoom into distinctive contemporary residences
          </p>
        </div>
      </div>

      {/* Interactive Zoom Parallax */}
      <ZoomParallax images={zoomParallaxImages} />

      {/* Bottom spacer blending seamlessly */}
      <div className="h-[50vh] flex items-center justify-center border-t border-white/5 bg-gradient-to-b from-black to-neutral-950">
        <div className="text-center text-neutral-500 text-xs sm:text-sm tracking-[0.3em] uppercase font-light">
          Chicago Real Estate Source &copy; {new Date().getFullYear()}
        </div>
      </div>
    </section>
  );
}

export default ZoomParallaxSection;
