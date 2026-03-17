import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchFAQPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/frequently-asked-questions/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

export async function generateMetadata() {
  const story = await fetchFAQPage();
  return {
    title: story.content.meta_title + " | Escape Travels",
    description: story.content.meta_description,
  };
}

const FAQPage = async () => {
  const story = await fetchFAQPage();
  return <StoryblokStory story={story} />;
};

export default FAQPage;