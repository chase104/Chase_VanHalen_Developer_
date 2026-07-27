import dotenv from 'dotenv';
dotenv.config();

export async function sendVisitEmail(visitData = {}) {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'chase.vanhalen88@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'noreply@playpod.education';

  if (!apiKey || !secretKey) {
    console.error('Mailjet credentials missing from environment variables.');
    return { status: false, message: 'Mailjet credentials missing' };
  }

  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
  const timestamp = visitData.timestamp || new Date().toLocaleString();
  const url = visitData.url || 'Portfolio Home Page';
  const referrer = visitData.referrer || 'Direct / Unknown';
  const userAgent = visitData.userAgent || 'Unknown';
  const resolution = visitData.screenResolution || 'Unknown';
  const language = visitData.language || 'Unknown';

  const htmlPart = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">🎉 New Portfolio Visit Alert!</h2>
      <p style="font-size: 16px; color: #4a5568;">Someone just landed on your developer portfolio website!</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr style="background-color: #f7fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7; width: 35%;">Time:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7;">${timestamp}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7;">Page URL:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7;"><a href="${url}">${url}</a></td>
        </tr>
        <tr style="background-color: #f7fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7;">Referrer:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7;">${referrer}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7;">Screen Resolution:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7;">${resolution}</td>
        </tr>
        <tr style="background-color: #f7fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7;">Language:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7;">${language}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #edf2f7;">User Agent:</td>
          <td style="padding: 10px; border: 1px solid #edf2f7; font-size: 12px; color: #718096;">${userAgent}</td>
        </tr>
      </table>

      <hr style="margin-top: 25px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #a0aec0; text-align: center;">Automated notification sent from your Chase VanHalen Developer Portfolio.</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: senderEmail,
              Name: 'Chase Portfolio Notifier',
            },
            To: [
              {
                Email: recipientEmail,
                Name: 'Chase VanHalen',
              },
            ],
            Subject: '👀 Someone visited your Portfolio!',
            HTMLPart: htmlPart,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('[sendVisitEmail] Mailjet response:', data);
    return { status: response.ok, data };
  } catch (error) {
    console.error('[sendVisitEmail] Error sending email:', error);
    return { status: false, error: error.message };
  }
}

export async function sendContactEmail(contactData = {}) {
  const apiKey = process.env.MAILJET_API_KEY;
  const secretKey = process.env.MAILJET_SECRET_KEY;
  const recipientEmail = process.env.NOTIFICATION_EMAIL || 'chase.vanhalen88@gmail.com';
  const senderEmail = process.env.SENDER_EMAIL || 'noreply@playpod.education';

  if (!apiKey || !secretKey) {
    console.error('Mailjet credentials missing from environment variables.');
    return { status: false, message: 'Mailjet credentials missing' };
  }

  const auth = Buffer.from(`${apiKey}:${secretKey}`).toString('base64');
  const visitorEmail = contactData.email || 'No email provided';
  const message = contactData.message || 'No message content';
  const timestamp = new Date().toLocaleString();

  const htmlPart = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2b6cb0; border-bottom: 2px solid #2b6cb0; padding-bottom: 8px;">📬 New Contact Form Submission</h2>
      <p style="font-size: 16px; color: #4a5568;">Someone submitted a message on your portfolio contact form:</p>
      
      <div style="background-color: #f7fafc; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #3182ce;">
        <p style="margin: 0 0 10px 0;"><strong>Sender Email:</strong> <a href="mailto:${visitorEmail}">${visitorEmail}</a></p>
        <p style="margin: 0 0 10px 0;"><strong>Time Sent:</strong> ${timestamp}</p>
        <p style="margin: 0;"><strong>Message:</strong></p>
        <div style="background: #ffffff; padding: 12px; border-radius: 4px; border: 1px solid #e2e8f0; margin-top: 6px; white-space: pre-wrap;">${message}</div>
      </div>

      <hr style="margin-top: 25px; border: 0; border-top: 1px solid #e2e8f0;" />
      <p style="font-size: 12px; color: #a0aec0; text-align: center;">Sent directly from your Chase VanHalen Developer Portfolio.</p>
    </div>
  `;

  try {
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Messages: [
          {
            From: {
              Email: senderEmail,
              Name: 'Chase Portfolio Contact Form',
            },
            To: [
              {
                Email: recipientEmail,
                Name: 'Chase VanHalen',
              },
            ],
            ReplyTo: {
              Email: visitorEmail.includes('@') ? visitorEmail : senderEmail,
            },
            Subject: `📬 Contact Form Message from ${visitorEmail}`,
            HTMLPart: htmlPart,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log('[sendContactEmail] Mailjet response:', data);
    return { status: response.ok, data };
  } catch (error) {
    console.error('[sendContactEmail] Error sending email:', error);
    return { status: false, error: error.message };
  }
}
