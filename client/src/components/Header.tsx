import { Earth, Menu, Search } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className=' max-w-[2000px] mx-auto p-5 flex justify-between border-b'>
        <img className=' w-[120px] h-[40px]' src="../../logo (1).png" alt="" />
        <div className=' flex items-center gap-5 border shadow-sm hover:shadow-md duration-75 rounded-3xl py-1 px-3'>
            <span className=' font-semibold border-r border-gray-200 pr-6'>Anywhere</span>
            <span className=' font-semibold border-r border-gray-200 pr-6'>Any week</span>
            <span className=' font-semibold'>Add guests</span>
            <div className=' bg-red-500 rounded-full text-white p-2'>
                <Search className=' w-5 h-5' />
            </div>
        </div>
        <div className=' flex items-center gap-4'>
            <h1 className=' text-base font-semibold hover:bg-gray-100 p-2 rounded-3xl'>Airbnb your home</h1>
            <Earth />
            <div className=' flex items-center border p-2 gap-2 rounded-3xl'>
                <Menu />
                <img className=' object-cover w-10 h-10' src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=" alt="" />
            </div>
        </div>
    </header>
  )
}

export default Header