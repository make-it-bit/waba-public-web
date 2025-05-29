import { NextResponse } from 'next/server';
import crypto from 'crypto';

function verifySignature(data: any, signature: string, signatureKey: string): boolean {
  const stringToVerify = JSON.stringify(data);
  const expectedSignature = crypto
    .createHmac('sha256', signatureKey)
    .update(stringToVerify)
    .digest('hex');
  
  return signature === expectedSignature;
}

export async function POST(request: Request) {
  try {
    if (!process.env.MODENA_SIGNATURE_KEY) {
      throw new Error('Missing Modena signature key');
    }

    const signature = request.headers.get('X-Signature');
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    const body = await request.json();
    
    // Verify the signature
    const isValid = verifySignature(body, signature, process.env.MODENA_SIGNATURE_KEY);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Log the callback data
    console.log('Modena callback data:', body);
    
    // Handle the payment status
    // You should implement your own logic here to update the order status
    // based on the payment status received from Modena
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Modena callback error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 