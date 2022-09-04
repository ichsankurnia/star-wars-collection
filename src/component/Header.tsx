import { Transition } from '@headlessui/react';
import React, { useContext, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import logo from './../asset/logo.png'
import avatar from './../asset/avatar.jpg'

type Props = {
    mobileMenu: boolean,
    setMobileMenu: (state: boolean) => any
};

const Header: React.FC<Props> = ({ mobileMenu, setMobileMenu }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const { bookmarkedItem } = useContext(GlobalContext)

    return (
        <>
            <header className='sticky top-0 z-10 bg-white'>
                <div className='xl:max-w-[1300px] mx-auto flex justify-between items-center py-1.5 px-4 md:px-0'>
                    <div><img alt='app-logo' src={logo} className='w-24' /></div>
                    <div className='flex items-center space-x-5'>
                        <div className='flex items-center space-x-5'>
                            <div className="cursor-pointer hover:text-yellow-500 transition-all ease-in-out duration-500 relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                                <span className='flex items-center space-x-1.5'>
                                    <i className="fa-solid fa-language"></i>
                                    <p>ID</p>
                                    <i className="fa-solid fa-angle-down"></i>
                                </span>
                                <Transition show={dropdownOpen}
                                    enter="transition ease-out duration-500"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-100"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                    className="origin-top-right z-10 absolute top-full -left-20 mt-1 text-white bg-[#121212] rounded-xl w-48"
                                >
                                    <div >
                                        <ul className='flex flex-col items-center'>
                                            <li className='cursor-pointer text-yellow-500 hover:text-yellow-500 transition-all ease-in-out duration-300 py-2.5 border-b border-stone-800 w-full text-center'>English</li>
                                            <li className='cursor-pointer hover:text-yellow-500 transition-all ease-in-out duration-300 py-2.5 border-stone-800 w-full text-center'>Indonesian</li>
                                        </ul>
                                    </div>
                                </Transition>
                            </div>
                            <i className="fa-solid fa-bell text-base cursor-pointer hover:text-yellow-500 transition ease-in-out duration-500"></i>
                        </div>
                        <div className='flex items-center'>
                            <LazyLoadImage effect='blur' alt='' className='cursor-pointer object-cover w-12 h-12 rounded-full border hover:border-yellow-500 transition ease-in-out duration-300' src={avatar} />
                        </div>
                    </div>
                </div>
                <div className='bg-gray-200 border-b border-t border-gray-300 text-gray-600 py-3'>
                    <ul className='xl:max-w-[1300px] mx-auto flex items-center space-x-2 md:space-x-5 font-medium'>
                        <button className='block md:hidden border-2 rounded-lg border-gray-400 w-9 h-9 ml-5 text-base hover:text-gray-700 hover:border-gray-700 transition duration-500 ease-in-out' onClick={() => setMobileMenu(!mobileMenu)}>
                            {mobileMenu ? <i className="fa-solid fa-xmark text-lg"></i> : <i className="fa-solid fa-bars"></i>}
                        </button>
                        <NavLink to='for-you' className={({ isActive }) => `rounded-lg hover:bg-white px-4 py-1.5 transition duration-300 ease-in-out ${isActive ? 'bg-gray-100 font-semibold' : 'bg-transparent'}`}>
                            For You
                        </NavLink>
                        <NavLink to='' className={({ isActive }) => `rounded-lg hover:bg-white px-4 py-1.5 transition duration-300 ease-in-out ${isActive ? 'bg-gray-100 font-semibold' : 'bg-transparent'}`}>
                            Explore
                        </NavLink>
                        <NavLink to='bookmark' className={({ isActive }) => `rounded-lg hover:bg-white px-4 py-1.5 transition duration-300 ease-in-out flex items-center ${isActive ? 'bg-gray-100 font-semibold' : 'bg-transparent'}`}>
                            <span>Bookmark</span>
                            <div className='ml-1.5 bg-yellow-500 w-6 h-6 rounded-full text-white flex justify-center items-center text-[13px]'>{bookmarkedItem.length}</div>
                        </NavLink>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Header;