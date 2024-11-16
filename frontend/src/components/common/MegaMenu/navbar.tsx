'use client'
import React, {useRef, useState} from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdowns, setDropdowns] = useState({home: false, about: false, services: false, contact: false});
    const [subDropdowns, setSubDropdowns] = useState({
        homeSub2: false,
        aboutSub2: false,
        servicesSub2: false,
        contactSub2: false
    });

    const timers = useRef<{ [key: string]: NodeJS.Timeout | null }>({});

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleMouseEnter = (menu: string) => {
        if (timers.current[menu]) {
            clearTimeout(timers.current[menu] as NodeJS.Timeout);
        }
        setDropdowns((prev) => ({...prev, [menu]: true}));
    };

    const handleMouseLeave = (menu: string) => {
        timers.current[menu] = setTimeout(() => {
            setDropdowns((prev) => ({...prev, [menu]: false}));
        }, 500); // 0.5 seconds delay before hiding
    };

    const handleSubMouseEnter = (subMenu: string) => {
        if (timers.current[subMenu]) {
            clearTimeout(timers.current[subMenu] as NodeJS.Timeout);
        }
        setSubDropdowns((prev) => ({...prev, [subMenu]: true}));
    };

    const handleSubMouseLeave = (subMenu: string) => {
        timers.current[subMenu] = setTimeout(() => {
            setSubDropdowns((prev) => ({...prev, [subMenu]: false}));
        }, 5000); // 0.5 seconds delay before hiding
    };

    return (
        <nav className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-semibold">
                            Q Engineering
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {/* Home Dropdown */}
                            <div className="relative" onMouseEnter={() => handleMouseEnter('home')}
                                 onMouseLeave={() => handleMouseLeave('home')}>
                                <Link href="/"
                                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Home
                                </Link>
                                {dropdowns.home && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                        <Link href="/home/sub1"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            1</Link>
                                        <div className="relative" onMouseEnter={() => handleSubMouseEnter('homeSub2')}
                                             onMouseLeave={() => handleSubMouseLeave('homeSub2')}>
                                            <Link href="/home/sub2"
                                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Subitem 2 with dropdown
                                            </Link>
                                            {subDropdowns.homeSub2 && (
                                                <div
                                                    className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                                                    <Link href="/home/sub2-1"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-1</Link>
                                                    <Link href="/home/sub2-2"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-2</Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href="/home/sub3"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                            Subitem
                                            3</Link>
                                    </div>
                                )}
                            </div>
                            <Link href="/"
                                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                EPCM
                            </Link>
                            <Link href="/"
                                  className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                R&D
                            </Link>
                            {/* EPCM, R&D, Contacts, About Us, Projects, Licenses, Careers, Request a Meeting */}

                            {/* About Dropdown */}
                            <div className="relative" onMouseEnter={() => handleMouseEnter('about')}
                                 onMouseLeave={() => handleMouseLeave('about')}>
                                <Link href="/about"
                                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    About Us
                                </Link>
                                {dropdowns.about && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                        <Link href="/about/sub1"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            1</Link>
                                        <div className="relative" onMouseEnter={() => handleSubMouseEnter('aboutSub2')}
                                             onMouseLeave={() => handleSubMouseLeave('aboutSub2')}>
                                            <Link href="/about/sub2"
                                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Subitem 2 with dropdown
                                            </Link>
                                            {subDropdowns.aboutSub2 && (
                                                <div
                                                    className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                                                    <Link href="/about/sub2-1"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-1</Link>
                                                    <Link href="/about/sub2-2"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-2</Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href="/about/sub3"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            3</Link>
                                    </div>
                                )}
                            </div>

                            {/* Services Dropdown */}
                            <div className="relative" onMouseEnter={() => handleMouseEnter('services')}
                                 onMouseLeave={() => handleMouseLeave('services')}>
                                <Link href="/services"
                                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Services
                                </Link>
                                {dropdowns.services && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                        <Link href="/services/sub1"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            1</Link>
                                        <div className="relative"
                                             onMouseEnter={() => handleSubMouseEnter('servicesSub2')}
                                             onMouseLeave={() => handleSubMouseLeave('servicesSub2')}>
                                            <Link href="/services/sub2"
                                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Subitem 2 with dropdown
                                            </Link>
                                            {subDropdowns.servicesSub2 && (
                                                <div
                                                    className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                                                    <Link href="/services/sub2-1"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-1</Link>
                                                    <Link href="/services/sub2-2"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-2</Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href="/services/sub3"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            3</Link>
                                    </div>
                                )}
                            </div>

                            {/* Contact Dropdown */}
                            <div className="relative" onMouseEnter={() => handleMouseEnter('contact')}
                                 onMouseLeave={() => handleMouseLeave('contact')}>
                                <Link href="/contacts"
                                      className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                    Contacts
                                </Link>
                                {dropdowns.contact && (
                                    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
                                        <Link href="/contacts/sub1"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            1</Link>
                                        <div className="relative"
                                             onMouseEnter={() => handleSubMouseEnter('contactSub2')}
                                             onMouseLeave={() => handleSubMouseLeave('contactSub2')}>
                                            <Link href="/contacts/sub2"
                                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                                                Subitem 2 with dropdown
                                            </Link>
                                            {subDropdowns.contactSub2 && (
                                                <div
                                                    className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md py-2 z-20">
                                                    <Link href="/contacts/sub2-1"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-1</Link>
                                                    <Link href="/contacts/sub2-2"
                                                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                                        2-2</Link>
                                                </div>
                                            )}
                                        </div>
                                        <Link href="/contacts/sub3"
                                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Subitem
                                            3</Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
