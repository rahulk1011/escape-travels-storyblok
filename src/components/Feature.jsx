"use client";

const Feature = ({ blok }) => {
	return (
		<div className="feature-main bg-white p-8 rounded-sm shadow">
			<h3 className="font-bold text-3xl">{blok.headline}</h3>
			<p className="mt-6 text-lg">{blok.content}</p>
		</div>
	);
};

export default Feature;
