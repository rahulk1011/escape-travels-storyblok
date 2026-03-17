import { getStoryblokApi } from "../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

const fetchContactPage = async () => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/contact-us/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
  });
  return data.story;
};

export async function generateMetadata() {
  const story = await fetchContactPage();
  return {
    title: story.content.seo_metatag.title + " | Escape Travels",
    description: story.content.seo_metatag.description,
  };
}

const ContactPage = async () => {
  const story = await fetchContactPage();
  return <StoryblokStory story={story} />;
};

export default ContactPage;