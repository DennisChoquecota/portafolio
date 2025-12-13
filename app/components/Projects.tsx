"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiNodedotjs,
  SiPostgresql,
  SiSupabase,
} from "react-icons/si";

const projects = [
  {
    title: "Portal Tacna",
    category: "Full Stack",
    url: "https://tacna.com.pe/",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
    ],
  },
  {
    title: "Landing page",
    category: "Frontend",
    url: "https://landing-page-react-ts-kohl.vercel.app/",
    technologies: [
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "Vite", icon: SiVite, color: "text-purple-400" },
      { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
    ],
  },
  {
    title: "Mi libreria",
    category: "Full Stack",
    url: "https://startup-page-ytu1.vercel.app/",
    technologies: [
      { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
      { name: "Supabase", icon: SiSupabase, color: "text-emerald-400" },
      { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    ],
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
    <section id="projects" className="py-24 z-20">
      <div className="absolute inset-0 z-20" />
      <div ref={sectionRef} className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          <span className=" bg-gradient-to-r from-violet-500 to-pink-500 bg-clip-text text-transparent gradient-animate">
            Proyectos
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-xl bg-neutral-800 aspect-[4/3] opacity-0 shadow-lg hover:shadow-violet-500/20 transition-all duration-500"
            >
              <img
                src={`https://image.thum.io/get/width/600/crop/800/noanimate/${project.url}`}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:blur-[2px]"
              />
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-2xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
                  {project.title}
                </h3>
                <span className="text-pink-400 font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 mb-4 block">
                  {project.category}
                </span>

                <div className="flex gap-4 justify-center items-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {project.technologies.map((tech, i) => (
                    <div
                      key={i}
                      className="relative group/icon flex flex-col items-center"
                    >
                      <tech.icon
                        className={`text-2xl ${tech.color} hover:scale-125 transition-transform duration-300`}
                      />
                      <span className="absolute -bottom-8 opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 text-xs text-white bg-neutral-700 px-2 py-1 rounded shadow-lg whitespace-nowrap pointer-events-none">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
