import './App.css'
import Carousel from './components/Carousel'
import Footer from './components/common/Footer'
import Header from './components/common/Header'

function App() {
	return (
		<>
			<div className='flex flex-col min-h-screen'>
				<Header />
				<Carousel />
				<Footer />
			</div>
		</>
	)
}

export default App
