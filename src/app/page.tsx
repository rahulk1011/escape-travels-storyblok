import { getStoryblokApi } from "../lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";

const fetchHomePage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/home/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    resolve_relations: "recommended_tours.tours",
  });
  return data.story;
};


const HomePage = async () => {
  const story = await fetchHomePage();
  return <StoryblokServerComponent blok={story.content} key={story.content._uid} />;
};

export default HomePage;