import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className=" px-10 fixed w-full z-30 top-0 text-white flex justify-between items-center h-[90px]">
      <div className="hidden">hm</div>
      <div className="uppercase text-lg font-medium">Bruna Brasil</div>
      <Link href="#" className="rounded-3xl bg-white text-stone-700 px-3 py-2 text-md hover:bg-opacity-90">
        Marcar Ensaio
      </Link>
  </header>
  )
}
