import { getStoryblokApi } from "../../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string; lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 1. Generate params for every tour in every language
export const generateStaticParams = async () => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "tour",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });

  // Define your supported languages
  const langs = ['en', 'de'];

  return response.data.stories.flatMap((story: any) => 
    langs.map((lang) => ({
      slug: story.slug,
      lang: lang,
    }))
  );
};

// 2. Pass 'lang' to the fetcher
const fetchTourPage = async (slug: string, lang: string) => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/tours/${slug}`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    language: lang, // Storyblok returns the translated content for this lang
  });
  return data.story;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const story = await fetchTourPage(slug, lang);

  return {
    title: `${story.content.meta_title} | Escape Travels` || "Escape Travels Tours",
    description: story.content.meta_description || "Wonderful City Tours",
  };
}

const TourPage = async (props: Props) => {
  const { slug, lang } = await props.params;
  const story = await fetchTourPage(slug, lang);

  return <StoryblokStory story={story} />;
};

export default TourPage;