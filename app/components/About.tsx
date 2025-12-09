"use client";

import { animate, stagger } from "animejs";
import { useEffect, useRef, useState } from "react";
import "./styles.css"; // Asegúrate de tener tu archivo CSS, probablemente con utilidades de Tailwind

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Estado para controlar si la sección ya se animó
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    
    // Si la sección no está montada o ya se animó, salimos.
    if (!sectionElement || hasAnimated) return;

    // Configuración del Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            
            // --- INICIO DE LAS ANIMACIONES ---

            // 1. Animación del Título (desde la izquierda)
            if (titleRef.current) {
              animate(titleRef.current, {
                opacity: [0, 1],
                translateX: [-100, 0], // Mover desde -100px a 0px (izquierda)
                duration: 800,
                easing: "outQuad",
              });
            }

            // 2. Animación del Contenido y Botón (Agrupados desde la izquierda)
            const elementsToAnimate = [];
            if (contentRef.current) elementsToAnimate.push(contentRef.current);
            if (buttonRef.current) elementsToAnimate.push(buttonRef.current);

            if (elementsToAnimate.length > 0) {
              animate(elementsToAnimate, {
                opacity: [0, 1],
                translateX: [-50, 0], // Mover desde -50px a 0px (izquierda)
                delay: stagger(100, { start: 300 }), // Retraso después del título
                duration: 800,
                easing: "outQuad",
              });
            }

            // 3. Animación de la Imagen (desde la derecha)
            if (imageRef.current) {
              animate(imageRef.current, {
                opacity: [0, 1],
                translateX: [100, 0], // Mover desde 100px a 0px (derecha)
                duration: 800,
                delay: 200, // Retraso ligero para sincronizar
                easing: "outQuad",
              });
            }

            // --- FIN DE LAS ANIMACIONES ---

            setHasAnimated(true); // Marca como animado para que no se repita
            observer.unobserve(entry.target); // Detiene la observación
          }
        });
      },
      {
        threshold: 0.2, // El 20% de la sección debe ser visible para disparar
      }
    );

    observer.observe(sectionElement);

    return () => {
      if (sectionElement) {
        observer.unobserve(sectionElement);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef} // Asignamos la referencia para el Intersection Observer
      id="about"
      className="py-15 relative overflow-hidden bg-neutral-950"
    >
      <div className="container mx-25 px-14 z-10 grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">
        {/* Columna de Texto */}
        <div className="text-center lg:text-center">
          <h2
            ref={titleRef}
            // Opacidad inicial 0 y will-change-transform para la animación.
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text gradient-animate bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 will-change-transform" 
          >
            Sobre Mí
          </h2>

          <p
            ref={contentRef}
            // Opacidad inicial 0 y will-change-transform para la animación.
            className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed opacity-0 will-change-transform"
          >
            Apasionado por transformar ideas en experiencias web memorables. Creo interfaces limpias y soluciones escalables que combinan rendimiento y diseño. Siempre explorando nuevas tecnologías, llevo cada proyecto un paso más allá para que destaque y funcione impecablemente.
          </p>
        </div>

        {/* Columna de Imagen/Visual */}
        <div
          ref={imageRef}
          className="order-1 lg:order-2 w-100 flex justify-center opacity-0 will-change-transform"
        >
          <div className="gradient-animate bg-gradient-to-r from-cyan-500 to-blue-600 w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center border-4 border-blue-500/50 shadow-2xl shadow-blue-500/30">
            {/* Asegúrate de que esta ruta de imagen sea correcta, o usa un componente <Image> de Next.js */}
            <img src="/img1.jpg" alt="Tu Nombre" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}