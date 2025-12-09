import { useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
import { FaReact, FaGithub, FaGitAlt } from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiPostgresql,
} from "react-icons/si";
import "./styles.css";

const skills = [
  { name: "React", icon: <FaReact className="w-8 h-8" /> },
  { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8" /> },
  { name: "TypeScript", icon: <SiTypescript className="w-8 h-8" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="w-8 h-8" /> },
  { name: "Javascript", icon: <SiJavascript className="w-8 h-8" /> },
  { name: "PHP", icon: <SiPhp className="w-8 h-8" /> },
  { name: "Laravel", icon: <SiLaravel className="w-8 h-8" /> },
  { name: "GitHub", icon: <FaGithub className="w-8 h-8" /> },
  { name: "Git", icon: <FaGitAlt className="w-8 h-8" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="w-8 h-8" /> },
];

export function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const neonInstances = useRef<any[]>([]);

  useEffect(() => {
    // animación de entrada
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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // --- Neon Runner Hover ---
  useEffect(() => {
    itemsRef.current.forEach((el, idx) => {
      if (!el) return;

      const onEnter = () => {
        neonInstances.current[idx] = animate(el, {
          "--p": ["200%", "0%"],
          duration: 3500,
          easing: "linear",
          loop: true,
        });
      };

      const onLeave = () => {
        if (neonInstances.current[idx]) {
          neonInstances.current[idx].cancel();
        }
        el.style.setProperty("--p", "-200%");
      };

      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    });
  }, []);

  return (
    <section id="skills" className="py-24 bg-neutral-950 relative">
      <div className="absolute inset-0 z-20 pointer-events-none" />

      <div ref={sectionRef} className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          <span className="gradient-animate bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            Habilidades
          </span>{" "}
          Técnicas
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="skill-card p-6 rounded-2xl bg-neutral-900 border border-white/5 transition-colors duration-300 flex flex-col items-center justify-center gap-4 opacity-0 translate-y-4 group relative"
            >
              <div className="text-pink-500 group-hover:text-violet-500 transition-colors duration-300">
                {skill.icon}
              </div>
              <span className="text-lg font-medium text-neutral-300 group-hover:text-white transition-colors">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
