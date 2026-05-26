import { info } from '../../info';
import Link from 'next/link';

export default function NotElegible() {
  return (
    <section className="relative flex flex-col flex-grow justify-center px-0">
      <div className="container md:w-1/2 flex flex-col min-h-[40dvh] items-center justify-center pt-[8rem] gap-8">
        <h2 className="ft-6 text-center">
          Nuestro programa de distribuidores está diseñado para negocios retail con pedidos iniciales a partir de $20,000 MXN y una dinámica de compra recurrente
        </h2>
        <p className="ft-4 text-center">
          Si estás buscando una compra menor o productos para uso personal, puedes hacerlo directamente en nuestra tienda en línea aquí:
        </p>
        <div className="flex flex-col items-center justify-center gap-10">
          <a className="button uppercase ft-2" href="https://dobleacento.mx">Tienda en línea</a>
          <p className="border-t border-brand-1 pt-20">
            <a href={`https://wa.me/${info.whatsapp.value}`} className="text-green-700">
            O contáctanos por <span className="font-semibold underline">WhatsApp</span> y empieza a distribuir →
          </a>
          </p>
        </div>

      </div>
    </section>
  );
}
