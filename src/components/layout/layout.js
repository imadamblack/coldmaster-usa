import Head from 'next/head';
import { info } from '../../../info';
import Header from './header';
import Footer from './footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Layout({children}) {
  const router = useRouter()
  const [header, setHeader] = useState(true);

  useEffect(() => {
    setHeader(router.pathname !== '/survey');
  }, [router.pathname]);

  // useEffect(() => {
  //   // Espera a que el DOM actualice antes de medir
  //   const timeout = setTimeout(() => {
  //     const mainHeader = document.getElementsByTagName('header')[0];
  //     if (header && mainHeader) {
  //       const height = mainHeader.offsetHeight + 'px';
  //       document.querySelector('html').style.scrollPaddingTop = height;
  //       document.querySelector('main').style.paddingTop = height;
  //       document.querySelector('main').style.scrollMarginTop = height;
  //     } else {
  //       // Restablecer estilos si no hay header
  //       document.querySelector('html').style.scrollPaddingTop = '0px';
  //       document.querySelector('main').style.paddingTop = '0px';
  //       document.querySelector('main').style.scrollMarginTop = '0px';
  //     }
  //   }, 0); // espera al próximo ciclo del event loop
  //
  //   return () => clearTimeout(timeout);
  // }, [router.pathname, header]);

  return (
    <>
      <Head>
        <title>{info.companyName} | {info.description}</title>
        <meta name="description" content={info.description}/>
        <link rel="icon" type="image/png" href="favicon.png"/>
      </Head>
      {header && <Header/>}

      <main className={`flex-grow`}>{children}</main>

      {header && <Footer/>}
    </>
  );
}
