'use client'
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React from "react";
import Carousel from "@/components/about/carousel/Carousel";
import AboutAccordion from "@/components/about/accordion/AboutAccordion";

import "./About.scss";

import img1 from "@public/images/about/bg1.png";

export default function About() {

    return (
        <div className="about-page w-full flex-1 overflow-x-scroll bg-white-a700">
            <Header/>
            <main className={"main w-full"}>
                <section className={"h-[420px]"}>
                    <Carousel/>
                </section>
                <section className={"py-[20px] sm:py-[40px]"}>
                    <div className="container">
                        <div className={"w-full flex flex-col sm:flex-row"}>
                            <div className="w-full sm:w-2/3 mb-[40px] sm:mb-0">
                                <div className={"mt-[25px]"}>
                                    <p className={"font-arial text-[24px] leading-[33px]"}>
                                        <strong>Q-Engineering Group</strong> – это команда профессионалов с большим
                                        опытом работы в
                                        области реализации промышленных проектов. Нашей главной задачей является
                                        принятие оптимальных, с точки зрения стоимости и практичности, проектных решений
                                        для заказчика и современное, качественное исполнение своих контрактных
                                        обязательств.
                                    </p>
                                </div>
                                <div className={"mt-[22px] mb-[32px]"}>
                                    <p className={"font-arial text-[24px] leading-[33px]"}>
                                        Мы занимаемся <strong>комплексным</strong> сопровождением проектов, включающее:
                                        предпроектные
                                        работы, проектирование, а также сопровождение строительства вплоть до запуска
                                        предприятия в эксплуатацию.
                                    </p>
                                </div>
                                <div>
                                    <AboutAccordion/>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/3 pl-4">
                                <div className={"w-full flex justify-end"}>
                                    <div className={"max-w-[370px] aspect-square"}>

                                        <img className={"w-full h-full"} src={img1.src} alt={img1.src}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}