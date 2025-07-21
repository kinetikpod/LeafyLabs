// RunButton.jsx
import React from 'react';

export default function RunButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-block px-6 py-2 font-bold text-white border-3 border-amber-500 overflow-hidden group"
    >
      <span
        className="absolute inset-0 bg-amber-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"
      ></span>
      <span className="relative">Run</span>
    </button>
  );
}

