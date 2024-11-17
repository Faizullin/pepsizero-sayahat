import { PopoverGroup } from '@headlessui/react'
import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

import './Header.scss'

const callsToAction = [
	{ name: 'Watch demo', href: '#', icon: PlayCircleIcon },
	{ name: 'Contact sales', href: '#', icon: PhoneIcon },
]

export default function Header() {
	return (
		<header className='header'>
			<div className={'container mx-auto h-full  bg-black rounded-[17px]'}>
				<nav
					aria-label='Global'
					className='flex items-center justify-between h-full p-6 lg:px-8'
				>
					<div className='flex lg:flex-1'>
						<a href='#' className='-m-1.5 p-1.5'>
							<img
								alt=''
								src='/src/assets/logo.png'
								className='h-[50px] w-auto'
							/>
						</a>
					</div>
					<PopoverGroup className='hidden lg:flex lg:gap-x-12'>
						<a href='#' className='text-sm/6 font-semibold text-white'>
							Home
						</a>
						<a href='#' className='text-sm/6 font-semibold text-white'>
							Holidays
						</a>
						<a href='#' className='text-sm/6 font-semibold text-white'>
							Flights
						</a>
						<a href='#' className='text-sm/6 font-semibold text-white'>
							Contacts
						</a>
					</PopoverGroup>
					<div className='hidden lg:flex lg:flex-1 lg:justify-end'>
						<a href='#' className='text-sm/6 font-semibold text-white'>
							Log in <span aria-hidden='true'>&rarr;</span>
						</a>
					</div>
				</nav>
			</div>
		</header>
	)
}
