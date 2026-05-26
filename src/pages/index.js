'use client';

import { useState, useEffect, useRef } from 'react';
import { CONTENT } from '../../content';
import Image from 'next/image';
import Link from 'next/link';
import fbEvent from '../services/fbEvents';

/* ─────────────────────────────────────────
   FADE-IN HOOK
───────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      {threshold: 0.1},
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return {ref, visible};
}

function FadeIn({
  children,
  className = '',
  delay = 0,
}) {
  const {ref, visible} = useFadeIn();
  return (
    <div
      ref={ref}
      style={{transitionDelay: `${delay}ms`}}
      className={`transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────── */
const CheckIcon = ({className = 'w-3.5 h-3.5'}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const SectionLabel = ({children}) => (
  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a6fff] mb-3">
    {children}
  </p>
);

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:justify-center overflow-hidden pt-48 pb-20 px-6 md:px-12 bg-[url('/hero.jpg')] bg-cover bg-right-bottom">
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br from-[#0d0d0d] via-[#0d1a2e]/90 to-transparent"/>
      <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#1a6fff]/18 blur-[120px] pointer-events-none"/>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-7xl">
          <FadeIn>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-4 bg-[#1a6fff]/15 border border-[#1a6fff]/30 rounded-full px-6 py-2 mb-8">
              <span className="w-4 h-4 rounded-full bg-[#1a6fff] animate-pulse"/>
              <span className="-ft-2 font-bold uppercase text-[#d6f0ff]">
              {CONTENT.hero.badge}
            </span>
            </div>

            {/* Headline */}
            <h1 className="ft-9 font-black leading-[1.0] tracking-tight uppercase mb-6 text-white">
              {CONTENT.hero.title}{' '}
              <em className="not-italic text-[#1a6fff]">{CONTENT.hero.titleAccent}</em>{' '}
              {CONTENT.hero.titleEnd}
            </h1>

            <p className="ft-2 text-neutral-300 text-lg leading-relaxed max-w-2xl mb-10">
              {CONTENT.hero.sub}
            </p>

          </FadeIn>
        </div>
      </div>
      <div className="absolute container bottom-6 flex flex-wrap gap-4 mb-16">
        <Link href="/survey">
        <a
          className="ft-0 inline-block bg-[#1a6fff] hover:bg-[#0044cc] hover:-translate-y-0.5 text-white font-extrabold uppercase px-9 py-4 rounded transition-all duration-200"
        >
          {CONTENT.hero.ctaPrimary}
        </a>
        </Link>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   VALUE PROP
───────────────────────────────────────── */
function Value() {
  return (
    <section id="value" className="bg-[#1e2a38]">
      <div className="container py-20 my-20 mx-auto grid lg:grid-cols-2 gap-20 items-center">
        {/* Left */}
        <FadeIn>
          <SectionLabel>{CONTENT.value.eyebrow}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-4">
            {CONTENT.value.title}
          </h2>
          <p className="text-[#8a9ab0] ft-2 leading-7 mb-9">{CONTENT.value.description}</p>

          <div className="flex flex-col gap-6">
            {CONTENT.value.points.map((p) => (
              <div key={p.title} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-[#1a6fff]/15 flex items-center justify-center shrink-0 ft-2">
                  {p.icon}
                </div>
                <div>
                  <strong className="block ft-0 font-extrabold uppercase tracking-[0.04em] text-white mb-1">
                    {p.title}
                  </strong>
                  <span className="text-[#8a9ab0] ft-0 leading-relaxed">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Right — comparison card */}
        <FadeIn delay={100}>
          <div className="bg-[#0d0d0d] rounded-xl p-10 border border-white/[0.06]">
            <ul className="flex flex-col gap-3.5">
              <p className="ft-3 font-bold uppercase text-[#8a9ab0]">
                Coldmaster
              </p>
              {CONTENT.value.pros.map((item) => (
                <li key={item} className="flex items-start gap-3 ft-0 text-[#b0c4d8]">
                  <span className="text-[#1a6fff] shrink-0">✓</span>
                  {item}
                </li>
              ))}
              <li>
                <hr className="border-white/[0.08] my-2"/>
              </li>
              <p className="ft-3 font-bold uppercase text-[#8a9ab0]">
                The Alternatives
              </p>
              {CONTENT.value.cons.map((item) => (
                <li key={item} className="flex items-start gap-3 ft-0 text-[#b0c4d8]">
                  <span className="text-[#e8291c] shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
        <div className="flex flex-wrap gap-4 w-[32rem] mx-auto justify-center mb-8">
          <a
            href="/survey"
            className="ft-0 w-full bg-white hover:bg-[#d6f0ff] text-[#1a6fff] text-center font-extrabold uppercase px-10 py-4 rounded hover:-translate-y-0.5 transition-all duration-200"
          >
            Find The Right Kit →
          </a>
          <a
            href="tel:+17273308557"
            onClick={() => fbEvent('PhoneCall Click')}
            className="ft-0 w-full border-2 border-white/50 hover:border-white hover:bg-white/10 text-white text-center font-bold uppercase px-8 py-4 rounded transition-all duration-200"
          >
            📞 Call Us First
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   KIT SELECTOR
───────────────────────────────────────── */
function KitSelector() {
  return (
    <section id="kits" className="container py-20 my-20">
      <FadeIn>
        <div className="text-center mb-13">
          <SectionLabel>{CONTENT.kits.eyebrow}</SectionLabel>
          <h2
            className="font-black uppercase text-white">
            {CONTENT.kits.title}
          </h2>
        </div>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto mb-7 items-stretch">
        {CONTENT.kits.items.map((kit, i) => (
          <FadeIn key={kit.title} delay={i * 80}>
            <div
              className="group flex flex-col h-full bg-[#1e2a38] border border-white/[0.06] hover:border-[#1a6fff] hover:-translate-y-1 hover:bg-[#243347] rounded-lg px-6 py-8 text-center transition-all duration-200 text-white"
            >
              <span className="text-4xl mb-3.5 block">{kit.emoji}</span>
              <h3 className="ft-2 font-extrabold uppercase mb-2">
                {kit.title}
              </h3>
              <p className="ft-1 text-[#8a9ab0] leading-snug mb-4 flex-grow">{kit.desc}</p>
              <Link href="/survey">
                <a className="-ft-2 font-bold uppercase text-[#1a6fff]">
                  {kit.cta}
                </a>
              </Link>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn>
        <p className="text-center ft-0 font-semibold text-[#8a9ab0]">
          {CONTENT.kits.help}<br/>
          <a href={CONTENT.kits.helpHref} className="text-[#1a6fff] hover:underline">
            {CONTENT.kits.helpLink}
          </a><br/>
          {CONTENT.kits.helpEnd}
        </p>
      </FadeIn>

      <div className="flex flex-wrap gap-4 w-[32rem] mx-auto justify-center mb-8">
        <a
          href="/survey"
          className="ft-0 w-full bg-white hover:bg-[#d6f0ff] text-[#1a6fff] text-center font-extrabold uppercase px-10 py-4 rounded hover:-translate-y-0.5 transition-all duration-200"
        >
          Find The Right Kit →
        </a>
        <a
          href="tel:+17273308557"
          onClick={() => fbEvent('PhoneCall Click')}
          className="ft-0 w-full border-2 border-white/50 hover:border-white hover:bg-white/10 text-white text-center font-bold uppercase px-8 py-4 rounded transition-all duration-200"
        >
          📞 Call Us First
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   KIT CONTENTS
───────────────────────────────────────── */
function KitContents() {
  const c = CONTENT.kitContents;
  return (
    <section className="bg-[#0a1520]">
      <div className="container my-20 py-20 mx-auto grid lg:grid-cols-2 gap-20 items-start">
        {/* Left */}
        <FadeIn>
          <SectionLabel>{c.eyebrow}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-3">
            {c.title}
          </h2>
          <p className="text-[#8a9ab0] ft-2 leading-7 mb-9">{c.intro}</p>

          <ul className="flex flex-col">
            {c.items.map((item, i) => (
              <li
                key={item.title}
                className={`flex gap-6 items-start py-8 ${
                  i < c.items.length - 1 ? 'border-b border-white/[0.06]' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-md bg-[#1a6fff]/12 flex items-center justify-center shrink-0 ft-2">
                  {item.icon}
                </div>
                <div>
                  <strong className="block ft-0 font-extrabold uppercase tracking-[0.04em] text-white mb-0.5">
                    {item.title}
                  </strong>
                  <span className="text-[#8a9ab0] ft-0">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Note */}
          <div className="mt-8 border-l-[4px] border-[#1a6fff]/50 bg-[#1a6fff]/[0.06] rounded-r-md p-8 pr-6">
            <h4 className="ft-0 font-bold tracking-[0.12em] uppercase text-[#1a6fff] mb-1.5">
              {c.noteTitle}
            </h4>
            <p className="text-[#8a9ab0] ft-0 leading-relaxed">{c.noteDesc}</p>
          </div>
        </FadeIn>

        {/* Right */}
        <FadeIn delay={100}>
          <div className="bg-[#1e2a38] rounded-xl p-8 border border-white/[0.06] mb-4">
            <SectionLabel>Our Commitment</SectionLabel>
            <h3 className="ft-1 font-black uppercase text-white mb-3">
              {c.supportTitle}
            </h3>
            <p className="text-[#8a9ab0] ft-1 leading-7 mb-6">{c.supportDesc}</p>
            <ul className="flex flex-col gap-4">
              {c.contacts.map((ct) => (
                <li key={ct.label} className="flex items-center gap-4 ft-0 text-[#b0c4d8]">
                  <span>{ct.icon}</span>
                  {ct.label}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
      <div className="flex flex-wrap gap-4 w-[32rem] mx-auto justify-center mb-8">
        <a
          href="/survey"
          className="ft-0 w-full bg-white hover:bg-[#d6f0ff] text-[#1a6fff] text-center font-extrabold uppercase px-10 py-4 rounded hover:-translate-y-0.5 transition-all duration-200"
        >
          Find The Right Kit →
        </a>
        <a
          href="tel:+17273308557"
          onClick={() => fbEvent('PhoneCall Click')}
          className="ft-0 w-full border-2 border-white/50 hover:border-white hover:bg-white/10 text-white text-center font-bold uppercase px-8 py-4 rounded transition-all duration-200"
        >
          📞 Call Us First
        </a>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CTA FINAL
───────────────────────────────────────── */
function CTAFinal() {
  const c = CONTENT.ctaFinal;
  return (
    <section className="relative py-40 px-6 md:px-12 bg-[#1a6fff] text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0044cc]/50 to-transparent"/>

      <div className="relative z-10">
        <h2 className="font-black uppercase text-white leading-[1.05] mb-3">
          {c.title}
        </h2>
        <p className="text-white/70 ft-2 mb-9" dangerouslySetInnerHTML={{__html: c.sub}}/>

        <div className="flex flex-wrap gap-4 w-[32rem] mx-auto justify-center mb-8">
          <a
            href="/survey"
            className="ft-0 w-full bg-white hover:bg-[#d6f0ff] text-[#1a6fff]  font-extrabold uppercase px-10 py-4 rounded hover:-translate-y-0.5 transition-all duration-200"
          >
            {c.ctaPrimary}
          </a>
          <a
            href="tel:+17273308557"
            onClick={() => fbEvent('PhoneCall Click')}
            className="ft-0 w-full border-2 border-white/50 hover:border-white hover:bg-white/10 text-white  font-bold uppercase px-8 py-4 rounded transition-all duration-200"
          >
            {c.ctaSecondary}
          </a>
        </div>

        <p className="ft-0 font-semibold tracking-[0.08em] uppercase text-white/50">
          {c.sizes}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ColdmasterPage() {
  return (
    <main className="antialiased bg-[#0d0d0d] text-white overflow-x-hidden">
      <Hero/>
      <Value/>
      <KitSelector/>
      <KitContents/>
      <CTAFinal/>
    </main>
  );
}