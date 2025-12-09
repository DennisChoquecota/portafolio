"use client";

import { animate } from "animejs";
import { useEffect, useRef } from "react";

export default function NeonRunnerHover() {
  const ref = useRef<HTMLDivElement>(null);
  const animationInstance = useRef<any>(null);

  useEffect(() => {
    if (!ref.current) return;

    const box = ref.current;

    const onEnter = () => {
      // Iniciar animación del punto neon
      animationInstance.current = animate(box, {
        '--p': ['0%', '200%'],
        duration: 3500,
        easing: 'linear',
        loop: true
      });
    };

    const onLeave = () => {
      // Detener animación y resetear
      if (animationInstance.current) {
        animationInstance.current.cancel();
      }
      box.style.setProperty('--p', '-20%'); // ocultar punto
    };

    box.addEventListener("mouseenter", onEnter);
    box.addEventListener("mouseleave", onLeave);

    return () => {
      box.removeEventListener("mouseenter", onEnter);
      box.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
      <div ref={ref} className="neon-border p-10 cursor-pointer">
        <p className="text-4xl font-bold">Dennis Choquecota</p>
      </div>
    </div>
  );
}
