import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

// We now accept 'lang' as an argument
const fetchHomePage = async (lang = "default") => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/home/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    resolve_relations: "recommended_tours.tours",
    language: lang, // Storyblok uses this to return the correct localization
  });
  return data.story;
};

// Next.js passes params (containing lang) to generateMetadata
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const story = await fetchHomePage(lang);
  
  return {
    title: story.content.meta_title + " | Escape Travels",
    description: story.content.meta_description,
  };
}

// The component receives the lang param from the URL
const HomePage = async ({ params }) => {
  const { lang } = await params;
  const story = await fetchHomePage(lang);
  
  return (
    <StoryblokServerComponent 
      blok={story.content} 
      key={story.content._uid} 
    />
  );
};

export default HomePage;