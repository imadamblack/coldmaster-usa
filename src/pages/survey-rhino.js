'use client';
import { useForm, FormProvider } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';
import StepRenderer from '../components/form/stepRenderer';
import fbEvent from '../services/fbEvents';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { info } from '../../info';
import { RHINO as CONTENT } from '../../content';

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
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, className = '', delay = 0 }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────── */
const CheckIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SectionLabel = ({ children }) => (
  <p className="text-xs font-bold tracking-[0.2em] uppercase text-[#1a6fff] mb-3">{children}</p>
);

/* ─────────────────────────────────────────
   INTRO
───────────────────────────────────────── */
const Intro = ({ onButtonClick }) => (
  <motion.div
    key="intro"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="relative h-[100dvh] flex flex-col md:justify-center overflow-hidden pt-20 pb-20 px-6 md:px-12 bg-[url('/hero-rhino.jpg')] bg-cover bg-right-bottom"
  >
    <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-br from-[#0d0d0d] via-[#0d1a2e]/90 to-transparent" />
    <div className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full bg-[#1a6fff]/18 blur-[120px] pointer-events-none" />
    <div className="container relative z-10">
      <div className="max-w-7xl">
        <FadeIn>
          <div className="relative flex w-[16rem] h-[3rem] mb-16">
            <Image src="/logo-light.png" layout="fill" objectFit="cover" />
          </div>
          <div className="inline-flex items-center gap-4 bg-[#1a6fff]/15 border border-[#1a6fff]/30 rounded-full px-6 py-2 mb-8">
            <span className="w-4 h-4 rounded-full bg-[#1a6fff] animate-pulse" />
            <span className="-ft-2 font-bold uppercase text-[#d6f0ff]">{CONTENT.hero.badge}</span>
          </div>
          <h1 className="ft-9 font-black leading-[1.0] tracking-tight uppercase mb-6 text-white">
            {CONTENT.hero.title}{' '}
            <span className="not-italic text-[#1a6fff]">{CONTENT.hero.titleAccent}</span>{' '}
            {CONTENT.hero.titleEnd}
          </h1>
          <p className="ft-2 text-neutral-300 text-lg leading-relaxed max-w-2xl mb-10">{CONTENT.hero.sub}</p>
        </FadeIn>
      </div>
    </div>
    <div className="absolute container -bottom-8 mb-16">
      <button
        onClick={() => onButtonClick(false)}
        className="ft-0 animate-bounce inline-block cursor-pointer bg-[#1a6fff] hover:bg-[#0044cc] text-white font-extrabold uppercase px-9 py-4 rounded"
        >
        Start Here →
      </button>
      <p className="text-white ft-3 mb-12">Find the right kit for your classic</p>
  </div>
</motion.div>
);

/* ─────────────────────────────────────────
   FORM STEPS
───────────────────────────────────────── */

const setFormSteps = ({ fullName, phone }) => ([
  {
    type: 'radio',
    name: 'vehicle',
    title: 'What are you cooling?',
    description: 'Pick the cab closest to your unit.',
    inputOptions: { required: 'Please select one' },
    options: [
      {
        value: 'Long-haul sleeper',
        label: 'Long-haul sleeper',
        sub: 'Sleeping in the cab, overnight hauls',
        icon: '🛏️',
      },
      {
        value: 'Day cab / regional truck',
        label: 'Day cab / regional truck',
        sub: 'Long shifts, stop-and-go, loading waits',
        icon: '🚚',
      },
      {
        value: 'Mini bus / passenger van',
        label: 'Mini bus / passenger van',
        sub: 'Under 5 m, up to ~8 passengers',
        icon: '🚐',
      },
      {
        value: 'Heavy machinery / special',
        label: 'Heavy machinery / special build',
        sub: 'Equipment cab or custom application',
        icon: '🏗️',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'voltage',
    title: "What's the electrical system?",
    description: "Check the battery or alternator if you're not sure.",
    inputOptions: { required: 'Please select one' },
    options: [
      {
        value: '12V',
        label: '12 Volts',
        icon: '🔌',
      },
      {
        value: '24V',
        label: '24 Volts',
        icon: '🔌',
      },
      {
        value: 'Not sure',
        label: 'Not sure',
        sub: "No problem, we'll confirm it with you",
        icon: '❓',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'need',
    title: 'When do you need it cold?',
    description: 'This tells us how independent the unit needs to be.',
    inputOptions: { required: 'Please select one' },
    options: [
      {
        value: 'Cooling while sleeping (engine off)',
        label: 'While sleeping, engine off',
        sub: 'The reason most drivers buy self-contained',
        icon: '🌙',
      },
      {
        value: 'Cooling during shifts',
        label: 'During shifts & waits',
        icon: '☀️',
      },
      {
        value: 'Both, all the time',
        label: 'Both, all the time',
        icon: '❄️',
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'install',
    title: 'Install preference?',
    description: 'Not sure? Let us recommend it.',
    inputOptions: { required: 'Please select one' },
    options: [
      {
        value: 'Rooftop (all-in-one)',
        label: 'Rooftop, all-in-one',
        sub: 'One unit on the roof, runs engine-off',
        icon: '📦',
      },
      {
        value: 'Split / backpack',
        label: 'Split / backpack',
        sub: 'Indoor + outdoor, higher airflow',
        icon: '🧩',
      },
      {
        value: 'Recommend for me',
        label: 'Recommend the best one for me',
        icon: '🤝',
      },
    ],
    cols: 1,
  },
  {
    type: 'text',
    name: 'truck',
    title: 'Truck make & model',
    placeholder: 'e.g. Freightliner Cascadia 2019',
    inputOptions: {
      required: true,
    },
  },
  {
    type: 'opt-in',
    title: 'Where do we send your match?',
    description: "We'll text your recommendation and a quote on WhatsApp.",
    fields: [
      {
        type: 'text',
        name: 'fullName',
        title: 'Your name',
        placeholder: 'First and last name',
        autoComplete: false,
        inputOptions: {
          required: 'What is your name?',
        },
      },
      {
        type: 'email',
        name: 'email',
        title: 'Your Email',
        placeholder: 'Your email',
        autoComplete: false,
        inputOptions: {
          required: 'What is your phone number?',
        },
      },
      {
        type: 'tel',
        name: 'phone',
        title: 'Phone Number',
        placeholder: '+1 ___ ___ ____',
        autoComplete: false,
        inputOptions: {
          required: 'What is your phone number?',
        },
      },
    ],
    cta: 'See My Match →',
  },
]);

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Survey({ lead, utm }) {
  const [showIntro, setShowIntro] = useState(true);
  const [showOutro, setShowOutro] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [inputError, setInputError] = useState(null);
  const [sending, setSending] = useState(false);

  const methods = useForm({ mode: 'all' });
  const { register, handleSubmit, formState: { errors }, watch } = methods;
  const router = useRouter();

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(true), 6000);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [showIntro]);

  let formSteps = setFormSteps({ fullName: lead.fullName, phone: lead.phone });

  useEffect(() => {
    const current = formSteps[formStep];
    if (current?.autoAdvance) {
      const timer = setTimeout(
        () => setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1)),
        5000,
      );
      return () => clearTimeout(timer);
    }
  }, [formStep]);

  useEffect(() => {
    const step = formSteps[formStep];
    if (step?.type === 'checkpoint') {
      fbEvent(step?.name);
    }
  }, [formStep]);

  const lastInputIndex = formSteps.reduce((lastIndex, step, i) => {
    return step.type !== 'checkpoint' ? i : lastIndex;
  }, 0);

  const getStepFieldNames = (step) => {
    if (!step) return [];

    if (step.type === 'opt-in') {
      return step.fields.map((field) => field.name);
    }

    if (step.name) {
      return [step.name];
    }

    return [];
  };

  const requiredContactFields = ['fullName', 'email', 'phone'];

  const handlePrimaryButtonClick = async () => {
    if (sending) return;

    const currentStep = formSteps[formStep];
    const fieldNames = getStepFieldNames(currentStep);

    const currentStepIsValid = await methods.trigger(fieldNames, {
      shouldFocus: true,
    });

    if (!currentStepIsValid) {
      setInputError(formStep);
      return;
    }

    if (formStep !== lastInputIndex) {
      setInputError(null);
      window.scrollTo(0, 0);
      setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
      return;
    }

    const contactIsValid = await methods.trigger(requiredContactFields, {
      shouldFocus: true,
    });

    if (!contactIsValid) {
      setInputError(formStep);
      return;
    }

    handleSubmit(onSubmit)();
  };

  const handleNext = async () => {
    const currentStep = formSteps[formStep];

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const fieldNames = getStepFieldNames(currentStep);

    const valid = await methods.trigger(fieldNames, {
      shouldFocus: true,
    });

    if (!valid) {
      setInputError(formStep);
      return;
    }

    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const onSubmit = async (data) => {
    const fullName = data.fullName?.trim();
    const email = data.email?.trim();
    const phone = data.phone?.trim();
    const user_type = 'rhino';

    if (!fullName || !email || !phone) {
      console.warn('Blocked incomplete lead:', data);

      await methods.trigger(['fullName', 'email', 'phone'], {
        shouldFocus: true,
      });

      return;
    }

    setSending(true);

    try {
      data.dateAdded = Date.now();

      const payload = {
        ...lead,
        ...data,
        ...utm,
        fullName,
        email,
        phone,
        user_type,
      };

      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error(`Webhook error: ${res.status}`);
      }

      const result = await res.json().catch(() => ({}));

      fbEvent('Lead', {
        phone,
        externalID: result.id,
      });

      setCookie('lead', {
        ...data,
        id: result.id,
      });

      await router.push('/thankyou');
    } catch (err) {
      console.error('Submit error:', err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="relative flex flex-col flex-grow bg-gradient-to-t from-blue-50 to-white">
      <AnimatePresence mode="wait">
        {showIntro && <Intro onButtonClick={setShowIntro} />}

        {!showIntro && !showOutro && (
          <motion.div
            key="survey"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col flex-grow pb-[8rem]"
          >
            {/* Progress bar */}
            <div className="sticky top-0 bg-white mx-auto w-full max-w-[56rem] p-8 z-10">
              <div className="relative bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-4 bg-[#1a6fff] transition-all duration-500"
                  style={{ width: `${((formStep + 1) / formSteps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="relative container !px-0 md:pb-0 flex flex-col flex-grow md:flex-grow-0 items-center pointer-events-auto touch-auto">
              <div className="survey-card">
                <FormProvider {...methods}>
                  <form
                    className="flex flex-col flex-grow"
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={formStep}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        <StepRenderer
                          step={formSteps[formStep]}
                          index={formStep}
                          currentStep={formStep}
                          errors={errors}
                          inputError={inputError}
                          errorMessage={errors[formSteps[formStep]?.name]?.message}
                          register={register}
                        />
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className={`fixed p-8 bottom-0 inset-x-0 grid ${formSteps[formStep].type === 'checkpoint' ? 'grid-cols-1' : 'grid-cols-2'} gap-8 w-full mt-auto bg-white border-t-2 border-gray-200 z-50`}>
                      {formSteps[formStep].type !== 'checkpoint' && (
                        <button
                          type="button"
                          onClick={() => setFormStep(formStep - 1)}
                          className="!bg-transparent !text-brand-1 border-none !w-full hover:text-brand-1 disabled:!text-gray-100"
                          disabled={formStep <= 0}
                        >
                          Back
                        </button>
                      )}
                      <button
                        type="button"
                        disabled={sending}
                        onClick={handlePrimaryButtonClick}
                        className="mt-auto !w-full"
                      >
                        {sending && <span className="animate-spin mr-4">+</span>}
                        {formStep === lastInputIndex ? 'Submit' : 'Next'}
                      </button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { req, query } = ctx;
  const cookiesHeader = req.headers.cookie || '';
  const keys = ['utm', '_fbc', '_fbp', 'lead'];
  const cookies = {};

  for (const key of keys) {
    const raw = cookiesHeader
      .split('; ')
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1];
    if (!raw) continue;
    try {
      const clean = raw.startsWith('j%3A') ? raw.slice(4) : raw;
      cookies[key] = JSON.parse(decodeURIComponent(clean));
    } catch {
      cookies[key] = decodeURIComponent(raw);
    }
  }

  const utmFromQuery = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
    if (query[param]) utmFromQuery[param] = query[param];
  });

  const utm = Object.keys(utmFromQuery).length > 0 ? utmFromQuery : cookies.utm ?? null;
  const { lead } = cookies;

  return {
    props: {
      lead: {
        fullName: lead?.fullName ?? '',
        phone:    lead?.phone    ?? '',
        whatsapp: lead?.whatsapp ?? '',
        sheetRow: lead?.sheetRow ?? '',
      },
      utm,
    },
  };
}