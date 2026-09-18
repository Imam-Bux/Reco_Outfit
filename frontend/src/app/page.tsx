import React from 'react'
import AdminPage from '@/onlyAdminAccessPage/page'

const CORNERS = [
  '-top-2 -left-2',
  '-top-2 -right-2',
  '-bottom-2 -left-2',
  '-bottom-2 -right-2',
] as const

function Flower({ sm = false }: { sm?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full border-2 border-primary-400 bg-white/70 backdrop-blur-sm shadow-[0_0_14px_rgba(240,200,80,0.45)] ${
        sm ? 'w-7 h-7' : 'w-8 h-8'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={sm ? 'w-4 h-4' : 'w-5 h-5'}
      >
        <circle cx="12" cy="5.5" r="2" fill="#F5D85E" />
        <circle cx="18.5" cy="12" r="2" fill="#F5D85E" />
        <circle cx="12" cy="18.5" r="2" fill="#F5D85E" />
        <circle cx="5.5" cy="12" r="2" fill="#F5D85E" />
        <circle cx="16.2" cy="7.8" r="2" fill="#F0C850" />
        <circle cx="16.2" cy="16.2" r="2" fill="#F0C850" />
        <circle cx="7.8" cy="16.2" r="2" fill="#F0C850" />
        <circle cx="7.8" cy="7.8" r="2" fill="#F0C850" />
        <circle cx="12" cy="12" r="2.3" fill="#FFFDF0" stroke="#D4A830" strokeWidth="0.6" />
      </svg>
    </div>
  )
}

function FlowerCorner({ className }: { className: (typeof CORNERS)[number] }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed z-20 hidden lg:block ${className}`}
    >
      <Flower />
    </div>
  )
}

function FlowerBorders() {
  return (
    <>
      {CORNERS.map((pos) => (
        <FlowerCorner key={pos} className={pos} />
      ))}
    </>
  )
}

export default function Page() {
  return (
    <div className="app-bg min-h-screen">
      <FlowerBorders />
      <AdminPage />
    </div>
  )
}