import React from 'react'

const Navbar = () => {
  return (
    <>
    <nav className='flex h-14 w-screen bg-violet-500 justify-between px-6 py-2 items-center'>
        <div className='text-2xl font-extrabold text-white'>I-Task</div>
        <ul className='flex h-10 justify-between w-35 items-center'>
            <li className='text-lg font-bold text-white'>Home</li>
            <li className='text-lg font-bold text-white'>Your-task</li>
        </ul>
    </nav>
    </>
  )
}

export default Navbar
