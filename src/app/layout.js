import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import { Amarante } from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
	return (
		<StoryblokProvider>
			<html lang="en" className={`${amarante.variable}`}>
				<body className='bg-blue-50'>
					<Header />
					{children}
					<Footer />
				</body>
			</html>
		</StoryblokProvider>
	);
}