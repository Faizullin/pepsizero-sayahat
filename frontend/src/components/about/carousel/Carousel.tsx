'use client';

import {FC} from 'react';
import Bg1Img from "@public/images/about/carousel/img1.png";
import {StaticImageData} from "next/image";

import {Swiper, SwiperSlide} from 'swiper/react';


import {Pagination} from "swiper/modules";
import {PaginationOptions} from "swiper/types";
import {ICarouselPageIndex} from "@/lib/interfaces/ICarouselPageIndex";
import 'swiper/css';
import "./Carousel.scss";


const images: Array<{
    image?: StaticImageData;
    title: string;
    text?: string;
}> = [
    {
        image: Bg1Img,
        title: 'О НАС',
    },
    {
        image: Bg1Img,
        title: 'Our purpose',
    },
];
const pagination_labels: ICarouselPageIndex[] = [
    {
        value: 0,
        label: "About us",
    },
    {
        value: 1,
        label: "Our purpose",
    },
];

const Carousel: FC = () => {
    const pagination: PaginationOptions = {
        clickable: true,
        renderBullet: function (index, className) {
            return `<div id="swiper-pagination-bullet-${index}" class="${className}"><div class="progress-wrapper"><div class="progress-bar"></div><span>${pagination_labels[index]?.label}</span></div></div>`;
        },
        el: ".about-carousel .swiper-pagination",
    }
    return (
        <div className="about-carousel relative w-full h-full overflow-hidden">
            <Swiper
                slidesPerView={1}
                pagination={pagination}
                modules={[Pagination]}
                className={"swiper"}
            >
                {
                    images.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out`}
                            >
                                <img
                                    src={item.image?.src}
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
