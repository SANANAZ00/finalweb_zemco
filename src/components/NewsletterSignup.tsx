// src/app/components/NewsletterSignup.tsx
export default function NewsletterSignup() {
    return (
      <section className="bg-pink-100 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay in the <span className="text-pink-600">Glow!</span>
          </h2>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter and be the first to hear about new collections and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  }
  