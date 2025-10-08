import React from 'react';
import products from '../../lib/products';
import dynamic from 'next/dynamic';

const StoreProduct = dynamic(() => import('../components/StoreProduct'), { ssr: false });

async function createCheckout(productId) {
  const res = await fetch('/api/square/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId })
  });
  const data = await res.json();
  return data;
}

export default function StorePage() {
  const onBuy = async (product) => {
    try {
      const data = await createCheckout(product.id);
      if (data && data.checkoutUrl) {
        // redirect to Square-hosted checkout
        window.location.href = data.checkoutUrl;
      } else {
        alert('Could not create checkout.');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating checkout. Check console.');
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(p => (
          <StoreProduct key={p.id} product={p} onBuy={onBuy} />
        ))}
      </div>
    </main>
  );
}
