"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renderiza el diseño de escritorio de Figma (1440px de ancho) tal cual,
 * y lo escala hacia abajo cuando la pantalla es más angosta.
 */
export default function ScaledStage({
  width = 1440,
  height,
  children,
}: {
  width?: number;
  height: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const available = el.clientWidth;
      const s = Math.min(1, available / width);
      setScale(s);
      setOffset(Math.max(0, (available - width) / 2));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden"
      style={{ height: height * scale }}
    >
      <div
        className="relative"
        style={{
          width,
          height,
          transform: `translateX(${offset}px) scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
