import { useState } from "react";
import { Transition } from '@headlessui/react'

const Header = () => {
    const [isOpen, toggleMenu] = useState(false)
    return (
        <div className="relative bg-white -ml-10 -mr-10 px-10 mb-5 shadow-sm">
            <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
                <div className="mr-2 -my-2 xl:hidden">
                    <button onClick={() => toggleMenu(old => !old)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        {/* <!-- Heroicon name: menu --> */}
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-start flex-grow xl:flex-grow-0">
                    <a href="#">
                        <span className="sr-only">Health Explorer</span>
                        <img className="h-8 w-40 sm:h-10" src="/img/logo.svg" alt="Health Explorer" />
                    </a>
                </div>
                <div className="mr-2 -my-2 xl:hidden">
                    <a href="#" className="relative ml-8 whitespace-nowrap inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 hover:text-white">SS<span className="absolute bg-red-500 text-white rounded-full flex items-center justify-center transform -translate-y-5 translate-x-5 border-current border-2 h-8 w-8">22</span></a>
                </div>
                <nav className="hidden xl:flex flex-grow justify-center space-x-10 place-items-center text-base font-medium text-gray-500">
                    <a href="#" className="hover:text-gray-900">PROFILE</a>
                    <a href="#" className="hover:text-gray-900">JOBS</a>
                    <a href="#" className="hover:text-gray-900">PROFESSIONAL NETWORK</a>
                    <a href="#" className="hover:text-gray-900">LOUNGE</a>
                    <a href="#" className="hover:text-gray-900">SALARY</a>
                </nav>
                <div className="hidden xl:flex items-center justify-end">
                    <a href="#" className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-base font-medium text-blue-500 hover:bg-blue-600 hover:text-white">CREATE JOB</a>
                    <a href="#" className="relative ml-8 whitespace-nowrap inline-flex items-center justify-center p-2 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 hover:text-white">SS<span className="absolute bg-red-500 text-white rounded-full flex items-center justify-center transform -translate-y-5 translate-x-5 border-current border-2 h-8 w-8">22</span></a>
                    <a href="#" className="ml-8 whitespace-nowrap inline-flex items-center justify-center text-base">LOGOUT</a>
                </div>
            </div>
            {/* 
                Mobile menu, show/hide based on mobile menu state.
            */}
            <Transition
                show={isOpen}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
            <div className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right xl:hidden`}>
                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50  overflow-auto">
                    <div className="pt-5 pb-6 px-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <img className="h-8 w-40 sm:h-10" src="/img/logo.svg" alt="Health Explorer" />
                            </div>
                            <div className="-mr-2">
                                <button onClick={() => toggleMenu(old => !old)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Close menu</span>
                                {/* <!-- Heroicon name: x --> */}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-6 px-5 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-base font-medium text-gray-900">
                            <a href="#">PROFILE</a>
                            <a href="#">JOBS</a>
                            <a href="#">PROFESSIONAL NETWORK</a>
                            <a href="#">LOUNGE</a>
                            <a href="#">SALARY</a>
                        </div>
                    </div>
                    <a href="#" className="flex items-center justify-center mx-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                            CREATE JOB
                    </a>
                    <p className="mt-6 text-center text-base font-medium text-gray-500 mb-10">
                        <a href="#" className="text-indigo-600 hover:text-indigo-500">
                        LOGOUT
                        </a>
                    </p>
                </div>
            </div>
            </Transition>

        </div>
    );
}

export default Header;