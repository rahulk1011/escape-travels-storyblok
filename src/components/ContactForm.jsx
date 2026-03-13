"use client";
import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';

export default function ContactForm({ blok }) {
  const [formData, setFormData] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// phone only numbers
		if (name === 'phone') {
			const numericValue = value.replace(/\D/g, '').slice(0, 10);
			setFormData({ ...formData, [name]: numericValue });
			return;
		}
		setFormData({ ...formData, [name]: value });
	};

  const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await fetch('/api/contact', {
				method: 'POST',
				body: JSON.stringify(formData),
			});
			setSubmitted(true);
		} catch (error) {
			console.error('Form submit error:', error);
		}

		setLoading(false);

		setTimeout(() => {
			setSubmitted(false);
			setFormData({});
			e.target.reset();
		}, 3000);
	};

  return (
		<section {...storyblokEditable(blok)} className="container mx-auto max-w-4xl min-h-96 px-4 mb-12">
      {submitted && (
        <div className="bg-green-300 p-4 mb-6 border-2 border-solid border-teal-700 rounded-xl text-lg">
          {blok.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="contact-form border-2 border-solid border-teal-700 rounded-xl p-8">
        {blok.form_fields?.map((field) => {
          return (
            <div key={field._uid} className="flex flex-col mb-4">
              <label className='text-xl mb-2'>{field.label}</label>
              <input type={field.type} onChange={handleChange} name={field.name} className='border-2 border-solid border-teal-900 rounded-md p-2 bg-white' />
            </div>
          );
        })}
        <button type="submit" className="text-xl bg-teal-300 px-4 py-2 border-2 border-solid border-teal-900 rounded-xl mt-4 cursor-pointer hover:bg-teal-700 hover:text-white transition-colors duration-300 ease-in-out">
          {blok.button_label}
        </button>
      </form>
		</section>
	);
}
