import Link from 'next/link';
import { useState } from 'react';

export function menu({nav, isMain = false}) {
  const [show, setShow] = useState('');

  const toggle = (value) => {
    if (show !== value) {
      setShow(value);
    }
    else setShow('');
  }

  return (
    <div className="flex">
      {
        nav.map(({children, label, href}) => {
          if (!children) {
            return (
              <Link key={label} href={href}>
                <a className={`relative px-4 ${isMain ? '-ft-1' : '-ft-2'}`}>{label}</a>
              </Link>
            );
          }
          return (
            <a
              key={label}
              className={`relative pl-4 pr-2 ${isMain ? '-ft-1' : '-ft-2'}`}
              tabIndex={0}
              onClick={() => toggle(label)}
              onBlur={() => setShow('')}
            >
              <div className='flex items-center cursor-pointer'>
                {label}
                <span className="ml-1 material-icons">{show === label ? 'expand_less' : 'expand_more'}</span>
              </div>
              {show === label &&
                <ul className={`absolute w-full justify-center top-12 bg-white shadow-lg border`}>
                  {children.map((c) => (
                    <li
                      key={c.label}
                      className="flex justify-center p-4"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <Link href={c.href} passhref>
                        <a className="-ft-2">{c.label}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              }
            </a>
          );
        })
      }
    </div>
  );
}