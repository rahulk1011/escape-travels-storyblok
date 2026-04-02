import { getStoryblokApi } from "../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

// Accept 'lang' parameter (defaulting to 'en' or default Storyblok language)
const fetchAboutPage = async (lang = "default") => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/about-us/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    language: lang, // This parameter fetches the translated fields
  });
  return data.story;
};

// Next.js passes 'params' which contains the [lang] segment
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const story = await fetchAboutPage(lang);
  
  return {
    title: (story.content.meta_title || "About Us") + " | Escape Travels",
    description: story.content.meta_description,
  };
}

const AboutPage = async ({ params }) => {
  const { lang } = await params;
  const story = await fetchAboutPage(lang);

  return <StoryblokStory story={story} />;
};

export default AboutPage;