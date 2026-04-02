import './globals.css';
import StoryblokProvider from '../components/StoryblokProvider';
import { getStoryblokApi } from '../lib/storyblok';
import { Amarante } from 'next/font/google';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import Breadcrumb from "../components/global/Breadcrumb";

const amarante = Amarante({ subsets: ['latin'], display: 'swap', variable: '--font-amarante', weight: ['400'] });

export const metadata = {
  title: 'Escape Travels',
  description: 'Explore India’s vibrant spirit through curated journeys.',
};

// Accept 'lang' parameter to fetch localized global data
async function getHeaderData(lang = "default") {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get('cdn/stories/globals/header', {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      language: lang, // Storyblok handles the translation injection
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
      language: lang,
    });
    return data.story;
  } catch (error) {
    console.error("Footer data fetch failed:", error);
    return null;
  }
}

// Next.js Layouts receive 'params' as a prop
export default async function RootLayout({ children, params }) {
  // Await params to get the [lang] dynamic segment
  const { lang } = await params;
  const currentLang = lang || 'en';
  console.log(currentLang);

  const headerData = await getHeaderData(currentLang);
  const footerData = await getFooterData(currentLang);

  return (
    <html lang={currentLang} className={`${amarante.variable}`}>
      <body className='bg-white'>
        <StoryblokProvider>
          {/* We pass the blok data to the Header/Footer as usual */}
          {headerData && <Header blok={headerData.content} />}
          <Breadcrumb />
          {children}
          {footerData && <Footer blok={footerData.content} />}
        </StoryblokProvider>
      </body>
    </html>
  );
}