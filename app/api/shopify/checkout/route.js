import { NextResponse } from 'next/server';
import { Logger } from 'next-axiom';

import { createCheckout, getProductById } from '../../../../lib/shopify';

export const maxDuration = 180;
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const log = new Logger();

  try {
    const searchParams = req.nextUrl.searchParams;
    const quantity = searchParams.get('quantity');
    if (!quantity || parseInt(quantity) < 1) {
      log.error('Checkout process failed. Missing product quantity.');
      throw new Error('Missing quantity');
    }

    const shopifyProductData = await getProductById('gid://shopify/Product/8668620783962');

    const checkout = await createCheckout([
      {
        variantId: shopifyProductData.product.variants.edges[0].node.id,
        quantity: parseInt(quantity),
      },
    ]);

    log.info('Checkout process in progress. Creating checkout URL.', {
      checkoutURL: checkout.checkoutCreate.checkout.webUrl,
    });
    await log.flush();
    return NextResponse.json(
      { message: 'Checkout URL created successfully', data: { URL: checkout.checkoutCreate.checkout.webUrl } },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    log.error('Checkout process failed.', { error: e.message });
    await log.flush();
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
