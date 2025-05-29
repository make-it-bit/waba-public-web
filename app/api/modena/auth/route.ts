import { NextResponse } from 'next/server';

export async function POST() {
  try {
    if (!process.env.MODENA_CLIENT_ID || !process.env.MODENA_CLIENT_SECRET) {
      throw new Error('Missing Modena credentials');
    }

    // Check for common formatting issues
    if (process.env.MODENA_CLIENT_ID?.includes(' ')) {
      console.warn('Client ID contains spaces');
    }
    if (process.env.MODENA_CLIENT_SECRET?.includes(' ')) {
      console.warn('Client Secret contains spaces');
    }

    const authString = btoa(`${process.env.MODENA_CLIENT_ID}:${process.env.MODENA_CLIENT_SECRET}`);
    
    const response = await fetch(`${process.env.MODENA_AUTH_URL}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'slicepayment',
      })
    });


    // Check if the response is empty
    const text = await response.text();
    if (!text) {
      throw new Error('Empty response from Modena auth');
    }

    // Try to parse the response as JSON
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('Failed to parse Modena auth response:', text);
      throw new Error('Invalid JSON response from Modena auth');
    }

    if (response.status === 401) {
      console.error('Modena auth 401 error details:', data);
      
      // Provide more specific error messages based on the error type
      let errorMessage = 'Authentication failed';
      let errorDetails = 'Please check your Modena credentials and make sure they have the correct permissions';
      
      if (data.error === 'invalid_client') {
        errorMessage = 'Invalid client credentials';
        errorDetails = 'The provided client ID or client secret is incorrect. Please verify your credentials in the Modena Partner Portal.';
      } else if (data.error === 'unauthorized_client') {
        errorMessage = 'Unauthorized client';
        errorDetails = 'This client is not authorized to use the slicepayment scope. Please check your permissions in the Modena Partner Portal.';
      }

      return NextResponse.json(
        { 
          error: errorMessage,
          details: errorDetails,
          technicalDetails: data
        },
        { status: 401 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: data.error_description || 'Authentication failed',
          details: data,
          technicalDetails: {
            status: response.status,
            statusText: response.statusText
          }
        },
        { status: response.status }
      );
    }

    if (!data.access_token) {
      throw new Error('No access token in response');
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Modena auth error:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to authenticate with Modena',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
} 