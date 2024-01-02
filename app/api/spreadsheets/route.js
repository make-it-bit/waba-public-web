import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';

const { SPREADSHEET_ID, SPREADSHEET_CLIENT_EMAIL, SPREADSHEET_PRIVATE_KEY, SHEET_ID } = process.env;

export const maxDuration = 180;

export async function POST(req) {
  try {
    const { form } = await req.json();

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, {
      client_email: SPREADSHEET_CLIENT_EMAIL,
      private_key: SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    await doc.loadInfo();
    const sheet = doc.sheetsById[SHEET_ID];
    const row = {
      'First Name': form.firstName,
      'Last Name': form.lastName,
      Email: form.email,
      'Phone Number': form.phone,
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
