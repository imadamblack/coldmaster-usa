import Link from 'next/link';
import { info } from '../../../info';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const path = router.pathname;

  const nav = {
    cta: 'Find Your Kit',
    ctaHref: '#kits',
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0d0d0d]/88 backdrop-blur-md border-b border-white/[0.06]">
      {/* Logo */}
      <div className="relative flex items-center w-[17rem] h-12">
        <Link href="/" passHref>
          <Image
            src='/logo-light.png'
            alt={info.companyName}
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>

      {/* Desktop CTA */}
      {/*<Link href="/survey" passHref>*/}
      {/*  <div*/}
      {/*    className="hidden md:inline-block bg-[#1a6fff] hover:bg-[#0044cc] text-white -ft-2 font-bold tracking-[0.06em] uppercase px-12 py-6 rounded transition-colors duration-200"*/}
      {/*  >*/}
      {/*    {nav.cta}*/}
      {/*  </div>*/}
      {/*</Link>*/}
    </header>
  )
    ;
}
