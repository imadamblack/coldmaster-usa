import Link from 'next/link';
import { info } from '../../../info';
import Image from 'next/image';
import logo from '../../../public/logo.png';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const path = router.pathname;
  const [open, setOpen] = useState(false);

  const nav = {
    cta: 'Find Your Kit',
    ctaHref: '#kits',
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0d0d0d]/88 backdrop-blur-md border-b border-white/[0.06]">
      {/* Logo */}
      <div className="relative flex items-center w-[17rem] h-12">
        <Link href="/" passhref>
          <Image
            src='/logo-light.png'
            alt={info.companyName}
            layout="fill"
            objectFit="cover"
          />
        </Link>
      </div>

      {/* Desktop CTA */}
      <Link href="/survey" passhref>
        <a
          className="hidden md:inline-block bg-[#1a6fff] hover:bg-[#0044cc] text-white -ft-2 font-bold tracking-[0.06em] uppercase px-12 py-6 rounded transition-colors duration-200"
        >
          {nav.cta}
        </a>
      </Link>

      {/* Mobile toggle */}
      <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#0d0d0d] border-t border-white/[0.06] px-6 py-4 md:hidden">
          <Link href="/survey" passhref><a
            className="block text-center bg-[#1a6fff] text-white  font-bold tracking-widest uppercase px-6 py-3 rounded"
            onClick={() => setOpen(false)}
          >
            {nav.cta}
          </a>
          </Link>
        </div>
      )}
    </nav>
  )
    ;
}
