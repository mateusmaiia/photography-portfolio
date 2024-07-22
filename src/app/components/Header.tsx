import Link from 'next/link'
import React from 'react'
import { WhatsAppButton } from './whatsappbutton'

export const Header = () => {
  return (
    <header className=" px-10 fixed w-full z-30 top-0 text-white flex justify-between items-center h-[90px]">
      <div className="hidden">hm</div>
      <div className="uppercase text-lg font-medium">Bruna Brasil</div>
      <WhatsAppButton />
  </header>
  )

}
