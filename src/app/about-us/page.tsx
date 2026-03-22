import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchAboutPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/about-us/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

export async function generateMetadata() {
  const story = await fetchAboutPage();
  return {
    title: story.content.meta_title + " | Escape Travels",
    description: story.content.meta_description,
  };
}

const AboutPage = async () => {
  const story = await fetchAboutPage();
  return <StoryblokStory story={story} />;
};

export default AboutPage;