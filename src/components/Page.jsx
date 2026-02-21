"use client";
import { StoryblokComponent } from '@storyblok/react/rsc';
import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

const Page = ({ blok }) => (
	<main>
		{blok.block?.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</main>
);

export default Page;
