import { getStoryblokApi } from "../lib/storyblok";
import { StoryblokServerComponent } from "@storyblok/react/rsc";
import { draftMode } from "next/headers";

const fetchHomePage = async () => {
  const { isEnabled } = draftMode();
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/home/`, {
    version: process.env.NODE_ENV === "development" || isEnabled ? "draft" : "published",
    resolve_relations: "recommended_tours.tours",
  });
  return data.story;
};


const HomePage = async () => {
  const story = await fetchHomePage();
  return <StoryblokServerComponent blok={story.content} key={story.content._uid} />;
};

export default HomePage;