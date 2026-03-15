import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import { getStoryblokApi } from '../lib/storyblok';
import { Amarante } from 'next/font/google';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';

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

// Function to fetch the global header story data
async function getHeaderData() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/globals/header', {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.error("Header data fetch failed:", error);
    return null;
  }
}

async function getFooterData() {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/globals/footer', {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return data.story;
  } catch (error) {
    console.error("Footer data fetch failed:", error);
    return null;
  }
}

export default async function RootLayout({ children }) {
  const headerData = await getHeaderData();
	const footerData = await getFooterData();
	return (
		<html lang="en" className={`${amarante.variable}`}>
			<body className='bg-blue-50'>
				<StoryblokProvider>
          {/* Dynamic Storyblok Header */}
          {headerData && <Header blok={headerData.content} />}
          {children}
          {/* Dynamic Storyblok Footer */}
          {footerData && <Footer blok={footerData.content} />}
				</StoryblokProvider>
			</body>
		</html>
	);
}