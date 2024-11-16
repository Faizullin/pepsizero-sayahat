"use client"
import React, {FC, useCallback, useMemo, useState} from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";
import useWindowWidth from "@/hooks/useWindowWidth";
import {NavLinkProps} from "@/components/megamenu/types";
import Logo from "./Logo";
import {Button} from "@/components/common";
import NavDropdown from "./NavDropdown";
import {Menu} from "lucide-react";

import './Header.scss';
import useIsScrolled from "@/hooks/useIsScrolled";
import OurWorkSubMenu from "@/components/megamenu/OurWorkSubMenu";
import {AnimatePresence, motion} from "framer-motion";

interface HeaderProps {
    className?: string;
    additional_nav_links?: Array<NavLinkProps>;
}

interface ILang {
    label: string;
    value: string;
}

interface IOpenDropdownMenuItem {
    id: string;
    order: number;
    hasMegamenu: boolean;
}

const Header: FC<HeaderProps> = ({...props}) => {
    // const additional_nav_links = props.additional_nav_links || [];
    const {breakpoint} = useWindowWidth()

    const [currentLang, setCurrentLang] = useState<string>("ru")
    const langOptions: Array<ILang> = useMemo(() => {
        return [
            {
                label: "RU",
                value: "ru",
            },
            {
                label: "EN",
                value: "en",
            }
        ];
    }, []);
    const currentLangSelected = useMemo(() => {
        return langOptions.find(item => item.value === currentLang)!;
    }, [currentLang, langOptions]);
    const navItems: Array<NavLinkProps> = useMemo(() => {
        const default_data: Array<NavLinkProps> =
            [
                {
                    id: "contacts",
                    label: "Контакты", link: "#",
                    // renderMenu: OurWorkSubMenu,
                },
                {
                    id: "about-us",
                    label: "О нас", link: "/about",
                    // renderMenu: OurWorkSubMenu,
                },
                {
                    id: "certificates",
                    label: "Сертификаты", link: "#",
                },
                {
                    id: "career",
                    label: "Карьера",
                    link: "#",
                },
                {
                    id: "team", label: "Команда", link: "#"
                },
            ];
        return default_data;
    }, [])

    const [currentMenuXDirection, setCurrentMenuXDirection] = useState<"r" | "l" | null>(null);
    const [openDropdownMenuItem, setOpenDropdownMenuItem] = useState<IOpenDropdownMenuItem | null>(null);
    const handleOpenMegaMenu = useCallback((item: IOpenDropdownMenuItem | null) => {
        if (item === null) {
            setOpenDropdownMenuItem(null)
            return;
        }
        const menuItem = navItems.find(item => item.id === item.id)!;
        if (!menuItem) {
            throw new Error("Navigation item not found!");
        }
        if (openDropdownMenuItem === null) {
            setOpenDropdownMenuItem(item)
            setCurrentMenuXDirection(null)
        } else if (openDropdownMenuItem.id === item.id) {
            setOpenDropdownMenuItem(null)
            setCurrentMenuXDirection(null)
        } else if (openDropdownMenuItem.id !== item.id) {
            setOpenDropdownMenuItem(item)
            setCurrentMenuXDirection(openDropdownMenuItem.order > item!.order ? "r" : "l");
        }
    }, [navItems, openDropdownMenuItem])
    const {isScrolled} = useIsScrolled();
    const headerHeight = useMemo(() => {
        if (breakpoint === 'xs') {
            return 60
        }
        if (isScrolled) {
            return 60
        }
        return 80;
    }, [isScrolled, breakpoint]);
    return (
        <>

            <header
                className={cn("header",
                    props.className,
                    {
                        "static": !isScrolled,
                    }
                )}
                style={{
                    height: headerHeight,
                }}>
                <div className={"w-full h-full relative"}>
                    <div className="mega-menu container h-full mx-auto flex items-start justify-between gap-5">
                        <Logo/>
                        <div
                            className="flex-1 flex h-full items-start justify-center self-center md:w-full md:flex-col">
                            <div className="navbar-links-lists">
                                <ul onMouseLeave={() => handleOpenMegaMenu(null)}>
                                    {navItems.map((item, index) => {
                                        const active = openDropdownMenuItem && (openDropdownMenuItem?.id === item.id);
                                        return (
                                            <li key={index}
                                                className={cn("mega-menu-item h-full ", {
                                                    "bg-green-900 ": active,
                                                })}>
                                                <Link href={item.link}
                                                      className={"px-[10px] w-full h-full flex items-center justify-center"}
                                                      onMouseEnter={() => handleOpenMegaMenu({
                                                          id: item.id,
                                                          order: index,
                                                          hasMegamenu: !!item.renderMenu,
                                                      })}>
                                                    <p
                                                        className={cn("font-futurapt text-gray-600font-semibold text-[12px] uppercase flex", {
                                                            "text-white-a700": active,
                                                        })}>
                                                        {item.label}
                                                    </p>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                    {
                                        openDropdownMenuItem?.hasMegamenu && (
                                            <ul
                                                className={cn(
                                                    "mega-sub-menu",
                                                    {
                                                        "active": !!openDropdownMenuItem,
                                                    }
                                                )}
                                                style={{
                                                    height: "457px",
                                                    top: headerHeight,
                                                }}
                                            >
                                                <AnimatePresence>
                                                    <motion.div
                                                        id="overlay-content"
                                                        initial={{
                                                            opacity: 0,
                                                            y: 8,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            y: 8,
                                                        }}
                                                        className={`absolute left-0 top-0 w-full rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4 ${!(openDropdownMenuItem?.hasMegamenu) ? "hidden" : ""}`}
                                                    >
                                                        {/*<Bridge/>*/}
                                                        {/*<Nub selected={selected}/>*/}
                                                        {navItems.filter(item => item.renderMenu).map((t) => {
                                                            if (!t.renderMenu) {
                                                                return null;
                                                            }
                                                            return (
                                                                <div className="overflow-hidden" key={t.id}>
                                                                    {openDropdownMenuItem.id === t.id && (
                                                                        <motion.div
                                                                            initial={{
                                                                                opacity: 0,
                                                                                x: currentMenuXDirection === "l" ? 100 : currentMenuXDirection === "r" ? -100 : 0,
                                                                            }}
                                                                            animate={{opacity: 1, x: 0}}
                                                                            transition={{duration: 0.25, ease: "easeInOut"}}
                                                                        >
                                                                            <t.renderMenu/>
                                                                        </motion.div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </ul>
                                        )
                                    }
                                </ul>
                                <ul>
                                    <li className={"h-full flex items-center justify-center"}>
                                        <NavDropdown
                                            value={currentLangSelected.value}
                                            onSelect={(value) => {
                                                setCurrentLang(value)
                                            }}
                                            data={
                                                langOptions
                                            }
                                            className={"h-full flex justify-center align-middle"}
                                            dropdownContainer={{
                                                className: "w-full mt-0 rounded-0"
                                            }}
                                        />
                                    </li>
                                    <li className={"h-full flex items-center justify-center"}>
                                        <Button
                                            variant={"fill"}
                                            className={"w-[140px] h-[38px] text-[14px] font-futurapt font-semibold uppercase"}
                                        >
                                            Связяться
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={"sm:hidden h-full flex items-center"}>
                            <Menu/>
                        </div>
                    </div>
                </div>
            </header>
            <div style={{
                height: headerHeight,
            }} className={"hidden sm:block"}></div>
        </>
    )
}
export default Header;