import { useCallback, useEffect, useState } from 'react'

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	const slidesMain = [
		{
			image: '/src/assets/carousel/burabay.png',
			title: 'Burabay',
			region: 'Akmola region',
			description:
				'Nestled in the heart of Kazakhstan, Burabay is a breathtaking natural retreat known for its stunning landscapes, serene lakes, and majestic mountain ranges. Often referred to as the "Pearl of Kazakhstan," this region is a paradise for nature enthusiasts and adventure seekers alike. ',
		},
		{
			image: '/src/assets/carousel/charyn.png',
			title: 'Charyn',
			region: 'Almaty region',
			description:
				'Nestled in the heart of Kazakhstan, Burabay is a breathtaking natural retreat known for its stunning landscapes, serene lakes, and majestic mountain ranges. Often referred to as the "Pearl of Kazakhstan," this region is a paradise for nature enthusiasts and adventure seekers alike. ',
		},
		{
			image: '/src/assets/carousel/alakol.png',
			title: 'Alakol',
			region: 'ANIMAL',
			description:
				'Nestled in the heart of Kazakhstan, Burabay is a breathtaking natural retreat known for its stunning landscapes, serene lakes, and majestic mountain ranges. Often referred to as the "Pearl of Kazakhstan," this region is a paradise for nature enthusiasts and adventure seekers alike. ',
		},
	]
	const nextSlide = useCallback(() => {
		if (!isAnimating) {
			setIsAnimating(true)
			setCurrentIndex(prev => (prev + 1) % slidesMain.length)
			setTimeout(() => setIsAnimating(false), 1000) // Ensure the animation completes
		}
	}, [isAnimating, slidesMain.length])

	const prevSlide = useCallback(() => {
		if (!isAnimating) {
			setIsAnimating(true)
			setCurrentIndex(
				prev => (prev - 1 + slidesMain.length) % slidesMain.length
			)
			setTimeout(() => setIsAnimating(false), 1000) // Ensure the animation completes
		}
	}, [isAnimating, slidesMain.length])

	useEffect(() => {
		const interval = setInterval(nextSlide, 1000000)
		return () => clearInterval(interval)
	}, [nextSlide])

	return (
		<div className='h-screen bg-black text-white font-sans relative overflow-hidden'>
			{/* Slide Container */}
			<div className='relative h-full flex items-center justify-center'>
				<div
					className='absolute w-full h-full flex transition-transform duration-1000 ease-in-out'
					style={{
						transform: `translateX(${-currentIndex * 100}%)`,
					}}
				>
					{slidesMain.map((slide, index) => (
						<div
							key={index}
							className='flex-shrink-0 w-full h-full relative'
							style={{ flexBasis: '100%' }}
						>
							<img
								src={slide.image}
								alt={`Slide ${index}`}
								className='w-full h-full object-cover'
							/>
							<div className='absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[80%] max-w-[1140px] text-center'>
								<div className='text-7xl font-bold leading-tight'>
									{slide.title}
								</div>
								<div className='text-5xl font-bold leading-tight text-[#4F46E5]'>
									{slide.region}
								</div>
								<p className='mt-4 text-3xl'>{slide.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Thumbnails */}
			<div className='absolute bottom-[50px] left-1/2 transform -translate-x-1/2 z-10 flex gap-5'>
				{slidesMain.map((slide, index) => (
					<div
						key={index}
						className={`w-[100px] h-[150px] rounded-md overflow-hidden cursor-pointer ${
							currentIndex === index
								? 'border-4 border-[#4F46E5] scale-110'
								: 'scale-100'
						} transition-transform duration-300`}
						onClick={() => setCurrentIndex(index)}
					>
						<img
							src={slide.image}
							alt={`Thumbnail ${index}`}
							className='w-full h-full object-cover'
						/>
					</div>
				))}
			</div>

			{/* Navigation Buttons */}
			<div className='absolute top-[50%] left-0 transform -translate-y-1/2 z-10'>
				<button
					onClick={prevSlide}
					className='bg-white text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors'
				>
					{'<'}
				</button>
			</div>
			<div className='absolute top-[50%] right-0 transform -translate-y-1/2 z-10'>
				<button
					onClick={nextSlide}
					className='bg-white text-black w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors'
				>
					{'>'}
				</button>
			</div>
		</div>
	)
}

export default Carousel
