import { ArrowRight, Globe, Heart, Users } from 'lucide-react'

const features = [
	{
		name: 'Expert Guidance',
		description:
			'Our team of travel experts provides personalized recommendations and insider tips for your perfect journey.',
		icon: Users,
	},
	{
		name: 'Global Reach',
		description:
			'Discover destinations worldwide with our extensive network of trusted local partners and guides.',
		icon: Globe,
	},
	{
		name: 'Passionate Service',
		description:
			"We're dedicated to creating unforgettable experiences with attention to every detail of your trip.",
		icon: Heart,
	},
]

const Feature = () => {
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
									<dt className='flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white'>
										<feature.icon
											className='size-5 text-indigo-600 dark:text-indigo-400'
											aria-hidden='true'
										/>
										{feature.name}
									</dt>
									<dd className='mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400'>
										<p className='flex-auto'>{feature.description}</p>
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>
				<div className='mt-16 sm:mt-20 mb-12'>
					<div className='relative isolate overflow-hidden bg-indigo-600 px-6 py-12 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-16'>
						<h2 className='mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl'>
							Start your journey today
						</h2>
						<p className='mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300'>
							Join thousands of satisfied travelers who have discovered their
							perfect destinations with us.
						</p>
						<div className='mt-8 flex justify-center'>
							<a
								href='#'
								className='rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center gap-2'
							>
								Plan Your Trip
								<ArrowRight className='size-4' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feature
