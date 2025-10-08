import { NextResponse } from 'next/server';
import products from '../../../../lib/products';

// This implementation calls Square's Payment Links API directly using fetch
// to avoid adding the Square SDK as a dependency. It creates a payment link
// for a single-line order and returns the link URL.

export async function POST(req) {
  const body = await req.json();
  const { productId } = body || {};

  if (!productId) return NextResponse.json({ error: 'productId required' }, { status: 400 });

  const product = products.find(p => p.id === productId);
  if (!product) return NextResponse.json({ error: 'product not found' }, { status: 404 });

  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  if (!accessToken || !locationId) {
    return NextResponse.json({ error: 'Square credentials not configured' }, { status: 500 });
  }

  const env = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';
  const baseUrl = env === 'production' ? 'https://connect.squareup.com' : 'https://connect.squareupsandbox.com';

  const idempotencyKey = `${product.id}-${Date.now()}`;

  const payload = {
    idempotency_key: idempotencyKey,
    order: {
      location_id: locationId,
      line_items: [
        {
          name: product.name,
          quantity: '1',
          base_price_money: {
            amount: product.price_cents,
            currency: product.currency || 'USD'
          }
        }
      ]
    },
    checkout_options: {
      redirect_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/store/thank-you`
    }
  };

  try {
    const res = await fetch(`${baseUrl}/v2/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!res.ok) {
      console.error('Square API error', data);
      return NextResponse.json({ error: 'square api error', detail: data }, { status: 500 });
    }

    // payment_link.url is the public URL for the checkout
    const url = data?.payment_link?.url || data?.payment_link?.checkout_url || null;
    if (!url) {
      console.error('Square returned no payment link', data);
      return NextResponse.json({ error: 'no payment link returned', detail: data }, { status: 500 });
    }

    return NextResponse.json({ checkoutUrl: url });
  } catch (err) {
    console.error('create-checkout exception', err);
    return NextResponse.json({ error: 'failed to create checkout', detail: String(err) }, { status: 500 });
  }
}
