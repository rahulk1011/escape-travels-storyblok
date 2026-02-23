import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import Link from 'next/link';
import Image from 'next/image';
import siteLogo from "../assets/around-the-globe.png";

export const metadata = {
  title: 'Escape Travels',
  description: 'Explore India’s vibrant spirit through curated journeys.',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();

	return (
		<StoryblokProvider>
			<html lang="en">
				<body className='bg-blue-50'>
					<header className='main-navigation bg-slate-800 pt-4 pb-4 pl-8 pr-8 flex'>
						<div className='header-wrapper container'>
							<Image src={siteLogo} alt='travelling site logo' className='img-logo' />
							<nav className='nav-links'>
								<Link className='text-xl font-sans font-bold text-sky-50' href={"/"}>Home</Link>
								<Link className='text-xl font-sans font-bold text-sky-50' href={"/tours"}>Tours</Link>
							</nav>
						</div>
					</header>
					{children}
					<footer className='p-4 bg-olive-800 flex'>
						<p className='text-xs font-semibold font-sans text-amber-50 mx-auto'>@Rahul Khan, <span suppressHydrationWarning>{currentYear}</span> - StoryBlok & NextJS</p>
					</footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}