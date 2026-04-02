import { RecommendedTour } from "../../../components/RecommendedTour";
import { getStoryblokApi } from "../../../lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

// Accept 'lang' parameter (defaulting to 'en' or default Storyblok language)
const fetchToursPage = async (lang = "default") => {
  const client = getStoryblokApi();
  const { data } = await client.get(`cdn/stories/tours/`, {
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    language: lang, // This parameter fetches the translated fields
  });
  return data.story;
};

// Next.js passes 'params' which contains the [lang] segment
export async function generateMetadata({ params }) {
  const { lang } = await params;
  const story = await fetchToursPage(lang);
  return {
    title: (story.content.meta_title || "Tours") + " | Escape Travels",
    description: story.content.meta_description,
  };
}

const fetchAllTours = async (lang = "default") => {
  const client = getStoryblokApi();
  const response = await client.getStories({
    content_type: "tour",
    version: process.env.NODE_ENV === "development" ? "draft" : "published",
    language: lang, // This parameter fetches the translated fields
    sort_by: "name:asc",
  });
  return response.data.stories;
};

const ToursPage = async ({ params }) => {
  const { lang } = await params;
  const story = await fetchToursPage(lang);
  const tours = await fetchAllTours(lang);

  return (
    <div>
      <StoryblokStory story={story} />
      <div className="grid md:grid-cols-2 gap-8 container mx-auto px-4 w-full py-16">
        {tours.map((tour) => (
          <RecommendedTour story={tour} key={tour.content._uid} />
        ))}
      </div>
    </div>
  );
};

export default ToursPage;