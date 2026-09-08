'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export interface ImageItem {
  src: string;
  alt?: string;
}

export interface ZoomParallaxProps {
  images: ImageItem[];
  className?: string;
}

export function ZoomParallax({ images, className = '' }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: images[0]?.src,
      alt: images[0]?.alt || 'Main property',
      scale: scale4,
      positionClass: 'w-[25vw] h-[25vh]',
    },
    {
      src: images[1]?.src,
      alt: images[1]?.alt || 'Cityscape view',
      scale: scale5,
      positionClass: '-top-[28vh] left-[4vw] w-[35vw] h-[30vh]',
    },
    {
      src: images[2]?.src,
      alt: images[2]?.alt || 'Modern architecture',
      scale: scale6,
      positionClass: '-top-[10vh] -left-[24vw] w-[20vw] h-[44vh]',
    },
    {
      src: images[3]?.src,
      alt: images[3]?.alt || 'Luxury landscape',
      scale: scale5,
      positionClass: 'left-[27.5vw] w-[25vw] h-[25vh]',
    },
    {
      src: images[4]?.src,
      alt: images[4]?.alt || 'Design elements',
      scale: scale6,
      positionClass: 'top-[27.5vh] left-[5vw] w-[20vw] h-[25vh]',
    },
    {
      src: images[5]?.src,
      alt: images[5]?.alt || 'Coastal scene',
      scale: scale8,
      positionClass: 'top-[27.5vh] -left-[22.5vw] w-[30vw] h-[25vh]',
    },
    {
      src: images[6]?.src,
      alt: images[6]?.alt || 'Natural surroundings',
      scale: scale9,
      positionClass: 'top-[22.5vh] left-[25vw] w-[15vw] h-[15vh]',
    },
  ];

  return (
    <div ref={container} className={`relative h-[300vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {pictures.map(({ src, alt, scale, positionClass }, index) => {
          if (!src) return null;
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <div
                className={`relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${positionClass}`}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover select-none"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default ZoomParallax;
