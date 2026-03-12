'use client';

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
		<section {...storyblokEditable(blok)} className="contact-section">
			{' '}
			<div className="contact-container">
				<div className="contact-header">
					<h2>{blok.title}</h2>
					<p>{blok.description}</p>
				</div>

				{submitted && (
					<div className="contact-success">
						{blok.success_message || '✔ Message sent successfully'}
					</div>
				)}

				<form onSubmit={handleSubmit} className="contact-form">
					{blok.fields?.map((field) => {
						const isRequired = field.name === 'name' || field.name === 'email';

						if (field.type === 'textarea') {
							return (
								<div key={field._uid} className="form-group">
									<label>
										{field.label}
										{isRequired && <span className="required">*</span>}
									</label>

									<textarea
										name={field.name}
										placeholder={field.placeholder || field.label}
										onChange={handleChange}
										required={isRequired}
									/>
								</div>
							);
						}

						if (field.name === 'phone') {
							return (
								<div key={field._uid} className="form-group">
									<label>{field.label}</label>

									<input
										type="tel"
										name="phone"
										value={formData.phone || ''}
										placeholder="Enter 10 digit mobile number"
										pattern="^[6-9]\d{9}$"
										inputMode="numeric"
										onChange={handleChange}
										title="Enter valid 10 digit mobile number starting with 6-9"
									/>
								</div>
							);
						}

						if (field.name === 'email') {
							return (
								<div key={field._uid} className="form-group">
									<label>
										{field.label}
										<span className="required">*</span>
									</label>

									<input
										type="email"
										name="email"
										placeholder="example@email.com"
										required
										pattern="^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
										onChange={handleChange}
										title="Enter a valid email address"
									/>
								</div>
							);
						}

						return (
							<div key={field._uid} className="form-group">
								<label>
									{field.label}
									{isRequired && <span className="required">*</span>}
								</label>

								<input
									type={field.type}
									name={field.name}
									placeholder={field.placeholder || field.label}
									onChange={handleChange}
									required={isRequired}
								/>
							</div>
						);
					})}

					<button type="submit" className="contact-btn" disabled={loading}>
						{loading ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</section>
	);
}
