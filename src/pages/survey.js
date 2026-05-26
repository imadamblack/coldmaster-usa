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
import { CONTENT } from '../../content';

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
    className="relative h-[100dvh] flex flex-col md:justify-center overflow-hidden pt-20 pb-20 px-6 md:px-12 bg-[url('/hero.jpg')] bg-cover bg-right-bottom"
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

// Paso 0 — siempre se muestra primero
const bifurcatorStep = {
  type: 'radio',
  name: 'user_type',
  title: 'What brings you to Coldmaster today?',
  inputOptions: { required: 'Please select one' },
  options: [
    { value: 'business', label: '🔧 I run a shop, dealership, or fleet' },
    { value: 'personal', label: '🚗 I have a personal classic car' },
  ],
  cols: 1,
};

const stepsB2B = ({ fullName, phone }) => ([
  {
    type: 'radio',
    name: 'business_type',
    title: 'What best describes your business?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: 'install-shop',    label: 'A/C installation shop' },
      { value: 'classic-dealer',  label: 'Classic car dealer or reseller' },
      { value: 'restorer',        label: 'Vehicle restoration shop' },
      { value: 'fleet-special',   label: 'Fleet or special vehicles' },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'volume',
    title: 'How many kits do you need per year, approximately?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: '1-5',      label: '1 to 5' },
      { value: '6-20',     label: '6 to 20' },
      { value: '20-plus',  label: 'More than 20' },
      { value: 'not-sure', label: "Not sure yet" },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'current_supplier',
    title: 'Do you currently work with an A/C supplier?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: 'yes-open',  label: "Yes, but I'm open to better options" },
      { value: 'no-looking', label: "No, I'm looking for a reliable one" },
      { value: 'no-fixed',  label: "I buy wherever I find it — no fixed supplier" },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'priority',
    title: 'What matters most to you in a kit supplier?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: 'price',        label: 'Competitive pricing and margin' },
      { value: 'availability', label: 'Stock availability — no waiting weeks' },
      { value: 'support',      label: 'Technical support when I need it' },
      { value: 'all',          label: 'All of the above' },
    ],
    cols: 1,
  },
  {
    type: 'textarea',
    name: 'doubts',
    title: 'Anything specific you want to cover before we talk?',
    placeholder: 'Volume pricing, availability, compatibility with a specific model — anything goes',
    inputOptions: { required: false },
    cols: 4,
  },
  {
    type: 'opt-in',
    title: 'Almost done.',
    description: 'Leave your info and one of our specialists will reach out with pricing and terms.',
    fields: [
      { type: 'text', name: 'fullName', title: 'Your full name',       inputOptions: { required: 'What is your name?' } },
      { type: 'text', name: 'email',    title: 'Your work email',      inputOptions: { required: 'What is your email?' } },
      {
        type: 'tel', name: 'phone', title: 'Your phone or WhatsApp',
        inputOptions: {
          required: 'What is your phone number?',
          maxLength: { value: 10, message: '10-digit number please' },
          minLength: { value: 10, message: '10-digit number please' },
        },
      },
    ],
  },
]);

const stepsB2C = ({ fullName, phone }) => ([
  {
    type: 'radio',
    name: 'vehicle_size',
    title: 'Pick your size',
    description: 'Coldmaster has universal fit for the majority of classic cars and trucks',
    inputOptions: { required: 'Please select one' },
    options: [
      {
        value: 'small',
        label: `<div class="flex flex-col text-center">
          <span class="ft-2 block">🏎</span>
          <span class="ft-0 font-extrabold uppercase">Small Cars & Trucks</span>
          <span class="ft-0 mt-0">Sports cars, roadsters, compacts: MG, Triumph, early Corvette, etc...</span>
        </div>`,
      },
      {
        value: 'regular',
        label: `<div class="flex flex-col text-center">
          <span class="ft-2 block">🚗</span>
          <span class="ft-0 font-extrabold uppercase">Regular Cars & Trucks</span>
          <span class="ft-0 mt-0">Mid-size sedans and standard pickups: Chevelle, Mustang, F-100, Nova, etc...</span>
        </div>`,
      },
      {
        value: 'large',
        label: `<div class="flex flex-col text-center">
          <span class="ft-2 block">🛻</span>
          <span class="ft-0 font-extrabold uppercase">Big Cars & Trucks</span>
          <span class="ft-0 mt-0">Full-size and heavy-duty trucks: Impala, Cadillac, Suburban, C10, etc...</span>
        </div>`,
      },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'installer',
    title: 'Who will be installing the kit?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: 'myself',      label: "Me, I'm a mechanic or I enjoy DIY projects" },
      { value: 'my-mechanic', label: 'My trusted mechanic will handle it' },
      { value: 'need-shop',   label: 'I need help finding someone to install it' },
    ],
    cols: 1,
  },
  {
    type: 'radio',
    name: 'urgency',
    title: 'Where are you in the decision process?',
    inputOptions: { required: 'Please select one' },
    options: [
      { value: 'exploring', label: 'Just researching my options for now' },
      { value: 'soon',      label: "I've decided, looking to buy soon" },
      { value: 'urgent',    label: 'I need it now, summer is already here' },
    ],
    cols: 1,
  },
  {
    type: 'number',
    name: 'location',
    title: 'What is your ZIP Code?',
    inputOptions: { required: 'Please select one' },
    cols: 1,
  },
  {
    type: 'textarea',
    name: 'doubts',
    title: 'Any questions about the kit or your specific vehicle?',
    placeholder: 'Year, make, model, any detail you want to share — it helps us point you to the right kit',
    inputOptions: { required: false },
    cols: 4,
  },
  {
    type: 'opt-in',
    title: 'Almost there!',
    description: "Leave your info and we'll help confirm the right kit for your car.",
    fields: [
      { type: 'text', name: 'fullName', title: 'Your name',           inputOptions: { required: 'What is your name?' } },
      { type: 'text', name: 'email',    title: 'Your email',          inputOptions: { required: 'What is your email?' } },
      {
        type: 'tel', name: 'phone', title: 'Your WhatsApp or phone',
        inputOptions: {
          required: 'What is your phone number?',
          maxLength: { value: 10, message: '10-digit number please' },
          minLength: { value: 10, message: '10-digit number please' },
        },
      },
    ],
  },
]);

// Función que arma el array completo según user_type
const setFormSteps = ({ fullName, phone, user_type }) => {
  const tail = user_type === 'business'
    ? stepsB2B({ fullName, phone })
    : user_type === 'personal'
      ? stepsB2C({ fullName, phone })
      : []; // sin selección aún: solo el bifurcador

  return [bifurcatorStep, ...tail];
};

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

  // formSteps se recalcula en cada render con el user_type actual
  // Cuando el usuario aún no eligió, tail = [] y solo existe el bifurcador
  const user_type = watch('user_type');
  let formSteps = setFormSteps({ fullName: lead.fullName, phone: lead.phone, user_type });

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

  const handleNext = async () => {
    const currentStep = formSteps[formStep];

    if (currentStep.type === 'checkpoint') {
      return setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }

    const valid = await methods.trigger(currentStep.name);
    if (!valid) {
      setInputError(formStep);
      return;
    }

    // Si acaba de responder el bifurcador, los pasos se expanden
    // automáticamente en el próximo render gracias a watch('user_type')
    setInputError(null);
    window.scrollTo(0, 0);
    setFormStep((prev) => Math.min(prev + 1, formSteps.length - 1));
  };

  const onSubmit = async (data) => {
    setSending(true);
    try {
      // data.whatsapp = '521' + data.phone.replace(/^(MX)?\+?(52)?\s?0?1?|\s|\(|\)|-|[a-zA-Z]/g, '');
      data.dateAdded = Date.now();

      const payload = { ...lead, ...data, ...utm };
      const res = await fetch(info.surveyWebhook, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' },
      });

      fbEvent('Lead', { phone: data.phone, externalID: res.id });
      setCookie('lead', { ...data, id: res.id });
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
                  <form className="flex flex-col flex-grow" onSubmit={handleSubmit(onSubmit)}>
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
                        onClick={() => {
                          if (formStep === lastInputIndex) {
                            handleSubmit(onSubmit)();
                          } else {
                            handleNext();
                          }
                        }}
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