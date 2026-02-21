import Page from "../components/Page";
import Feature from "../components/Feature";
import Grid from "../components/Grid";
import Teaser from "../components/Teaser";
import Tour from "../components/Tour";
import Hero from "../components/Hero";
import Testimonial from "../components/Testimonial";
import RecommendedTours from "../components/RecommendedTours";
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// 1. Define your caching utility
const cachedFetch = (input, init) => {
  return fetch(input, {
    ...init,
    // Note: Storyblok uses "cv" (cache version) in the URL. This logic ensures development stays fresh while production is fast.
    cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    // Optional: add Next.js specific revalidation tags
    next: { tags: ['storyblok'] } 
  });
};

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		tour: Tour,
		hero: Hero,
		testimonial: Testimonial,
		recommended_tours: RecommendedTours,
	},
	apiOptions: {
		fetch: cachedFetch,
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
