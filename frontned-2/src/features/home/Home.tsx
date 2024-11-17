import {FC, useEffect, useState} from "react";

import Img1 from "@/assets/test/slide1.jpeg";
import "./Home.scss";

const Home: FC = () => {
    // useEffect(() => {
    //     console.log("currentSlideIndex change to ", currentSlideIndex)
    //     const bulletsElList = document.querySelectorAll('.home-carousel .swiper-pagination-bullet');
    //     bulletsElList.forEach((bullet) => {
    //         const progressBar = bullet.querySelector('.progress-bar') as any;
    //         if (progressBar) {
    //             progressBar.style.width = '0%';
    //             progressBar.style.transition = 'none'; // Reset transition
    //         }
    //     });
    //     const activeBulletEl = bulletsElList[currentSlideIndex];
    //     if (activeBulletEl) {
    //         const progressBarEl = activeBulletEl.querySelector('.progress-bar') as any;
    //         if (progressBarEl) {
    //             setTimeout(() => {
    //                 progressBarEl.style.transition = `width ${timeout}ms linear`;
    //                 progressBarEl.style.width = '100%';
    //             }, 100);
    //         }
    //     }
    // }, [currentSlideIndex]);

    const slides = [
        {
            img: Img1,
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
        },
        {
            img: Img1,
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
        },
        {
            img: Img1,
            author: 'LUNDEV',
            title: 'DESIGN SLIDER',
            topic: 'ANIMAL',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
        },
    ];
    const [sliderItems, setSliderItems] = useState<any[]>(slides);
    const [currentIndex, setCurrentIndex] = useState(0);

    const timeRunning = 3000;
    const timeAutoNext = 7000;

    // const nextSlide = () => {
    //     setSliderItems((prev) => {
    //         const newItems = [...prev];
    //         const firstItem = newItems.shift();
    //         if (firstItem) newItems.push(firstItem);
    //         return newItems;
    //     });
    //     setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
    // };
    //
    // const prevSlide = () => {
    //     setSliderItems((prev) => {
    //         const newItems = [...prev];
    //         const lastItem = newItems.pop();
    //         if (lastItem) newItems.unshift(lastItem);
    //         return newItems;
    //     });
    //     setCurrentIndex((prev) => (prev - 1 + sliderItems.length) % sliderItems.length);
    // };
    //
    // useEffect(() => {
    //     const autoNext = setInterval(nextSlide, timeAutoNext);
    //     return () => clearInterval(autoNext);
    // }, []);
    useEffect(() => {
        //step 1: get DOM
        let nextDom = document.getElementById('next');
        let prevDom = document.getElementById('prev');

        let carouselDom = document.querySelector('.carousel');
        let SliderDom = carouselDom.querySelector('.carousel .list');
        let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
        let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
        let timeDom = document.querySelector('.carousel .time');

        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        let timeRunning = 3000;
        let timeAutoNext = 7000;

        nextDom.onclick = function () {
            showSlider('next');
        }

        prevDom.onclick = function () {
            showSlider('prev');
        }
        let runTimeOut;
        let runNextAuto = setTimeout(() => {
            next.click();
        }, timeAutoNext)

        function showSlider(type) {
            let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
            let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

            if (type === 'next') {
                SliderDom.appendChild(SliderItemsDom[0]);
                thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
                carouselDom.classList.add('next');
            } else {
                SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
                thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
                carouselDom.classList.add('prev');
            }
            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carouselDom.classList.remove('next');
                carouselDom.classList.remove('prev');
            }, timeRunning);

            clearTimeout(runNextAuto);
            runNextAuto = setTimeout(() => {
                next.click();
            }, timeAutoNext)
        }
    }, []);
    return (
        <main className="home-page">
            {/*<section className={"hero-section"}>*/}
            {/*    <div className=''>*/}

            {/*        <img*/}
            {/*            src={slides[0].img}*/}
            {/*            alt=''*/}
            {/*            className='w-full h-full object-cover'*/}
            {/*        />*/}
            {/*        <div className={"container"}>*/}

            {/*        </div>*/}
            {/*        <div className='list absolute inset-0'>*/}
            {/*            {slides.map((slide, index) => (*/}
            {/*                <div*/}
            {/*                    className={`item absolute inset-0 ${*/}
            {/*                        index === 0 ? 'z-10' : 'hidden'*/}
            {/*                    }`}*/}
            {/*                    key={index}*/}
            {/*                >*/}
            {/*                    <div*/}
            {/*                        className='content absolute top-1/4 w-full max-w-4xl px-4 text-white left-1/2 transform -translate-x-1/2'>*/}
            {/*                        <div className='author uppercase tracking-wide'>*/}
            {/*                            {slide.author}*/}
            {/*                        </div>*/}
            {/*                        <div className='title text-5xl font-bold leading-snug'>*/}
            {/*                            {slide.title}*/}
            {/*                        </div>*/}
            {/*                        <div className='topic text-5xl font-bold text-orange-500'>*/}
            {/*                            {slide.topic}*/}
            {/*                        </div>*/}
            {/*                        <div className='des mt-4'>{slide.description}</div>*/}
            {/*                        <div className='buttons grid grid-cols-2 gap-4 mt-6'>*/}
            {/*                            <button className='bg-white text-black px-4 py-2 font-medium'>*/}
            {/*                                SEE MORE*/}
            {/*                            </button>*/}
            {/*                            <button className='border border-white text-white px-4 py-2'>*/}
            {/*                                SUBSCRIBE*/}
            {/*                            </button>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*</section>*/}

            <section className={"hero-section relative  !bg-orange-200"}>
                <div className="carousel">
                    <div className="list">
                        {sliderItems.map((item, index) => (
                            <div className={`item ${index === currentIndex ? "active" : ""}`} key={index}>
                                <img src={item.img} alt={item.title}/>
                                <div className="content">
                                    <div className="author">{item.author}</div>
                                    <div className="title">{item.title}</div>
                                    <div className="topic">{item.topic}</div>
                                    <div className="description">{item.description}</div>
                                    <div className="buttons">
                                        <button>SEE MORE</button>
                                        <button>SUBSCRIBE</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="arrows">
                        <button  id="prev">{"<"}</button>
                        <button  id="next">{">"}</button>
                    </div>
                    <div className="thumbnail">
                        {
                            sliderItems.map((item, index) => (

                                <div key={index} className="item">
                                    <img src={item.img}/>
                                    <div className="content">
                                        <div className="title">
                                            Name Slider
                                        </div>
                                        <div className="description">
                                            Description
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

export default Home;
