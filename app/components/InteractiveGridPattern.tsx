"use client";

import { useEffect, useRef, useState } from "react";

type Cell = { x: number; y: number; id: number; created: number };

export default function InteractiveGridPattern() {
  const [hoveredCells, setHoveredCells] = useState<Cell[]>([]);
  const [time, setTime] = useState<number>(Date.now());
  const cellSize = 40;
  const idCounter = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // configuración
  const lifespan = 800;
  const maxTrail = 10;

  useEffect(() => {
    // RAF loop — actualiza `time` constantemente para forzar re-render y recalcular opacidades
    function loop() {
      setTime(Date.now());
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    function handleMouseMove(event: MouseEvent) {
      const x = event.clientX;
      const y = event.clientY;
      const snapX = Math.floor(x / cellSize) * cellSize;
      const snapY = Math.floor(y / cellSize) * cellSize;

      // evita añadir si la última posición es la misma
      if (
        lastPosRef.current &&
        lastPosRef.current.x === snapX &&
        lastPosRef.current.y === snapY
      ) {
        return;
      }

      lastPosRef.current = { x: snapX, y: snapY };

      const now = Date.now();
      setHoveredCells((prev) => {
        const next = [
          ...prev,
          { x: snapX, y: snapY, id: idCounter.current++, created: now },
        ];
        // Limitar tamaño para evitar crecimiento indefinido
        return next.slice(-maxTrail);
      });
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Limpieza: también filtra celdas caducadas en el render (no hace falta interval)
  const visibleCells = hoveredCells.filter((c) => time - c.created < lifespan);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Grid estático */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 40%, transparent 100%)",
        }}
      />

      {/* Celdas interactivas — calculamos opacity/scale según edad */}
      {visibleCells.map((cell) => {
        const age = time - cell.created;
        const t = Math.max(0, Math.min(1, 1 - age / lifespan)); // 1 -> nueva, 0 -> muerta
        // puedes jugar con easing aquí (ej. t*t for ease-out)
        const eased = 1 - Math.pow(1 - t, 2); // easeOutQuad-like
        const opacity = eased; // opacidad proporcional a eased
        const scale = 0.9 + 0.12 * eased; // pequeño pop al nacer

        return (
          <div
            key={cell.id}
            // aplica estilos en linea para máxima precisión por frame
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              transform: `translate(${cell.x}px, ${cell.y}px) scale(${scale})`,
              opacity,
              position: "absolute",
              pointerEvents: "none",
              // preferible usar will-change para rendimiento
              willChange: "transform, opacity",
              transition: "none", // no usar transition, controlamos por RAF
            }}
            className="grid-hover-neon"
          />
        );
      })}

      {/* Añade estilos CSS para el glow (puedes moverlo a tu CSS/Tailwind) */}
      <style jsx>{`
        .grid-hover-neon {
          border-radius: 6px;
          box-shadow:
            0 0 8px rgba(0, 200, 255, 0.08),
            0 0 18px rgba(0, 200, 255, 0.06),
            inset 0 0 6px rgba(255, 255, 255, 0.04);
          background: linear-gradient(135deg, rgba(0, 255, 230, 0.06), rgba(0, 150, 255, 0.04));
          backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </div>
  );
}
