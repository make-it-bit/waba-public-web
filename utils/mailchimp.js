const client = require('@mailchimp/mailchimp_marketing');

const { MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID } = process.env;

client.setConfig({
  server: MAILCHIMP_SERVER_PREFIX,
  apiKey: MAILCHIMP_API_KEY,
});

const addSubscriber = async (email) => {
  try {
    const response = await client.lists.addListMember(MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: 'pending',
    });
    return;
  } catch (error) {
    if (error.status == 400) {
      if (error.response.body.title === 'Member Exists') throw new Error('MEMBER_EXISTS');
      if (error.response.body.title === 'Invalid Resource') throw new Error('INVALID_RESOURCE');
    }
    throw new Error('UNKNOWN_ERROR');
  }
};

export default addSubscriber;
