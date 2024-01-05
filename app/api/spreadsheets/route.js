import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const { SPREADSHEET_ID, SPREADSHEET_CLIENT_EMAIL, SPREADSHEET_PRIVATE_KEY, CAREERS_SHEET_ID, BUSINESS_SHEET_ID } =
  process.env;

export const maxDuration = 180;

export async function POST(req) {
  try {
    if (!CAREERS_SHEET_ID || !BUSINESS_SHEET_ID || !SPREADSHEET_PRIVATE_KEY || !SPREADSHEET_ID) {
      throw new Error('Missing ENV vars');
    }

    const { form, pathname } = await req.json();
    const jwt = new JWT({
      email: SPREADSHEET_CLIENT_EMAIL,
      key: SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsById[pathname === '/careers-at-waba' ? CAREERS_SHEET_ID : BUSINESS_SHEET_ID];
    const row = {
      'First Name': form.firstName,
      'Last Name': form.lastName,
      Email: form.email,
      'Phone Number': form.number,
      Subject: form.subject,
      Enquiry: form.enquiry,
    };
    await sheet.addRow(row);
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
