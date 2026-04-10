import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '../../lib/storyblok';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fullSlug = slug ? slug.join('/') : 'home';
  const storyblokApi = getStoryblokApi();

  try {
    const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });
    return {
      title: data.story.content.meta_title + ' | Escape Travels' || 'Escape Travels',
      description: data.story.content.meta_description || 'Explore the world with Escape Travels - your ultimate travel companion',
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return { title: 'Escape Travels' };
  }
}

export default async function Page({ params }) {
  const { slug } = await params;
  const fullSlug = slug ? slug.join('/') : 'home';
  const sbParams = {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    resolve_relations: "recommended_tours.tours",
  };

  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

  return <StoryblokStory story={data.story} />;
}