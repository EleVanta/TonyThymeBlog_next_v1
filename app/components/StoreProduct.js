"use client";

import React from 'react';

export default function StoreProduct({ product, onBuy }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-xl font-bold">${(product.price_cents/100).toFixed(2)}</div>
        <button
          className="btn btn-primary"
          onClick={() => onBuy(product)}
        >
          Buy
        </button>
      </div>
    </div>
  );
}
