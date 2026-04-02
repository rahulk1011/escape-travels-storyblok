import { getStoryblokApi } from "../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

// Accept 'lang' parameter (defaulting to 'en' or default Storyblok language)
const fetchFAQPage = async (lang = "default") => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/frequently-asked-questions/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    language: lang, // This parameter fetches the translated fields
  });
  return data.story;
};

// Next.js passes 'params' which contains the [lang] segment
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const story = await fetchFAQPage(lang);

  return {
    title: (story.content.meta_title || "Frequently Asked Questions") + " | Escape Travels",
    description: story.content.meta_description,
  };
}

const FAQPage = async ({ params }) => {
  const { lang } = await params;
  const story = await fetchFAQPage(lang);

  return <StoryblokStory story={story} />;
};

export default FAQPage;