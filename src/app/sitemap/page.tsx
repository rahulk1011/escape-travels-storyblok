import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchSitemapPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/sitemap/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

export async function generateMetadata() {
  const story = await fetchSitemapPage();
 return {
    title: story.content.seo_metatag.title + " | Escape Travels",
    description: story.content.seo_metatag.description,
  };
}

const SitemapPage = async () => {
  const story = await fetchSitemapPage();
  return <StoryblokStory story={story} />;
};

export default SitemapPage;