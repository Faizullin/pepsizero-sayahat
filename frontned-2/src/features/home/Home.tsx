import Img1 from '@/assets/test/1.png'
import Img2 from '@/assets/test/2.png'
import Img3 from '@/assets/test/3.png'

import Feature from '@/shared/components/Home/Feature'
import { FC, useEffect, useState } from 'react'
import './Home.scss'

const Home: FC = () => {
	const slides = [
		{
			img: Img1,
			author: 'Akmola region',
			title: 'BURABAY',
			topic: 'Akmola region',
			description:
				'Nestled in the heart of Kazakhstan, Burabay is a breathtaking natural retreat known for its stunning landscapes, serene lakes, and majestic mountain ranges. Often referred to as the "Pearl of Kazakhstan," this region is a paradise for nature enthusiasts and adventure seekers alike. .',
		},
		{
			img: Img2,
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
		{
			img: Img3,
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
	]

	const slides2 = [
		{
			img: Img1,
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
		{
			img: Img2,
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
		{
			img: Img3,
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
	]

	const [sliderItems, setSliderItems] = useState<any[]>(slides)
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		//step 1: get DOM
		let nextDom = document.getElementById('next') as any
		let prevDom = document.getElementById('prev') as any

		let carouselDom = document.querySelector('.carousel') as any
		let SliderDom = carouselDom.querySelector('.carousel .list')
		let thumbnailBorderDom = document.querySelector('.carousel .thumbnail')
		let thumbnailItemsDom = thumbnailBorderDom
			? thumbnailBorderDom.querySelectorAll('.item')
			: []

		;(thumbnailBorderDom as any).appendChild(thumbnailItemsDom[0])
		let timeRunning = 3000

		;(nextDom as any).onclick = function () {
			showSlider('next')
		}

		prevDom.onclick = function () {
			showSlider('prev')
		}
		let runTimeOut: any
		// let runNextAuto = setTimeout(() => {
		//     next.click();
		// }, timeAutoNext)

		function showSlider(type: any) {
			let SliderItemsDom = (SliderDom as any).querySelectorAll(
				'.carousel .list .item'
			)
			let thumbnailItemsDom = document.querySelectorAll(
				'.carousel .thumbnail .item'
			)

			if (type === 'next') {
				;(SliderDom as any).appendChild(SliderItemsDom[0])
				;(thumbnailBorderDom as any).appendChild(thumbnailItemsDom[0])
				;(carouselDom as any).classList.add('next')
			} else {
				;(SliderDom as any).prepend(SliderItemsDom[SliderItemsDom.length - 1])
				;(thumbnailBorderDom as any).prepend(
					thumbnailItemsDom[thumbnailItemsDom.length - 1]
				)
				;(carouselDom as any).classList.add('prev')
			}
			clearTimeout(runTimeOut)
			runTimeOut = setTimeout(() => {
				;(carouselDom as any).classList.remove('next')
				;(carouselDom as any).classList.remove('prev')
			}, timeRunning)
		}
	}, [])
	return (
		<main className='home-page'>
			<section className={'hero-section relative  !bg-orange-200'}>
				<div className='carousel'>
					<div className='list'>
						{slides.map((item, index) => (
							<div
								className={`item ${index === currentIndex ? 'active' : ''}`}
								key={index}
							>
								<div className='image-container'>
									<img src={item.img} />
									<div></div>
								</div>
								<div className='content'>
									<div className='author'>{item.author}</div>
									<div className='title'>{item.title}</div>
									<div className='topic'>{item.topic}</div>
									<div className='description'>{item.description}</div>
									<div className='buttons'>
										<button>SEE MORE</button>
										<button>SUBSCRIBE</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className='arrows'>
						<button id='prev'>{'<'}</button>
						<button id='next'>{'>'}</button>
					</div>
					<div className='thumbnail'>
						{slides2.map((item, index) => (
							<div key={index} className='item'>
								<div className='image-container'>
									<img src={item.img} />
									<div></div>
								</div>
								<div className='content'>
									<div className='title'>Name Slider</div>
									<div className='description'>Description</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section>
				<Feature />
			</section>
		</main>
	)
}

export default Home
