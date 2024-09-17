import axios from 'axios';

const PUSH_NOTIFICATION_TIMEOUT = 5000; // Example timeout in milliseconds, adjust as needed

// eslint-disable-next-line import/no-anonymous-default-export
export default function (msg: string, pushDestination: string): void {
  if (!process.env.WABA_TG_BOT_API_KEY) throw new Error('Missing WABA_TG_BOT_API_KEY environment variable!');

  try {
    const reservedChars = ['.', '-', '_', '(', ')', '!'];
    reservedChars.forEach((char) => {
      const escapedChar = `\\${char}`;
      msg = msg.split(char).join(escapedChar); // Replace all occurrences of the character
    });

    const msgUrl = `${process.env.WABA_TG_BOT_API_KEY[pushDestination]}&text=${encodeURIComponent(
      msg
    )}&parse_mode=MarkdownV2`;

    axios
      .get(msgUrl, { timeout: PUSH_NOTIFICATION_TIMEOUT })
      .then((response) => {
        console.log(JSON.stringify(response.data, null, 2)); // Print the response as JSON
      })
      .catch((error) => {
        if (error.code === 'ECONNABORTED') {
          console.log('Encountered TimeoutError while sending push notification.');
        } else {
          console.error('Error while sending push notification:', error);
        }
      });
  } catch (error) {
    console.error('Error in sendPushNotification function:', error);
  }
}
