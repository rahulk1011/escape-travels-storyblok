"use client";
import { storyblokEditable } from '@storyblok/react/rsc';

const Testimonial = ({ blok }) => {
	return (
		<div {...storyblokEditable(blok)} className="testimonial-main bg-white p-8 rounded-sm shadow">
			<p className="text-xl leading-relaxed text-gray-700">{blok.comment}</p>
			<p className="text-lg font-semibold mt-6">{blok.name}</p>
		</div>
	);
};

export default Testimonial;
