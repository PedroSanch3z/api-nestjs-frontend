import Link from 'next/link'
import React from 'react'

export const NavBar = () => {
  return (
    <div className='bg-white dark:bg-slate-900 flex justify-between items-center p-6'>
        <div className=' p-1'>
            <Link href="/" className='font-bold text-2xl'> frontend</Link>
        </div>
        <div>
            <ul className=' flex gap-3'>
                <li><Link href={"https://portafolio-umber-eight.vercel.app/"} className='hover:text-gray-400'>Sobre mí</Link></li>
                <li><Link href={"/"} className='hover:text-gray-400'>Repositorio</Link></li>
                <li><Link href={"https://www.linkedin.com/in/pedro-sanchez-4784b029a"} className='hover:text-gray-400'>Linkedin</Link></li>
            </ul>
        </div>
       
    </div>
    )
}
