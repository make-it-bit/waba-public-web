import { NextResponse } from 'next/server';

import { createCheckout, getProductById } from '../../../../lib/shopify';

export const maxDuration = 180;

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const quantity = searchParams.get('quantity');
    if (!quantity || parseInt(quantity) < 1) throw new Error('Missing quantity');

    const shopifyProductData = await getProductById('gid://shopify/Product/8668620783962');

    const checkout = await createCheckout([
      {
        variantId: shopifyProductData.product.variants.edges[0].node.id,
        quantity: parseInt(quantity),
      },
    ]);

    return NextResponse.json(
      { message: 'Checkout URL created successfully', data: { URL: checkout.checkoutCreate.checkout.webUrl } },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
