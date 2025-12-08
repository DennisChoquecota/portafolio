"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Three.js",
  "Anime.js",
  "Figma",
  "Git",
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(itemsRef.current.filter(Boolean), {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(100),
              duration: 600,
              easing: "outQuad",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="py-24 bg-neutral-950 relative">
      <div ref={sectionRef} className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Technical
          </span>{" "}
          Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="p-6 rounded-2xl bg-neutral-900 border border-white/5 hover:border-pink-500/50 transition-colors duration-300 flex items-center justify-center opacity-0 translate-y-4"
            >
              <span className="text-lg font-medium text-neutral-300">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
