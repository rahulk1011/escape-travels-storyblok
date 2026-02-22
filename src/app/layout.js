import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import Link from 'next/link';

export const metadata = {
  title: 'Escape Travels',
  description: 'Explore India’s vibrant spirit through curated journeys.',
};

export default function RootLayout({ children }) {
	return (
		<StoryblokProvider>
			<html lang="en">
				<body className='bg-blue-50'>
					<header>
						<nav className='main-navigation mx-auto px-4 w-full py-8 flex justify-evenly bg-slate-800'>
							<Link className='text-xl font-sans font-bold text-sky-50' href={"/"}>Home</Link>
							<Link className='text-xl font-sanse font-bold text-sky-50' href={"/tours"}>Tours</Link>
						</nav>
					</header>
					{children}
				</body>
			</html>
		</StoryblokProvider>
	);
}