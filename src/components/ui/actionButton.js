import React from "react";

export default function ActionButton({ children }) {
  return (
    <a
      href="#_"
      className="absolute rounded px-16 py-12 mt-5 overflow-hidden group bg-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-400"
    >
      <span className="absolute right-0 w-8 h-[120%] -mt-12 transition-all duration-400 transform translate-x-12 bg-red-200 opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="font-semibold text-4xl relative">{children}</span>
    </a>
  );
}
