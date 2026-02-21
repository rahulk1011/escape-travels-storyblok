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
						<nav className='container mx-auto px-4 w-full py-8 flex justify-between'>
							<Link href={"/"}>Home</Link>
							<Link href={"/tours"}>Tours</Link>
						</nav>
					</header>
					{children}
				</body>
			</html>
		</StoryblokProvider>
	);
}