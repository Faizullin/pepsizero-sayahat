'use client';

import {FC, useEffect, useState} from 'react';
import Bg1Img from "@public/images/home/carousel/img1.png";
import {StaticImageData} from "next/image";

import {Swiper, SwiperSlide} from 'swiper/react';


import {Autoplay, Pagination} from "swiper/modules";
import {PaginationOptions} from "swiper/types";
import 'swiper/css';
import "./Carousel.scss";
import {ICarouselPageIndex} from "@/lib/interfaces/ICarouselPageIndex";


const images: Array<{
    image?: StaticImageData;
    title: string;
    text: string;
}> = [
    {
        image: Bg1Img,
        title: 'Эффективные решения для развития горнорудных проектов',
        text: 'Мы предлагаем комплексные решения от начала до конца в горнодобывающем секторе, обеспечивающие значимые результаты для наших клиентов.'
    },
    {
        image: Bg1Img,
        title: 'Эффективные решения для развития горнорудных проектов 2',
        text: 'Эффективные 2'
    },
    {
        title: 'Эффективные решения для развития горнорудных проектов 3',
        text: 'Эффективные 3'
    },
    {
        title: 'Эффективные решения для развития горнорудных проектов 4',
        text: 'Эффективные 4'
    },
    {
        title: 'Эффективные решения для развития горнорудных проектов 5',
        text: 'Эффективные 5'
    },
];
const pagination_labels: ICarouselPageIndex[] = [
    {
        value: 0,
        label: "Геология",
    },
    {
        value: 1,
        label: "горные работы",
    },
    {
        value: 2,
        label: "Перерабатывающие комплексы",
    },
    {
        value: 3,
        label: "Природоохранные мероприятия",
    },
    {
        value: 4,
        label: "Автоматизация   производств",
    },
];

const timeout = 12000;

const Carousel: FC = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    useEffect(() => {
        console.log("currentSlideIndex change to ", currentSlideIndex)
        const bulletsElList = document.querySelectorAll('.home-carousel .swiper-pagination-bullet');
        bulletsElList.forEach((bullet) => {
            const progressBar = bullet.querySelector('.progress-bar') as any;
            if (progressBar) {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'none'; // Reset transition
            }
        });
        const activeBulletEl = bulletsElList[currentSlideIndex];
        if (activeBulletEl) {
            const progressBarEl = activeBulletEl.querySelector('.progress-bar') as any;
            if (progressBarEl) {
                setTimeout(() => {
                    progressBarEl.style.transition = `width ${timeout}ms linear`;
                    progressBarEl.style.width = '100%';
                }, 100);
            }
        }
    }, [currentSlideIndex]);


    const pagination: PaginationOptions = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div id="swiper-pagination-bullet-${index}" class="${className}"><div class="progress-wrapper"><div class="progress-bar"></div><span>${pagination_labels[index]?.label}</span></div></div>`;
        },
        el: ".home-carousel .swiper-pagination",
    }
    return (
        <div className="home-carousel relative w-full h-full overflow-hidden">
            <Swiper
                slidesPerView={1}
                pagination={pagination}
                modules={[Pagination, Autoplay]}
                onSlideChange={(swiper) => {
                    setCurrentSlideIndex(swiper.activeIndex)
                }}
                className={"swiper"}
                autoplay={{
                    delay: timeout,
                    disableOnInteraction: false,
                }
            }
            >
                {
                    images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out`}
                            >
                                <img
                                    src={images[0].image?.src}
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute inset-0 flex flex-col justify-center items-start">
                                    <div className="container px-4 sm:px-0">
                                        <div className={"max-w-[90%] lg:max-w-[55%]"}>
                                            <h2 className="text-white-a700 font-regular sm:font-bold font-futurapt text-[34px] sm:text-[50px] sm:leading-[62px] mb-2 md:mb-4">
                                                {images[0].title}
                                            </h2>
                                            <p className="text-white-a700 font-inter font-normal text-[16px]">
                                                {images[0].text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                <div className={"swiper-pagination-wrapper"}>
                    <div className={"h-full"}>
                        <div className={"swiper-pagination h-full"}></div>
                    </div>
                </div>
            </Swiper>
        </div>
    );
};

export default Carousel;
