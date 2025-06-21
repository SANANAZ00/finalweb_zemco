// src/app/components/Navbar.tsx
'use client'
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '#categories' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }, []);

  useEffect(() => {
    function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    }
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Disclosure as="nav" className="bg-white/60 backdrop-blur-md sticky top-0 z-50 shadow-lg transition">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image src="/zem_logo.jpg" alt="Zem Logo" width={40} height={40} />
                <span className="ml-2 font-bold text-pink-600 text-lg">Zem Collections</span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 items-center">
                {navigation.map((item) => (
                  item.href.startsWith('#') ? (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={e => handleScroll(e, item.href)}
                      className={`relative text-gray-700 hover:text-pink-600 transition font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-pink-400 after:content-[''] after:block after:h-0.5 after:bg-pink-600 after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === '/' && item.href === '#categories' ? 'text-pink-600 font-bold after:scale-x-100' : ''}`}
                      tabIndex={0}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative text-gray-700 hover:text-pink-600 transition font-medium outline-none focus-visible:ring-2 focus-visible:ring-pink-400 after:content-[''] after:block after:h-0.5 after:bg-pink-600 after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === item.href ? 'text-pink-600 font-bold after:scale-x-100' : ''}`}
                      tabIndex={0}
                    >
                      {item.name}
                    </Link>
                  )
                ))}
                <button
                  className="relative ml-4 p-2 rounded-full hover:bg-pink-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  onClick={() => setCartOpen(true)}
                  aria-label="Open cart"
                >
                  <ShoppingCartIcon className="h-6 w-6 text-pink-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  className="relative p-2 rounded-full hover:bg-pink-200 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                  onClick={() => setCartOpen(true)}
                  aria-label="Open cart"
                >
                  <ShoppingCartIcon className="h-6 w-6 text-pink-600" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:text-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
                  {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden px-4 pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                item.href.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={e => handleScroll(e, item.href)}
                    className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-pink-200 hover:text-pink-700 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-pink-400 after:content-[''] after:block after:h-0.5 after:bg-pink-600 after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                    tabIndex={0}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-pink-200 hover:text-pink-700 outline-none focus-visible:ring-2 focus-visible:ring-pink-400 after:content-[''] after:block after:h-0.5 after:bg-pink-600 after:scale-x-0 hover:after:scale-x-100 focus:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left ${pathname === item.href ? 'text-pink-600 font-bold after:scale-x-100' : ''}`}
                    tabIndex={0}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </Disclosure.Panel>

          {/* Cart Drawer */}
          {cartOpen && (
            <CartDrawer onClose={() => setCartOpen(false)} />
          )}
        </>
      )}
    </Disclosure>
  );
}

// CartDrawer component
function CartDrawer({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState<any[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Always fetch latest cart when drawer opens
  useEffect(() => {
    function fetchCart() {
      try {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(cartData);
        setStorageError(null);
        console.log('CartDrawer cart:', cartData);
        console.log('CartDrawer rendering - cart items:', cartData);
      } catch (err) {
        setStorageError('Could not access localStorage.');
        setCart([]);
        console.error('CartDrawer localStorage error:', err);
      }
    }
    fetchCart();
    window.addEventListener('cartUpdated', fetchCart);
    return () => window.removeEventListener('cartUpdated', fetchCart);
  }, []);

  const removeFromCart = (index: number) => {
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      currentCart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(currentCart));
      setCart(currentCart);
      window.dispatchEvent(new Event('cartUpdated'));
    } catch (err) {
      setStorageError('Could not update localStorage.');
      console.error('CartDrawer remove error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      {/* Drawer */}
      <div className="ml-auto w-full max-w-md h-screen bg-white shadow-lg p-6 flex flex-col relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-pink-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close cart"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="flex-1 text-gray-600 text-center flex items-center justify-center">Your cart is empty.</p>
        ) : (
          <div className="flex-1 overflow-y-auto p-2 bg-white">
            {cart.map((item, index) => {
              console.log('Rendering cart item:', item, index);
              return (
              <div key={index} className="flex items-center gap-4 p-4 mb-3 bg-white rounded-lg shadow-md border border-gray-200">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-700 transition text-xl font-bold"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  &times;
                </button>
              </div>
              );
            })}
          </div>
        )}
        {cart.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">Total:</span>
            <span className="text-lg font-bold text-pink-600">${cart.reduce((sum, item) => sum + (parseFloat(item.price.replace(/[^\d.-]/g, '')) || 0), 0).toFixed(2)}</span>
          </div>
        )}
        <button
          className="mt-auto w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          onClick={onClose}
        >
          Checkout
        </button>
      </div>
      <style jsx>{`
        .animate-slide-in-right {
          animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}


