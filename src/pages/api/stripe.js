// Next js Stripe back-end - Stripe Checkout page
// Stripe works in 'test mode' - no real payments work in the app
import Stripe from 'stripe';

// Create Stripe Instance
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Get cartItems from front-end
    const cartItems = req.body;

    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: { allowed_countries: ['US', 'CA', 'GB', 'NO', 'SE', 'IE', 'DK', 'BE'] },
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 0, currency: 'usd'},
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 3},
                maximum: {unit: 'business_day', value: 7},
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: 1500, currency: 'usd'},
              display_name: 'Fast shipping',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 1},
                maximum: {unit: 'business_day', value: 3},
              },
            },
          },
        ],
        line_items: cartItems.map(item => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace('image-', 'https://cdn.sanity.io/images/sn2ngjrn/production/')
            .replace('-webp', '.webp');

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          }
        }),
        // Link to success page after confirm payment
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      // res.redirect(303, session.url);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
