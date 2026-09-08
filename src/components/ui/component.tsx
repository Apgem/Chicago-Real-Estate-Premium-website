'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { SlideTabs } from './slide-tabs';
import { FlowButton } from './flow-button';
import { ZoomParallaxSection } from './zoom-parallax-section';

export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "1", yPercent: 20 },
        { layer: "3", yPercent: 40 },
        { layer: "4", yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: "none"
          },
          idx === 0 ? undefined : "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) {
        gsap.killTweensOf(triggerElement);
      }
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <header className="absolute top-5 md:top-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-auto">
          <SlideTabs />
        </header>
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow"></div>
          <div data-parallax-layers className="parallax__layers">
            <div data-parallax-layer="1" className="parallax__layer-media">
              <img
                src="/luxury-mansion.jpg"
                loading="eager"
                alt="Luxury Modern Real Estate Mansion"
                className="parallax__layer-bg-img"
                referrerPolicy="no-referrer"
              />
              <div className="parallax__layer-scrim" />
            </div>
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title" aria-label="Chicago Real Estate Source">
                <span className="parallax__title-lead">CHICAGO</span>
                <span className="parallax__title-sub">REAL ESTATE SOURCE</span>
              </h2>
            </div>
            <img
              src="https://cdn.21st.dev/assets/mirror/e1/e1c8137b5f971c3b3ec1a0f9e79b9c17018767005f844a10082b890472afecfb.webp"
              loading="eager"
              width="800"
              data-parallax-layer="4"
              alt="Person looking at estate"
              className="parallax__layer-foreground-img"
            />
            <div data-parallax-layer="4" className="parallax__layer-cta">
              <FlowButton
                text="Explore Properties"
                onClick={() => {
                  const content = document.getElementById('explore-section') || document.querySelector('.zoom-parallax-section');
                  content?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          </div>
          <div className="parallax__fade"></div>
        </div>
      </section>
      <ZoomParallaxSection />
    </div>
  );
}
