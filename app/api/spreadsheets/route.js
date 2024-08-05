import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail
import sgMail from '@sendgrid/mail';

const {
  SPREADSHEET_ID,
  SPREADSHEET_CLIENT_EMAIL,
  SPREADSHEET_PRIVATE_KEY,
  CAREERS_SHEET_ID,
  BUSINESS_SHEET_ID,
  CONTACT_SHEET_ID,
  SENDGRID_API_KEY,
  DOWNLOADABLE_SHEET_ID,
} = process.env;

export const maxDuration = 180;

const sharedEmailSettings = {
  to: 'mart.lakspere@wabaskin.com',
  from: 'mart.lakspere@wabaskin.com',
};

export async function POST(req) {
  try {
    if (
      !SPREADSHEET_ID ||
      !SPREADSHEET_PRIVATE_KEY ||
      !CAREERS_SHEET_ID ||
      !BUSINESS_SHEET_ID ||
      !CONTACT_SHEET_ID ||
      !SENDGRID_API_KEY ||
      !DOWNLOADABLE_SHEET_ID
    ) {
      throw new Error('Missing ENV vars.');
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const { form, pathname } = await req.json();
    const sheetId = {
      '/careers-at-waba': CAREERS_SHEET_ID,
      '/waba-for-business': BUSINESS_SHEET_ID,
      '/contact-us': CONTACT_SHEET_ID,
      '/offers': DOWNLOADABLE_SHEET_ID,
    }[pathname];

    const jwt = new JWT({
      email: SPREADSHEET_CLIENT_EMAIL,
      key: SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive.file'],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetId];
    let row;
    if (sheetId === DOWNLOADABLE_SHEET_ID) {
      console.log('form', form);
      const now = new Date();
      const timeStamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getFullYear()}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      row = { ...form, timestamp: timeStamp };
      await sheet.addRow(row);
      await sgMail.send({
        ...sharedEmailSettings,
        subject: 'NEW WABA OFFERS FORM SUBMISSION',
        text: 'check google sheets...',
      });
    } else {
      row = {
        'First Name': form.firstName,
        'Last Name': form.lastName,
        Email: form.email,
        'Phone Number': form.number,
        Subject: form.subject,
        Enquiry: form.enquiry,
      };
      await sheet.addRow(row);

      await sgMail.send({
        ...sharedEmailSettings,
        subject: 'NEW WABA ENQUIRY',
        text: 'check google sheets...',
      });
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    console.error(e);
    await sgMail.send({
      ...sharedEmailSettings,
      subject: 'Failed to submit enquiry.',
      text: 'Please report to Sebastian.',
    });
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
