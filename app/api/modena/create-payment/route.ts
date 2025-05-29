import { NextResponse } from 'next/server';
import crypto from 'crypto';

function generateSignature(data: any, signatureKey: string): string {
  const stringToSign = JSON.stringify(data);
  return crypto
    .createHmac('sha256', signatureKey)
    .update(stringToSign)
    .digest('hex');
}

export async function POST(request: Request) {
  try {
    if (!process.env.MODENA_SIGNATURE_KEY) {
      throw new Error('Missing Modena signature key');
    }

    const body = await request.json();
    const { access_token, orderData } = body;

    if (!access_token || !orderData) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const signature = generateSignature(orderData, process.env.MODENA_SIGNATURE_KEY);

    const response = await fetch(`${process.env.MODENA_API_URL}/modena/api/merchant/slice-payment-order`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
        'X-Modena-Signature': signature
      },
      body: JSON.stringify(orderData),
      redirect: 'manual' 
    });

    if (response.status === 302) {
      const location = response.headers.get('Location');
      if (!location) {
        throw new Error('No redirect location provided in 302 response');
      }
      return NextResponse.json({ 
        redirectUrl: location,
        status: 'redirect',
        message: 'Redirecting to Modena onboarding flow'
      });
    }

    const text = await response.text();
    if (!text) {
      throw new Error('Empty response from Modena payment');
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Invalid JSON response from Modena payment');
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: data.message || 'Payment creation failed',
          details: data,
          technicalDetails: {
            status: response.status,
            statusText: response.statusText
          }
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Modena payment creation error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to create payment',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 