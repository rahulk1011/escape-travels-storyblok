import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchSitemapPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/sitemap/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

const SitemapPage = async () => {
  const story = await fetchSitemapPage();
  return <StoryblokStory story={story} />;
};

export default SitemapPage;