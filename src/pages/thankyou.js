import { info } from '../../info';
import Link from 'next/link';
import { CONTENT } from '../../content';
import fbEvent from '../services/fbEvents';

const COPY = {
  personal: {
    badge: "You're in good hands",
    title: "We'll be in touch",
    titleAccent: "shortly!",
    sub: "One of our A/C specialists will reach out to confirm the right kit for your vehicle.<br/>Keep an eye on your phone, we'll contact you by call or WhatsApp.",
    whatNext: {
      label: "What happens next",
      steps: [
        {
          icon: "📞",
          title: "We call you",
          desc: "A real person from our team will reach out, not a bot, not a form response.",
        },
        {
          icon: "🔍",
          title: "We match your kit",
          desc: "We'll confirm the right kit for your car's year, make, and size.",
        },
        {
          icon: "📦",
          title: "Ships from the U.S.",
          desc: "Once you're ready, your complete kit ships fast, everything in one box.",
        },
      ],
    },
    cta: {
      label: "Can't wait?",
      phone: "+1 (727) 330-8557",
      href: "tel:+17273308557",
      store: "https://www.coldmasterinc.com/electric-compressor",
    },
    footer: "BBB Accredited · 30+ Years in Classic Car A/C · Ships from the U.S.",
  },
  business: {
    badge: "Request received",
    title: "Someone from our team will reach out",
    titleAccent: "within one business day.",
    sub: "We'll go over pricing, availability, and how we can work together long-term. If you need to talk sooner, you can reach us directly below.",
    whatNext: {
      label: "What happens next",
      steps: [
        {
          icon: "📞",
          title: "We call you",
          desc: "A specialist from our team will contact you to understand your volume and needs.",
        },
        {
          icon: "💲",
          title: "We send you pricing",
          desc: "You'll get clear pricing based on your expected volume — no surprises.",
        },
        {
          icon: "🤝",
          title: "We set up the account",
          desc: "If it's a fit, we get you set up so you can order reliably whenever you need.",
        },
      ],
    },
    cta: {
      label: "Need to talk now?",
      phone: "+1 (727) 330-8557",
      href: "tel:+17273308557",
      store: "https://www.coldmasterinc.com/electric-compressor",
    },
    footer: "BBB Accredited · 30+ Years in Classic Car A/C · Ships from the U.S.",
  },
};

export default function ThankYou({userType}) {
  const c = COPY[userType] ?? COPY.personal;

  return (
    <section className="relative flex flex-col flex-grow justify-center py-20 px-0">
      <div className="container md:w-1/2 flex flex-col min-h-[40dvh] justify-center pt-[8rem] gap-8">
        <h2 className="ft-8">
          {c.title}{' '}
          <span className="text-[#1a6fff]">{c.titleAccent}</span>
        </h2>
        <p className="ft-2" dangerouslySetInnerHTML={{ __html: c.sub }} />

        <div>
          <p className="ft-0 font-bold tracking-[0.2em] uppercase text-[#1a6fff] mb-5">
            {c.whatNext.label}
          </p>
          <div className="flex flex-col gap-3 mb-12">
            {c.whatNext.steps.map((step, i) => (
              <div
                key={step.title}

                className="flex gap-4 items-start bg-white/[0.03] border rounded-xl px-5 py-4 border-[#1a6fff]/30 transition-colors duration-200"
              >
                {/* Number + icon */}
                <div className="flex flex-col items-center gap-1 shrink-0 pt-0.5">
                  <span className="ft-0 font-black text-[#1a6fff]">
                    0{i + 1}
                  </span>
                  <span className="text-xl">{step.icon}</span>
                </div>
                <div>
                  <strong className="block ft-0 font-extrabold uppercase text-brand-2 mb-1">
                    {step.title}
                  </strong>
                  <span className="text-brand-4/80 ft-0 leading-relaxed">{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#8a9ab0] mb-4">
            {c.cta.label}
          </p>
          <div className="flex flex-col gap-6">
            <hr/>
            <a
              href={c.cta.store}
              target="_blank"
              onClick={() => fbEvent('PhoneCall Click')}
              className="ft-0 flex-1 flex items-center justify-center gap-4 bg-[#1a6fff] hover:bg-[#0044cc] text-white font-bold tracking-[0.06em] uppercase px-6 py-6 rounded"
            >
              Visit our store
            </a>
            <hr/>
            <a
              href={c.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="-ft-1 flex-1 flex items-center justify-center gap-4 hover:bg-[#1a6fff]/10 text-brand-1 font-bold tracking-[0.06em] uppercase px-6 py-4 rounded"
            >
              📞{' '}{c.cta.phone}
            </a>
            <a
              href="mailto:sales@coldmasterinc.com"
              target="_blank"
              rel="noopener noreferrer"
              className="-ft-1 flex-1 flex items-center justify-center gap-4 hover:bg-[#1a6fff]/10 text-brand-1 font-bold tracking-[0.06em] px-6 py-4 rounded"
            >
              ✉️ sales@coldmasterinc.com
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export function asd({ userType }) {
  const c = COPY[userType] ?? COPY.personal;

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0d0d0d] overflow-hidden">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(26,111,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(26,111,255,0.8) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow top-right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#1a6fff]/10 blur-[100px] pointer-events-none" />
      {/* Glow bottom-left */}
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-[#1a6fff]/8 blur-[80px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 px-6 md:px-12 py-6">
        <div className="relative w-40 h-7">
          <Image
            src="/logo-light.png"
            layout="fill"
            objectFit="contain"
            objectPosition="left"
          />
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex flex-col flex-grow items-center justify-center px-6 md:px-12 py-16">
        <div className="w-full max-w-2xl">


          {/* CTA */}


        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-6 border-t border-white/[0.06] text-center">
        <p className="font-['Barlow_Condensed'] text-xs font-semibold tracking-[0.1em] uppercase text-[#8a9ab0]/60">
          {c.footer}
        </p>
      </footer>

    </div>
  );
}

/* ─────────────────────────────────────────
   SERVER SIDE PROPS
───────────────────────────────────────── */
export async function getServerSideProps(ctx) {
  const { req } = ctx;
  const cookiesHeader = req.headers.cookie || '';

  const getRawCookie = (name) =>
    cookiesHeader
      .split('; ')
      .find((c) => c.startsWith(`${name}=`))
      ?.split('=')[1];

  const parseCookie = (raw) => {
    if (!raw) return null;
    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      return JSON.parse(decodeURIComponent(clean));
    } catch {
      return decodeURIComponent(raw);
    }
  };

  const lead = parseCookie(getRawCookie('lead'));

  // user_type viene guardado en la cookie lead después del submit
  const userType = lead?.user_type ?? 'personal';

  return {
    props: { userType },
  };
}