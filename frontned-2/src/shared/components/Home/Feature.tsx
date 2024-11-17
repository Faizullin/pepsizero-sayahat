import {
	ArrowRight,
	Globe,
	Heart,
	Maximize2,
	Minimize2,
	Send,
	Users,
	X,
} from 'lucide-react'
import { useState } from 'react'

const Feature = () => {
	// Move all hooks inside the component
	const [isOpen, setIsOpen] = useState(false)
	const [messages, setMessages] = useState([
		{ id: 1, text: 'Hello! How can I help you today?', sender: 'bot' },
	])
	const [inputMessage, setInputMessage] = useState('')
	const [isMinimized, setIsMinimized] = useState(false)

	const features = [
		{
			name: 'Dynamic Maps',
			description:
				'Our team of travel experts provides personalized recommendations and insider tips for your perfect journey.',
			icon: Users,
		},
		{
			name: 'Easy booking',
			description:
				'Discover destinations worldwide with our extensive network of trusted local partners and guides.',
			icon: Globe,
		},
		{
			name: 'AI Assistant',
			description:
				'We are dedicated to creating unforgettable experiences with attention to every detail of your trip.',
			icon: Heart,
		},
	]

	const handleSendMessage = (e: any) => {
		e.preventDefault()
		if (inputMessage.trim()) {
			setMessages([
				...messages,
				{ id: Date.now(), text: inputMessage, sender: 'user' },
			])
			setInputMessage('')
			// Simulate bot response
			setTimeout(() => {
				setMessages(prev => [
					...prev,
					{
						id: Date.now(),
						text: 'Thanks for your message! This is a demo response.',
						sender: 'bot',
					},
				])
			}, 1000)
		}
	}

	return (
		<div className='bg-white dark:bg-gray-900'>
			<div className='mx-auto container'>
				<div className='pt-16 sm:pt-20 lg:pt-24'>
					<div className='mx-auto max-w-4xl text-center'>
						<h2 className='text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400'>
							Why Choose Us
						</h2>
						<p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl'>
							Everything you need for the perfect journey
						</p>
					</div>
					<div className='mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-none'>
						<dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3'>
							{features.map(feature => (
								<div key={feature.name} className='flex flex-col'>
									<dt className='ml-32 flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white'>
										<feature.icon
											className='size-5 text-indigo-600 dark:text-indigo-400'
											aria-hidden='true'
										/>
										<h1 className='text-[32px]'>{feature.name}</h1>
									</dt>
									<dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400'>
										<p className='flex-auto'>{feature.description}</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>

				{/* AI Assistant */}
				<div className='mt-16 sm:mt-20 mb-12'>
					{/* Main CTA Section */}
					<div className='relative isolate overflow-hidden bg-indigo-600 shadow-2xl sm:rounded-3xl'>
						<div className='grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-indigo-600 /10'>
							<div className='flex items-center justify-center p-12 xl:p-16'>
								<div className='max-w-md text-center'>
									<h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
										Experience the power of AI assistance
									</h2>
									<p className='mt-4 text-lg leading-8 text-gray-300'>
										Our advanced AI chatbot is here to help you with any
										questions, providing instant, accurate responses and
										personalized support 24/7.
									</p>
								</div>
							</div>

							<div className='flex items-center justify-center p-12 xl:p-16'>
								<button
									onClick={() => setIsOpen(true)}
									className='inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-base font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors duration-200'
								>
									Start chat with bot
									<ArrowRight className='size-4' />
								</button>
							</div>
						</div>
					</div>

					{/* Chat Window */}
					{isOpen && (
						<div
							className={`fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl transition-all duration-200 ${
								isMinimized ? 'h-14' : 'h-[600px]'
							}`}
						>
							{/* Chat Header */}
							<div className='flex items-center justify-between p-4 border-b bg-indigo-600 text-white rounded-t-lg'>
								<h3 className='font-semibold'>AI Assistant</h3>
								<div className='flex gap-2'>
									<button
										onClick={() => setIsMinimized(!isMinimized)}
										className='p-1 hover:bg-indigo-700 rounded'
									>
										{isMinimized ? (
											<Maximize2 size={18} />
										) : (
											<Minimize2 size={18} />
										)}
									</button>
									<button
										onClick={() => setIsOpen(false)}
										className='p-1 hover:bg-indigo-700 rounded'
									>
										<X size={18} />
									</button>
								</div>
							</div>

							{!isMinimized && (
								<>
									{/* Messages Container */}
									<div className='h-[480px] overflow-y-auto p-4 space-y-4'>
										{messages.map(message => (
											<div
												key={message.id}
												className={`flex ${
													message.sender === 'user'
														? 'justify-end'
														: 'justify-start'
												}`}
											>
												<div
													className={`max-w-[80%] p-3 rounded-lg ${
														message.sender === 'user'
															? 'bg-indigo-600 text-white'
															: 'bg-gray-100 text-gray-900'
													}`}
												>
													{message.text}
												</div>
											</div>
										))}
									</div>

									{/* Input Form */}
									<form onSubmit={handleSendMessage} className='border-t p-4'>
										<div className='flex gap-2'>
											<input
												type='text'
												value={inputMessage}
												onChange={e => setInputMessage(e.target.value)}
												placeholder='Type your message...'
												className='flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600'
											/>
											<button
												type='submit'
												className='bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors'
											>
												<Send size={20} />
											</button>
										</div>
									</form>
								</>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Feature
