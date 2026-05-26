import React from "react";

export default function ActionButton2({ children }) {
  return (
    <a
      href="#_"
      class="absolute rounded px-8 py-6 overflow-hidden group bg-brand-2 hover:bg-gradient-to-r hover:from-brand-1 hover:to-brand-3 text-white hover:ring-2 hover:ring-offset-2 hover:ring-brand-2 transition-all ease-out duration-400"
    >
      <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-400 transform translate-x-12 bg-red-200 opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span class="font-semibold relative">{children}</span>
    </a>
  );
}
