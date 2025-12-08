"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Full Stack",
    image: "https://picsum.photos/id/20/800/600",
  },
  {
    title: "Portfolio v1",
    category: "Frontend",
    image: "https://picsum.photos/id/25/800/600",
  },
  {
    title: "Task Manager",
    category: "Productivity",
    image: "https://picsum.photos/id/30/800/600",
  },
  {
    title: "Weather App",
    category: "API Integration",
    image: "https://picsum.photos/id/40/800/600",
  },
  {
    title: "Social Dashboard",
    category: "Analytics",
    image: "https://picsum.photos/id/50/800/600",
  },
  {
    title: "3D Landing Page",
    category: "Creative",
    image: "https://picsum.photos/id/60/800/600",
  },
];

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(itemsRef.current.filter(Boolean), {
              opacity: [0, 1],
              scale: [0.9, 1],
              delay: stagger(100),
              duration: 800,
              easing: "outElastic(1, .8)",
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
    <section id="projects" className="py-24 bg-neutral-900">
      <div ref={sectionRef} className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          Featured{" "}
          <span className="bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent">
            Work
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-xl bg-neutral-800 aspect-[4/3] opacity-0"
            >
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.title}
                </h3>
                <span className="text-pink-400 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
