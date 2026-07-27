import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendVisitEmail, sendContactEmail } from './sendVisitEmail.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// API endpoint for portfolio visit notification
app.post('/api/notify-visit', async (req, res) => {
  console.log('[server.js] Received portfolio visit notification request');
  const visitData = req.body || {};
  const result = await sendVisitEmail(visitData);

  if (result.status) {
    res.status(200).json({ success: true, message: 'Notification email sent' });
  } else {
    res.status(500).json({ success: false, error: result.error || 'Failed to send notification email' });
  }
});

// API endpoint for contact form submission
app.post('/api/contact', async (req, res) => {
  console.log('[server.js] Received contact form submission request');
  const contactData = req.body || {};
  const result = await sendContactEmail(contactData);

  if (result.status) {
    res.status(200).json({ success: true, message: 'Contact email sent successfully' });
  } else {
    res.status(500).json({ success: false, error: result.error || 'Failed to send contact email' });
  }
});

// Serve static frontend files from dist directory in production
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on port ${PORT}`);
});
