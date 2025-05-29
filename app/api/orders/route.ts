import { createOrder as createStrapiOrder } from '@/lib/strapi';
import { NextResponse } from 'next/server';
import type { OrderData } from '@/lib/strapi';

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json();

    if (!orderData) {
      return NextResponse.json(
        { success: false, error: 'No order data provided' },
        { status: 400 }
      );
    }

    const result = await createStrapiOrder(orderData);
    
    if (!result) {
      return NextResponse.json(
        { success: false, error: 'No response from Strapi' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: result.data.id,
      orderData: {
        first_name: result.data.attributes.first_name,
        last_name: result.data.attributes.last_name,
        phone: result.data.attributes.phone,
        email: result.data.attributes.email,
        address: result.data.attributes.address,
        amount: result.data.attributes.amount
      }
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create order' 
      },
      { status: 500 }
    );
  }
} 