import { sendContactEmail } from '../services/emailService.js';
import { appendFile } from 'fs/promises';

// simple HTML-escape to avoid injecting HTML into emails/logs
const escapeHtml = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const submitContactForm = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  // sanitize inputs
  const safeName = escapeHtml(name.trim());
  const safeEmail = String(email).trim();
  const safePhone = String(phone || '').trim();
  const safeMessage = escapeHtml(message.trim());

  try {
    await sendContactEmail({ name: safeName, email: safeEmail, phone: safePhone, message: safeMessage });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);

    // Fallback: save message to a local log file so messages are not lost
    try {
      const logEntry = `${new Date().toISOString()} | ${safeName} | ${safeEmail} | ${safePhone} | ${String(safeMessage).replace(/\n/g, ' ')}\n`;
      const logPath = new URL('../../messages.log', import.meta.url);
      await appendFile(logPath, logEntry, { encoding: 'utf8' });
      console.log('Contact message saved to messages.log');
      return res.status(200).json({ success: true, message: 'Message received and saved locally (email failed).' });
    } catch (fsErr) {
      console.error('Failed to save message locally:', fsErr);
      return res.status(500).json({ error: 'Failed to send email and save message locally.' });
    }
  }
};