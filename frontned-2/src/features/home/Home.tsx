import Carousel from '@/shared/components/Home/Carousel'
import Feature from '@/shared/components/Home/Feature'
import { FC } from 'react'
import './Home.scss'

const Home: FC = () => {
	return (
		<main className='home-page'>
			<section>
				<Carousel />
			</section>
			<section>
				<Feature />
			</section>
		</main>
	)
}

export default Home
