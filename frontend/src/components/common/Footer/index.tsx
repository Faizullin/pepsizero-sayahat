import {Img} from "./..";
import Link from "next/link";
import React from "react";
import './Footer.scss';

interface FooterNavLink {
    label: string;
    link: string;
}

export default function Footer() {
    const col_1: FooterNavLink[] = [
        {
            label: "О engineering",
            link: "#",
        },
        {
            label: "Сервисы",
            link: "#",
        },
        {
            label: "Проекты",
            link: "#",
        },
        {
            label: "Новости",
            link: "#",
        },
    ]
    const col_2: FooterNavLink[] = [
        {
            label: "Карьера",
            link: "#",
        },
        {
            label: "Оффисы",
            link: "#",
        },
        {
            label: "Контакты",
            link: "#",
        },
        {
            label: "Карта местности",
            link: "#",
        },
    ]
    const col_3: FooterNavLink[] = [
        {
            label: "3D визуализации",
            link: "#",
        },
        {
            label: "Блог",
            link: "#",
        },
        {
            label: "Социальные сети",
            link: "#",
        },
        {
            label: "Прочее",
            link: "#",
        },
    ]
    return (
        <footer
            className={`footer`}>
            <div className="container px-4 sm:px-0">
                <div className="w-full sm:flex items-start justify-between">
                    <div className="w-full sm:w-[calc(100%-300px)] flex flex-wrap justify-start sm:gap-5">
                        <ul className="w-1/2 sm:w-1/4 gap-2">
                            {
                                col_1.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} target="_blank" rel="noreferrer">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="w-1/2 sm:w-1/4 gap-2">
                            {
                                col_2.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} target="_blank" rel="noreferrer">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                        <ul className="w-1/2 sm:w-1/4 gap-2">
                            {
                                col_3.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item.link} target="_blank" rel="noreferrer">
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="w-[220px] mt-[40px] sm:mt-0">
                        <img
                            src="/images/logo/footer-logo.png"
                            alt="Footer Logo"
                            className="h-[48px] object-contain"
                        />
                        <div className="mt-4 flex justify-start social-links">
                            <Img src="/images/icons/social/facebook.svg"
                                 width={34} height={34} alt="Facebook"
                                 className="h-[34px] w-[34px] rounded-[50%]"/>
                            <Img src="/images/icons/social/instagram.svg"
                                 width={34} height={34} alt="Instagram"
                                 className="h-[34px] w-[34px]"/>
                            <Img src="/images/icons/social/linkedin.svg"
                                 width={34}
                                 height={34} alt="Linkedin"
                                 className="h-[34px] w-[34px] rounded-[50%]"/>
                            <Img src="/images/icons/social/youtube.svg"
                                 width={34}
                                 height={34} alt="Youtube"
                                 className="h-[34px] w-[34px] rounded-[50%]"/>
                            <Img src="/images/icons/social/tiktok.svg"
                                 width={34}
                                 height={34} alt="Tiktok"
                                 className="h-[34px] w-[34px] rounded-[50%]"/>
                        </div>
                        <div className={"my-5"}>
                            <p className={"font-inter font-bold text-white-a700 text-[12px] sm:text-[15px] sm:leading-[27px]"}>
                                © 2024 Q Egineering
                            </p>
                        </div>
                        <div>
                            <p className={"font-inter font-light text-white-a700 text-[12px] sm:text-[15px] sm:leading-[27px] cursor-pointer underline mb-4"}>
                                Политика использования
                            </p>
                            <p className={"font-inter font-light text-white-a700 text-[12px] sm:text-[15px] sm:leading-[27px] cursor-pointer underline"}>
                                Приватность
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>);
}