'use client'
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import React, {useMemo} from "react";
import Carousel from "@/components/home/carousel/Carousel";
import {Button} from "@/components/common";
import "./Home.scss"

import Blog1Img from "@public/images/home/blogs/Link.png"
import Blog2Img from "@public/images/home/blogs/Link-1.png"
import Blog3Img from "@public/images/home/blogs/Link-2.png"
import GalleryView from "@/components/home/gallery/GalleryView";
import {INews} from "@/lib/interfaces/INews";
import Link from "next/link";
import dynamic from "next/dynamic";


export default function Home() {
    const MapView = useMemo(() => dynamic(
        () => import('@/components/home/map/MapView'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])
    const news_data: INews[] = [
        {
            date: "August 7, 2024",
            title: "Q Engineering стал №1 компания по проектированию заводов"
        },
        {
            date: "August 5, 2024",
            title: "Интересные нововедения в проектах "
        },
    ]
    const preview_blogs: Array<{
        image: string;
    }> = [
        {
            image: Blog1Img.src,
        },
        {
            image: Blog2Img.src,
        },
        {
            image: Blog3Img.src,
        }
    ]
    return (
        <div className="home-page">
            <Header/>
            <main>
                <section className={"h-[420px]"}>
                    <Carousel/>
                </section>
                <section className={"py-[20px] sm:py-[40px]"}>
                    <div className="container px-4 sm:px-0">
                        <div className={"w-full flex flex-col sm:flex-row"}>
                            <div className="w-full sm:w-2/3 mb-[40px] sm:mb-0">
                                <div className={"mt-[25px]"}>
                                    <p className={"font-arial text-[25px] leading-[31pz]"}>
                                        Q Engineering – это признанный лидер в реализации промышленных проектов,
                                        сотрудничая
                                        с клиентами для решения самых сложных задач горнодобывающей отрасли и создания
                                        наследия для будущих поколений.
                                    </p>
                                </div>
                                <div className={"mt-[27px]"}>
                                    <Button
                                        variant={"outline"}
                                        className={"border-green-a700 rounded-full font-arial text-[17px] leading-[24px] text-teal-700 px-[40px] py-[7px]  transition-all duration-300 ease-in-out hover:bg-teal-700 hover:text-white-a700 hover:border-teal-700"}>
                                        О нас
                                    </Button>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/3 sm:pl-2">
                                <div className={"w-full"}>
                                    <h4 className={"font-inter text-[15px] leading-[30px] text-teal-900"}>Новости</h4>
                                    <div className={"w-full"}>
                                        {
                                            news_data.map((item, index) => (
                                                <div key={index}>
                                                    <p className={"font-inter font-light text-[15px] leading-[24px] text-black-900"}>{item.date}</p>
                                                    <Link href={"#"}>
                                                        <p
                                                            className={"font-inter font-light text-[16px] leading-[27px] text-green-a700"}>{item.title}</p>
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <GalleryView/>
                </section>
                <section className={"w-full sm:h-[640px] py-[20px] sm:py-[40px] "}>
                    <div className={"w-full h-full flex flex-col sm:flex-row"}>
                        <div className="w-full sm:w-1/2 sm:h-full hidden sm:block">
                            <div id={"locations-map"} className={"bg-gray-600 w-full h-full"}>
                                <MapView/>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 sm:h-full">
                            <div className={"w-full h-full px-[20px] sm:px-[70px] py-[40px] bg-gray-900_01"}>
                                <p className={"font-inter font-bold text-white-a700 text-[22px] leading-[32px]"}>
                                    Карьерные возможности
                                </p>
                                <div className={"w-full mt-[20px] sm:mt-[45px] mb-[15px] sm:mb-[30px]"}>
                                    <h3 className={"font-inter font-medium sm:font-extrabold text-white-a700 text-[30px] sm:text-[35px] leading-[50px]"}>
                                        В Q Engineering нас объединяет общая цель — создавать лучший мир
                                    </h3>
                                </div>
                                <p className={"font-inter text-white-a700 text-[22px] leading-[32px]"}>
                                    Присоединяйся к Q Engineering, чтобы работать над передовыми проектами в
                                    горнодобывающей и геологической отраслях, меняя будущее промышленности!
                                </p>
                                <div className={"w-full h-[48px] mt-[40px]"}>
                                    <div className={"w-full h-full px-1"}>
                                        <form action=""
                                              className={"w-full h-full sm:flex justify-between items-center"}>
                                            <div
                                                className={"w-full h-[38px] bg-white-a700 mr-5 flex justify-start items-center px-2 mb-3 sm:mb-0"}>
                                                <input type="text" className={"w-full font-inter outline-none "}/>
                                            </div>
                                            <Button
                                                variant={"outline"}
                                                className={"w-fit h-[38px] rounded-full font-arial text-[17px] leading-[24px] px-[40px] py-[7px] border-light_green-400 text-light_green-400 bg-transparent transition-all duration-300 ease-in-out hover:bg-light_green-400 hover:text-white-a700"}>
                                                Отправить
                                            </Button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id={"home-blogs-section"} className={" mb-[60px]"}>
                    <div className="w-100 flex flex-col sm:flex-row">
                        {

                            preview_blogs.map((item, index) => (
                                <div key={index} className={"blog-item"}>
                                    <img src={item.image} alt={item.image}/>
                                </div>
                            ))
                        }
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}