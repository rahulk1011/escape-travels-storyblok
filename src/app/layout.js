import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import { Amarante } from 'next/font/google';
import Header from '../components/Header';

const amarante = Amarante({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-amarante',
  weight: ['400']
});

export const metadata = {
  title: 'Escape Travels',
  description: 'Explore India’s vibrant spirit through curated journeys.',
};

export default function RootLayout({ children }) {
	const currentYear = new Date().getFullYear();

	return (
		<StoryblokProvider>
			<html lang="en" className={`${amarante.variable}`}>
				<body className='bg-blue-50'>
					<Header />
					{children}
					<footer className='p-4 bg-olive-800 flex'>
						<p className='text-xs font-semibold font-sans text-amber-50 mx-auto'>@Rahul Khan, <span suppressHydrationWarning>{currentYear}</span> - StoryBlok & NextJS</p>
					</footer>
				</body>
			</html>
		</StoryblokProvider>
	);
}