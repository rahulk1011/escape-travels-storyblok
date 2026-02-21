import { getStoryblokApi } from "../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

export const generateStaticParams = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "tour",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return response.data.stories.map((story) => ({ slug: story.slug}));
}

const fetchTourPage = async (slug: string) => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/tours/${slug}`, {
    // version: "draft" or "published" based on your needs
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

const TourPage = async (props: { 
  params: Promise<{ slug: string }>; 
  searchParams: Promise<any> 
}) => {
  // 1. Await the params and searchParams from the Next.js props first
  const params = await props.params;
  const searchParams = await props.searchParams;

  // 2. Use the awaited slug to fetch the Storyblok data
  const story = await fetchTourPage(params.slug);

  return <StoryblokStory story={story} />;
};

export default TourPage;