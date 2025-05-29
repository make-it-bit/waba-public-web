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
    
    const isValid = verifySignature(body, signature, process.env.MODENA_SIGNATURE_KEY);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    console.log('Modena callback data:', body);
    
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