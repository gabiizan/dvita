/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ScaledStage from "./ScaledStage";
import { WHATSAPP_URL } from "@/lib/config";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sobre nosotros", href: "#sobre-nosotros" },
  { label: "Productos", href: "#productos" },
  { label: "Recetas", href: "#recetas" },
];

/**
 * Granos decorativos. (cx, cy) es el centro dentro del diseño de 1440px.
 * granos-a ya viene rotado 61° desde Figma, por eso `rotate` es relativo a esa imagen.
 * granos-b ya trae su desenfoque incluido.
 */
type Bean = {
  cx: number;
  cy: number;
  w: number;
  h: number;
  src: string;
  rotate?: number;
  scale?: number;
  blur?: number;
};

const BEANS: Bean[] = [
  { cx: 714.3, cy: 455.6, w: 168.658, h: 149.156, src: "/images/granos-a.png" },
  {
    cx: 727.3, cy: 179.5, w: 168.658, h: 149.156, src: "/images/granos-a.png",
    rotate: 54.56, scale: 1.43, blur: 3.5,
  },
  { cx: 656.1, cy: 672.5, w: 172.283, h: 186.959, src: "/images/granos-b.png" },
  {
    cx: 812.6, cy: 559.5, w: 168.658, h: 149.156, src: "/images/granos-a.png",
    rotate: -31.05, scale: 0.977,
  },
  {
    cx: 817.5, cy: 324.5, w: 168.658, h: 149.156, src: "/images/granos-a.png",
    rotate: -20, scale: 0.55,
  },
];

/** Centro del empaque en el diseño de 1440px: los granos arrancan escondidos ahí detrás. */
const PACK_CENTER = { x: 1080, y: 457 };

function BeanSprite({ bean, index }: { bean: Bean; index: number }) {
  return (
    <img
      aria-hidden
      alt=""
      src={bean.src}
      className="grano-entra pointer-events-none absolute max-w-none"
      style={
        {
          left: bean.cx - bean.w / 2,
          top: bean.cy - bean.h / 2,
          width: bean.w,
          height: bean.h,
          transform: `rotate(${bean.rotate ?? 0}deg) scale(${bean.scale ?? 1})`,
          filter: bean.blur ? `blur(${bean.blur}px)` : undefined,
          "--desde-x": `${PACK_CENTER.x - bean.cx}px`,
          // Solo la mitad del recorrido vertical, para que salgan "en abanico"
          "--desde-y": `${(PACK_CENTER.y - bean.cy) / 2}px`,
          animationDelay: `${1.2 + index * 0.15}s`,
        } as React.CSSProperties
      }
    />
  );
}

function Logo() {
  return (
    <a
      href="#inicio"
      aria-label="D'Vita - Inicio"
      className="block h-[74px] w-[104px] overflow-hidden rounded-2xl"
    >
      <img
        src="/images/logo.png"
        alt="D'Vita"
        className="h-full w-full object-contain"
      />
    </a>
  );
}

function NavPill({ className = "" }: { className?: string }) {
  return (
    <nav
      aria-label="Principal"
      className={`flex items-center gap-4 rounded-[32px] bg-white px-4 py-2 shadow-[0_4px_16px_rgba(0,0,0,0.12)] lg:gap-9 lg:px-7 ${className}`}
    >
      {NAV_LINKS.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className="hidden text-[15px] font-semibold text-tinta transition-colors hover:text-rojo sm:block"
        >
          {l.label}
        </a>
      ))}
      <a
        href="#contacto"
        className="rounded-3xl bg-lima px-[22px] py-3 text-[15px] font-extrabold text-tinta transition-transform hover:scale-105"
      >
        Contáctanos!
      </a>
    </nav>
  );
}

function Headline() {
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="flex flex-col items-start gap-3 font-black">
        <span className="text-[44px] leading-[1.05] text-tinta sm:text-[68px] lg:text-[96px] lg:leading-[100px]">
          SABOR QUE
        </span>
        <span className="rounded-xl bg-rojo px-[22px] py-1 text-[44px] leading-[1.05] text-white sm:text-[68px] lg:text-[96px] lg:leading-[100px]">
          NOS UNE
        </span>
      </h1>
      <p className="max-w-[540px] text-lg font-medium leading-8 text-[#333] lg:w-[540px] lg:text-[22px]">
        Llevamos a tu mesa granos seleccionados con amor, tradición y la calidad
        que el hogar venezolano merece.
      </p>
      <div className="flex flex-wrap items-start gap-4">
        <a
          href="#productos"
          className="rounded-[32px] bg-rojo px-8 py-[18px] text-[17px] font-extrabold text-white transition-transform hover:scale-105"
        >
          Ver productos
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[32px] border-2 border-tinta px-8 py-4 text-[17px] font-bold text-tinta transition-colors hover:bg-tinta hover:text-white"
        >
          Escríbenos por WhatsApp
        </a>
      </div>
    </div>
  );
}

function Packaging({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/images/empaque.png"
      alt="Empaque de Frijol Pico Negro D'Vita, 400 g"
      fill
      sizes="(min-width: 1024px) 490px, 80vw"
      priority={priority}
      className="object-contain"
    />
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="bg-crema">
      {/* Escritorio: diseño de Figma (1440 × 820), escalado en pantallas menores */}
      <div className="hidden lg:block">
        <ScaledStage height={820}>
          <div className="absolute left-[62px] top-[26px]">
            <Logo />
          </div>
          <NavPill className="absolute left-[394px] top-[30px]" />

          <div className="absolute left-[80px] top-[200px]">
            <Headline />
          </div>

          {BEANS.map((b, i) => (
            <BeanSprite key={i} bean={b} index={i} />
          ))}

          {/* Empaque: ~13% más grande que en el diseño original */}
          <div className="absolute left-[835px] top-[120px] h-[675px] w-[490px]">
            <Packaging priority />
          </div>
        </ScaledStage>
      </div>

      {/* Móvil y tablet */}
      <div className="px-5 pb-16 pt-6 sm:px-10 lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <Logo />
          <NavPill />
        </div>
        <div className="mt-12">
          <Headline />
        </div>
        <div className="relative mx-auto mt-12 aspect-[435/599] w-full max-w-[400px]">
          <Packaging />
        </div>
      </div>
    </section>
  );
}
