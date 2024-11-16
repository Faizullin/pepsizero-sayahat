const Carousel = () => {
	const slides = [
		{
			img: '/src/assets/background.png',
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
		{
			img: '/src/assets/background.png',
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
		{
			img: '/src/assets/background.png',
			author: 'LUNDEV',
			title: 'DESIGN SLIDER',
			topic: 'ANIMAL',
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut sequi...',
		},
	]

	return (
		<div className='carousel relative overflow-hidden h-screen'>
			<div className='list absolute inset-0'>
				{slides.map((slide, index) => (
					<div
						className={`item absolute inset-0 ${
							index === 0 ? 'z-10' : 'hidden'
						}`}
						key={index}
					>
						<img
							src={slide.img}
							alt=''
							className='w-full h-full object-cover'
						/>
						<div className='content absolute top-1/4 w-full max-w-4xl px-4 text-white left-1/2 transform -translate-x-1/2'>
							<div className='author uppercase tracking-wide'>
								{slide.author}
							</div>
							<div className='title text-5xl font-bold leading-snug'>
								{slide.title}
							</div>
							<div className='topic text-5xl font-bold text-orange-500'>
								{slide.topic}
							</div>
							<div className='des mt-4'>{slide.description}</div>
							<div className='buttons grid grid-cols-2 gap-4 mt-6'>
								<button className='bg-white text-black px-4 py-2 font-medium'>
									SEE MORE
								</button>
								<button className='border border-white text-white px-4 py-2'>
									SUBSCRIBE
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Carousel
