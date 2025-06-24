"use client"
// src/app/components/NewsletterSignup.tsx
import { useState } from 'react';

export default function NewsletterSignup({ id }: { id?: string }) {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        // For demo: store in localStorage
        const emails = JSON.parse(localStorage.getItem('newsletterEmails') || '[]');
        emails.push(email);
        localStorage.setItem('newsletterEmails', JSON.stringify(emails));
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
      <section id={id} className="bg-pink-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay in the <span className="text-pink-600">Glow!</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to hear about new collections and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
          {success && <div className="mt-4 text-green-600 font-semibold">Thank you for subscribing!</div>}
        </div>
      </section>
    );
  }
  