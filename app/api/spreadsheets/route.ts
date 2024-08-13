import { NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { Logger } from 'next-axiom';

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
  EMAIL_VERIF_API_KEY,
} = process.env;

export const maxDuration = 180;

const sharedEmailConf = {
  to: 'mart.lakspere@wabaskin.com',
  from: 'mart.lakspere@wabaskin.com',
};

export async function POST(req) {
  const log = new Logger();
  try {
    log.info('Received a request to submit a form.');
    await log.flush();
    if (
      !SPREADSHEET_ID ||
      !SPREADSHEET_PRIVATE_KEY ||
      !CAREERS_SHEET_ID ||
      !BUSINESS_SHEET_ID ||
      !CONTACT_SHEET_ID ||
      !SENDGRID_API_KEY ||
      !DOWNLOADABLE_SHEET_ID ||
      !EMAIL_VERIF_API_KEY
    ) {
      log.error('Missing ENV vars in spreadsheets endpoint.');
      await log.flush();
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

    log.info('Connecting to Google Sheets.');
    await log.flush();
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, jwt);
    await doc.loadInfo();
    const sheet = doc.sheetsById[sheetId];

    let row;

    if (sheetId === DOWNLOADABLE_SHEET_ID) {
      log.info('Processing offers form submission.', { form });
      await log.flush();
      // Email verification
      try {
        log.info('Verifying email address.', { email: form.email });
        await log.flush();
        const emailVerification = await fetch(
          `https://apps.emaillistverify.com/api/verifyEmail?secret=${EMAIL_VERIF_API_KEY}&email=${form.email}`
        );

        if (!emailVerification.ok) {
          log.error('Error verifying email address.');
          await log.flush();
          return NextResponse.json({ message: 'email_verification_failed' }, { status: 400 });
        }

        const emailVerificationData = await new Response(emailVerification.body).text();

        if (emailVerificationData !== 'ok') {
          log.error('Email address is invalid.', { email: form.email });
          await log.flush();
          return NextResponse.json({ message: 'email_invalid' }, { status: 501 });
        }
      } catch (error) {
        log.error('Failed to verify email address.', { error: error.message, stack: error.stack });
        await log.flush();
        return NextResponse.json({ message: 'email_verification_error' }, { status: 500 });
      }

      const now = new Date();
      const timeStamp = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')} ${now.getFullYear()}-${(
        now.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
      let row: any[] = [];
      Object.keys(form).forEach((key) => {
        row.push(form[key]);
      });
      row.push(timeStamp);

      log.info('Adding a new row to the sheet.', { row });
      await log.flush();
      await sheet.addRow(row);
      log.info('Sending an email notification.');
      await log.flush();
      await sgMail.send({
        ...sharedEmailConf,
        subject: 'NEW WABA OFFERS FORM SUBMISSION',
        text: 'check google sheets...',
      });
    } else {
      log.info('Processing form submission.', { sheetId, form });
      await log.flush();
      row = {
        'First Name': form.firstName,
        'Last Name': form.lastName,
        Email: form.email,
        'Phone Number': form.number,
        Subject: form.subject,
        Enquiry: form.enquiry,
      };
      log.info('Adding a new row to the sheet.', { sheetId, row });
      await log.flush();
      await sheet.addRow(row);
      log.info('Sending an email notification.', { sheetId });
      await log.flush();
      await sgMail.send({ ...sharedEmailConf, subject: 'NEW WABA ENQUIRY', text: 'check google sheets...' });
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    console.error(e);
    log.error('Failed to submit form.', { error: e.message, stack: e.stack });
    await log.flush();
    await sgMail.send({
      ...sharedEmailConf,
      subject: 'Failed to submit enquiry.',
      text: 'Please report to Sebastian.',
    });
    return NextResponse.json({ message: 'fail' }, { status: 400 });
  }
}
