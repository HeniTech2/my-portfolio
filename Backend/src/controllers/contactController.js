import { sendContactEmail } from '../services/emailService.js';
import { appendFile } from 'fs/promises';

export const submitContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    await sendContactEmail({ name, email, message });
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);

    // Fallback: save message to a local log file so messages are not lost
    try {
      const logEntry = `${new Date().toISOString()} | ${name} | ${email} | ${String(message).replace(/\n/g, ' ')}\n`;
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