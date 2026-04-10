import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import { getStoryblokApi } from '../lib/storyblok';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import Breadcrumbs from '../components/global/Breadcrumb';
import { Amarante, Oregano } from 'next/font/google';

const amarante = Amarante({ subsets: ['latin'], display: 'swap', variable: '--font-amarante', weight: '400' });
const oregano = Oregano({ subsets: ['latin'], display: 'swap', variable: '--font-oregano', weight: '400' });
const fontVariables = [amarante.variable, oregano.variable].join(' ');

export const metadata = {
  title: 'Escape Travels',
  description: 'Explore India’s vibrant spirit through curated journeys.',
};

async function getHeaderData(lang = "default") {
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

async function getFooterData(lang = "default") {
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
  console.log(headerData);
  const footerData = await getFooterData();

	return (
		<html lang='en' className={fontVariables}>
			<body className='bg-white mx-auto max-w-[1920px]'>
				<StoryblokProvider>
					{headerData && <Header blok={headerData.content} />}
          <Breadcrumbs />
					{children}
					{footerData && <Footer blok={footerData.content} />}
				</StoryblokProvider>
			</body>
		</html>
	);
}