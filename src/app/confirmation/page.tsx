'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  useEffect(() => {
    // Clear cart from localStorage after successful "order"
    localStorage.removeItem('cart');
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-gray-50">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank you for your order!</h1>
      <p className="text-gray-600 mb-6">
        Your items will be delivered soon. A confirmation email has been sent to your inbox.
      </p>

      <Link
        href="/"
        className="px-6 py-2 bg-pink-600 text-white rounded-lg font-medium hover:bg-pink-700 transition"
      >
        Continue Shopping
      </Link>
    </section>
  );
}
