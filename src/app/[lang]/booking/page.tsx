"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, Suspense } from 'react';
import Link from 'next/link';

// German Translations (In Storyblok, these would come from the 'blok' content)
const i18n = {
  successTitle: "Buchung bestätigt!",
  successSub: "Vielen Dank, dass Sie sich für uns entschieden haben. Ihr Abenteuer beginnt bald!",
  bookingIdLabel: "Buchungsnummer",
  backHome: "Zurück zur Startseite",
  printReceipt: "Beleg drucken",
  formTitle: "Buchung abschließen",
  selectedCity: "Ausgewählte Stadt",
  selectedTour: "Ausgewählte Tour",
  pricePerPerson: "Preis pro Person",
  fullName: "Vollständiger Name",
  email: "E-Mail-Adresse",
  phone: "Telefonnummer",
  passengers: "Anzahl der Personen",
  total: "Gesamtbetrag",
  taxNote: "* Inklusive 12,5% MwSt. und Gebühren",
  processing: "Wird verarbeitet...",
  confirmBtn: "Buchung bestätigen",
  loading: "Ladevorgang...",
  errors: {
    email: "Ungültige E-Mail-Adresse.",
    phone: "Muss 10 Ziffern enthalten.",
    name: "Name ist erforderlich.",
    submit: "Fehler bei der Übermittlung der Buchung."
  }
};

const initialState = {
  name: '',
  email: '',
  phone: '',
  passengers: 1
};

function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const tourCity = searchParams.get('city') || i18n.selectedCity;
  const tourName = searchParams.get('name') || i18n.selectedTour;
  const unitPrice = parseFloat(searchParams.get('price') || "0");

  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const tourPrice = unitPrice * formData.passengers;
  const totalPrice = (tourPrice * 1.125).toFixed(2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const onlyNums = value.replace(/[^0-9]/g, "");
      if (onlyNums.length <= 10) setFormData((prev) => ({ ...prev, [name]: onlyNums }));
      return;
    }
    if (name === "passengers") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 1 }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = i18n.errors.email;
    if (formData.phone.length !== 10) newErrors.phone = i18n.errors.phone;
    if (!formData.name.trim()) newErrors.name = i18n.errors.name;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tourCity, tourName, totalPrice }),
      });
      const result = await response.json();
      if (response.ok) {
        setBookingId(result.bookingId);
        setFormData(initialState);
        setErrors({});
      }
    } catch (error) {
      alert(i18n.errors.submit);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-2xl min-h-[60vh] flex flex-col justify-center">
      {bookingId ? (
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{i18n.successTitle}</h1>
          <p className="text-gray-600 mb-8">{i18n.successSub}</p>
          
          <div className="bg-white border-2 border-dashed border-gray-200 p-6 rounded-xl mb-8 inline-block w-full max-w-sm">
            <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">{i18n.bookingIdLabel}</p>
            <p className="text-3xl font-mono font-bold text-rose-900">{bookingId}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/de" 
              className="bg-rose-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-rose-800 transition-all"
            >
              {i18n.backHome}
            </Link>
            <button 
              onClick={() => window.print()} 
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition-all"
            >
              {i18n.printReceipt}
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-rose-900 mb-6">{i18n.formTitle}</h1>
          
          <div className="bg-rose-50 p-6 rounded-lg mb-8 border border-rose-200">
            <h2 className="text-2xl font-semibold text-cyan-800 mb-4">{tourCity}</h2>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">{tourName}</h3>
            <p className="text-gray-600 font-medium">
              {i18n.pricePerPerson}: {unitPrice.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">{i18n.fullName}</label>
              <input 
                required 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange} 
                className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
              />
            </div>
            <div>
              <label className="block font-medium mb-1">{i18n.email}</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange} 
                className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
              />
            </div>
            <div>
              <label className="block font-medium mb-1">{i18n.phone}</label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange} 
                maxLength={10}
                className={`w-full p-2 border rounded ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} 
              />
            </div>
            <div>
              <label className="block font-medium mb-1">{i18n.passengers}</label>
              <input type="number" name="passengers" min="1" value={formData.passengers} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>

            <div className="pt-4 border-t flex justify-between items-center text-2xl font-bold text-rose-900">
              <span>{i18n.total}:</span>
              <span>{parseFloat(totalPrice).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</span>
            </div>
            <p className='text-sm text-gray-500 italic mb-4'>{i18n.taxNote}</p>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-3 text-white py-4 rounded-lg font-bold transition-all ${
                isSubmitting ? 'bg-rose-300' : 'bg-rose-900 hover:bg-rose-800'
              }`}
            >
              {isSubmitting ? i18n.processing : i18n.confirmBtn}
            </button>
          </form>
        </>
      )}
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">{i18n.loading}</div>}>
      <BookingForm />
    </Suspense>
  );
}