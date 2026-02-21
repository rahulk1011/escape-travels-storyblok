"use client";
import { StoryblokComponent } from '@storyblok/react/rsc';
import { storyblokEditable, StoryblokServerComponent } from '@storyblok/react/rsc';

const Grid = ({ blok }) => {
	return (
		<div {...storyblokEditable(blok)} className="grid-main bg-blue-100 py-16">
			<div className='container mx-auto w-full px-4'>
				<h2 className='text-3xl md:text-4xl font-bold'>{blok.headline}</h2>
				<div className='grid md:grid-flow-col auto-cols-fe mt-12 gap-8'>
					{blok.items.map((nestedBlok) => (
						<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Grid;
