import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchFAQPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/frequently-asked-questions/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

const FAQPage = async () => {
  const story = await fetchFAQPage();
  return <StoryblokStory story={story} />;
};

export default FAQPage;