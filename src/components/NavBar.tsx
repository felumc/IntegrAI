"use client"
import React from 'react';

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="text-2xl text-white tracking-tight font-light">IntegrAI</div>
          <div className="hidden md:flex space-x-10">
            <a href="#home" className="text-white text-lg font-light hover:opacity-80 transition">Home</a>
            <a href="#services" className="text-white text-lg font-light hover:opacity-80 transition">Services</a>
            <a href="#about" className="text-white text-lg font-light hover:opacity-80 transition">About</a>
            <a href="#contact" className="text-white text-lg font-light hover:opacity-80 transition">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
} 