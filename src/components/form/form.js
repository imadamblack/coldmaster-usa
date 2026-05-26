import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { info } from '../../../info';
import { emailRegExp } from '../../utils/formValidators';

import fbEvent from '../../services/fbEvents';
import { useRouter } from 'next/router';
import VerMasButton from '../ui/verMasButton';

export default function Form() {
  const [awaiting, setAwaiting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    setAwaiting(true);
    const dateAdded = new Date().toLocaleString('es-MX', {timeZone: 'America/Mexico_City'})

    return (
      fetch('https://hook.us1.make.com/s3wodpb45yes7d9jfbra5u0bcjy5fgl8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dateAdded, ...data}),
      })
        .then((result) => result)
        .then((res) => res)
        .then(fbEvent('Lead', data))
        .then(() => {
          setAwaiting(false);
          router.push('/thankyou');
        })
    );
  };

  const renderError = (error) => (
    <span className="smallest text-red-500">{error?.message}</span>
  );

  return (
    <form className="mt-12 " onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="fullName">Nombre</label>
      <input
        placeholder="Nombre"
        {...register('fullName', {
          required: 'Compártenos tu nombre',
        })}
      />
      {renderError(errors.fullName)}
      <label htmlFor="phone">Teléfono</label>
      <input
        type="tel"
        placeholder="(477) 123 1234"
        {...register('phone', {
          required: 'Por favor ingresa un teléfono',
        })}
      />
      {renderError(errors.phone)}

      <label htmlFor="email">Email</label>
      <input
        placeholder="mail@mail.com"
        {...register('email', {
          required: 'Por favor compártenos un correo electrónico',
          pattern: {
            value: emailRegExp,
            message: 'Revisa tu correo',
          },
        })}
      />
      {renderError(errors.email)}
      <div className="flex flex-col">
        {/* !!!Cita */}
        <div>
          <label>Horario de cita</label>
          <select
            className="text-xl py-4 px-5 minimal border rounded-lg w-full border-neutral-500"
            name="appointment"
            id="cita-select"
            {...register('appointment', {
              required: 'Por favor selecciona una opción',
            })}
          >
            <option value="">Selecciona una opción</option>
            <option value="a_cualquier_hora_">A cualquier hora</option>
            <option value="entre_9:00_am_y_11:00_am">
              Entre 9:00 am y 11:00 am
            </option>
            <option value="después_de_las_6:00_pm">
              después de las 6:00 pm
            </option>
          </select>
        </div>
        {renderError(errors.appointment)}

        {/* !!!Presupuesto */}
        <div>
          <label>Presupuesto</label>
          <select
            className="text-xl py-4 px-5 minimal border rounded-lg w-full border-neutral-500"
            name="budget"
            id="presupuesto-select"
            {...register('budget', {
              required: 'Por favor compártenos cuanto es tu presupuesto.',
            })}
          >
            <option value="" disabled selected>
              Selecciona tu presupuesto
            </option>
            <option value="$300,000_-_$400,000_usd">
              $300,000 a $400,000 USD
            </option>
            <option value="$400,000_-_$500,000_usd">
              $400,000 a $500,000 USD
            </option>
            <option value="más_de_$500,000_usd">mas de $500,000 USD</option>
          </select>
        </div>
        {renderError(errors.budget)}

        {/* !!!Inversión*/}
        <div>
          <label>Inversión</label>
          <select
            className="text-xl py-4 px-5 border rounded-lg w-full border-neutral-500"
            name="investment"
            id="investment-select"
            {...register('investment', {
              required:
                'Por favor compártenos el modo en el que quieres invertir.',
            })}
          >
            <option value="" disabled selected>
              Por favor selecciona un modo de inversion
            </option>
            <option value="recurso_propio">Recurso propio</option>
            <option value="crédito_hipotecario">Crédito hipotecario</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>
        {renderError(errors.investment)}

        {/* !!!Inmediatez*/}
        <div>
          <label>Inmediatez</label>
          <select
            className="text-xl py-4 px-5 border rounded-lg w-full border-neutral-500"
            name="immediacy"
            id="immediacy-select"
            {...register('immediacy', {
              required: 'Por favor compártenos la inmediatez',
            })}
          >
            <option value="" disabled selected>
              Por favor selecciona un modo de inversion
            </option>
            <option value="de_inmediato">De inmediato</option>
            <option value="entre_3_y_6_meses">Entre 3 y 6 meses</option>
            <option value="entre_6_meses_y_1_año">Entre 6 meses y 1 año</option>
          </select>
          {renderError(errors.immediacy)}
        </div>
        {/*  */}
      </div>

      <div className="mt-[40px] font-bold flex flex-col md:items-start items-center">
        <VerMasButton>
          <div className="text-3xl">
            <button
              className={`button ${awaiting ? '!bg-gray-300' : ''}`}
              type="submit"
              disabled={awaiting}
            >
              {!awaiting ? 'Enviar y contactar asesor' : 'Enviando...'}
            </button>
          </div>
        </VerMasButton>
      </div>
      <div className="mt-40">
        <p className="mt-8 mini">
          {'Al dar click aceptas nuestros '}
          <Link href={info.termsConditions ?? ''} passhref>
            <a target="_blank" className="mini font-semibold">
              Términos y condiciones.
            </a>
          </Link>
          <br/>
          {'Conoce nuestro '}
          <Link href={info.privacyNotice ?? ''} passhref>
            <a target="_blank" className="mini font-semibold">
              Aviso de privacidad
            </a>
          </Link>
          {'.'}
        </p>
      </div>
    </form>
  );
}
