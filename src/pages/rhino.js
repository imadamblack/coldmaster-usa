'use client';

import { useState, useEffect, useRef } from 'react';
import { RHINO as CONTENT } from '../../content';
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

function FadeIn({children, className = '', delay = 0}) {
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
   SHARED
───────────────────────────────────────── */
function SectionLabel({children}) {
  return (
    <p className="-ft-2 font-bold tracking-[0.2em] uppercase text-[#1a6fff] mb-3">
      {children}
    </p>
  );
}

/* ─────────────────────────────────────────
   HERO
   hero.badge · hero.title · hero.titleItalic · hero.titleEnd
   hero.sub · hero.ctaPrimary.label · hero.ctaSecondary.label/href
───────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] flex flex-col md:justify-center overflow-hidden bg-[url('/hero-rhino.jpg')] bg-cover bg-right-bottom">
      <div
        className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br from-[#0d0d0d] via-[#0d1a2e]/90 to-transparent"/>
      <div
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#1a6fff]/20 blur-[120px] pointer-events-none"/>

      <div className="container relative z-10 pt-48 pb-20">
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
              <em className="not-italic text-[#1a6fff]">{CONTENT.hero.titleItalic}</em>{' '}
              {CONTENT.hero.titleEnd}
            </h1>

            <p className="ft-2 text-neutral-300 leading-relaxed max-w-2xl mb-10">
              {CONTENT.hero.sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href={CONTENT.hero.ctaPrimary.href}>
                <a className="button">{CONTENT.hero.ctaPrimary.label}</a>
              </Link>
              <a
                href={CONTENT.hero.ctaSecondary.href}
                onClick={() => fbEvent('PhoneCall Click')}
                className="button !bg-transparent border"
              >
                {CONTENT.hero.ctaSecondary.label}
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   VALUE — "Why Coldmaster"
   value.kicker · value.title
   value.cards[].icon/title/desc
   value.chips[].icon/label/desc
───────────────────────────────────────── */
function Value() {
  return (
    <section id="value" className="bg-[#1e2a38]">
      <div className="container py-24">
        <FadeIn>
          <SectionLabel>{CONTENT.value.kicker}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-14">
            {CONTENT.value.title}
          </h2>
        </FadeIn>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {CONTENT.value.cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div
                className="flex flex-col h-full bg-[#0d1a2e] border border-white/[0.06] rounded-xl px-7 py-8 text-white">
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="font-extrabold uppercase mb-2">{card.title}</h3>
                <p className="ft-0 text-[#8a9ab0] leading-relaxed">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Spec chips */}
        <FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {CONTENT.value.chips.map((chip) => (
              <div
                key={chip.label}
                className="flex gap-3 items-start bg-[#0d1a2e] border border-white/[0.06] rounded-xl px-5 py-4"
              >
                <span className="text-2xl shrink-0 leading-none mt-0.5">{chip.icon}</span>
                <div>
                  <strong className="block ft-0 font-extrabold uppercase tracking-wide text-white mb-0.5">
                    {chip.label}
                  </strong>
                  <span className="-ft-2 text-[#8a9ab0]">{chip.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMPARE
   compare.kicker · compare.title
   compare.win.label · compare.win.items[]
   compare.lose.label · compare.lose.items[]
───────────────────────────────────────── */
function Compare() {
  return (
    <section>
      <div className="container py-24">
        <FadeIn>
          <SectionLabel>{CONTENT.compare.kicker}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-10">
            {CONTENT.compare.title}
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-4 items-stretch">
          {/* Win */}
          <FadeIn>
            <div className="bg-[#1a6fff]/[0.07] border border-[#1a6fff]/40 rounded-xl p-8 h-full">
              <p className="ft-0 font-bold uppercase tracking-widest text-[#1a6fff] mb-5">
                {CONTENT.compare.win.label}
              </p>
              <ul className="flex flex-col gap-4">
                {CONTENT.compare.win.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 ft-0 text-[#b0c4d8]">
                    <span className="text-[#1a6fff] shrink-0 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          {/* Lose */}
          <FadeIn delay={80}>
            <div className="bg-[#1e2a38] border border-white/[0.06] rounded-xl p-8 h-full">
              <p className="ft-0 font-bold uppercase tracking-widest text-[#8a9ab0] mb-5">
                {CONTENT.compare.lose.label}
              </p>
              <ul className="flex flex-col gap-4">
                {CONTENT.compare.lose.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 ft-0 text-[#8a9ab0]">
                    <span className="text-[#e8291c] shrink-0 font-bold">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Link href={CONTENT.hero.ctaPrimary.href}>
              <a className="button">{CONTENT.hero.ctaPrimary.label}</a>
            </Link>
            <a
              href={CONTENT.hero.ctaSecondary.href}
              onClick={() => fbEvent('PhoneCall Click')}
              className="button !bg-transparent border"
            >
              {CONTENT.hero.ctaSecondary.label}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   WHO IT'S BUILT FOR
   who.kicker · who.title · who.cards[].icon/title/desc
───────────────────────────────────────── */
function Who() {
  return (
    <section className="bg-[#1e2a38]">
      <div className="container py-24">
        <FadeIn>
          <SectionLabel>{CONTENT.who.kicker}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-10">
            {CONTENT.who.title}
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {CONTENT.who.cards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 80}>
              <div
                className="flex flex-col h-full bg-[#0d1a2e] border border-white/[0.06] hover:border-[#1a6fff] hover:-translate-y-1 rounded-xl px-6 py-8 transition-all duration-200 text-white">
                <span className="text-3xl mb-4 block">{card.icon}</span>
                <h3 className="font-extrabold uppercase mb-2">{card.title}</h3>
                <p className="ft-0 text-[#8a9ab0] leading-snug">{card.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={CONTENT.hero.ctaPrimary.href}>
              <a className="button">{CONTENT.hero.ctaPrimary.label}</a>
            </Link>
            <a
              href={CONTENT.hero.ctaSecondary.href}
              onClick={() => fbEvent('PhoneCall Click')}
              className="button !bg-transparent border"
            >
              {CONTENT.hero.ctaSecondary.label}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   COMMITMENT
   commitment.kicker · commitment.title · commitment.body
   commitment.contacts[].icon/label/href
───────────────────────────────────────── */
function Commitment() {
  const c = CONTENT.commitment;
  return (
    <section>
      <div className="container py-24 grid lg:grid-cols-2 gap-20 items-center">
        <FadeIn>
          <SectionLabel>{c.kicker}</SectionLabel>
          <h2 className="font-black uppercase leading-[1.05] tracking-tight text-white mb-4">
            {c.title}
          </h2>
          <p className="ft-2 text-[#8a9ab0] leading-relaxed">{c.body}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <ul className="flex flex-col gap-5">
            {c.contacts.map((ct) => (
              <li key={ct.label} className="flex items-center gap-4 ft-0 text-[#b0c4d8]">
                <span className="text-2xl shrink-0">{ct.icon}</span>
                {ct.href ? (
                  <a href={ct.href} className="hover:text-[#1a6fff] transition-colors">
                    {ct.label}
                  </a>
                ) : (
                  ct.label
                )}
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
   final.title · final.lines[]
   final.ctaPrimary.label/href · final.ctaSecondary.label/href
───────────────────────────────────────── */
function CTAFinal() {
  const f = CONTENT.final;
  return (
    <section className="relative bg-[#1a6fff] text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0044cc]/50 to-transparent pointer-events-none"/>
      <div className="container relative z-10 py-32">
        <FadeIn>
          <h2 className="font-black uppercase text-white leading-[1.05] mb-6">{f.title}</h2>
          <p className="ft-2 text-white/70 mb-10 leading-loose">
            {f.lines.map((line, i) => (
              <span key={i}>
                <span dangerouslySetInnerHTML={{__html: line}}/>
                {i < f.lines.length - 1 && <br/>}
              </span>
            ))}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={f.ctaPrimary.href}>
              <a className="button button--white">{f.ctaPrimary.label}</a>
            </Link>
            <a
              href={f.ctaSecondary.href}
              onClick={() => fbEvent('PhoneCall Click')}
              className="button !bg-transparent border"
            >
              {f.ctaSecondary.label}
            </a>
          </div>
        </FadeIn>
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
      <Compare/>
      <Who/>
      <Commitment/>
      <CTAFinal/>
    </main>
  );
}