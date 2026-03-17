import { getStoryblokApi } from "../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";

// Define the Props type for reusability
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateStaticParams = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "tour",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return response.data.stories.map((story: any) => ({ slug: story.slug }));
};

const fetchTourPage = async (slug: string) => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/tours/${slug}`, {
    // version: "draft" or "published" based on your needs
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

// Added params argument and awaited it
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchTourPage(slug);

  return {
    title: `${story.content.seo_metatag.title} | Escape Travels` || "Escape Travels Tours",
    description: story.content.seo_metatag.description || "Wonderful City Tours",
  };
}

const TourPage = async (props: Props) => {
  const { slug } = await props.params;
  const story = await fetchTourPage(slug);

  return <StoryblokStory story={story} />;
};

export default TourPage;