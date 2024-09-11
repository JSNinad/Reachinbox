import express from 'express';
import { getAuthUrl, getToken } from './Authentication';
import { getOutlookAuthUrl, getOutlookToken, verifyOutlookToken } from './outlookauth';
import { processEmail as handleGmailEmails } from './email';
import { processEmail as handleOutlookEmails } from './outlookemial';
import { config } from './Configure';
import {scheduleEmailProcessing} from './auto';
import './auto';

const server = express();
const serverPort = 3000;

console.log('Outlook OAuth Callback URI:', config.outlook.redirectUri);

// Route for Gmail authentication initiation
server.get('/auth/gmail', (req, res) => {
  const gmailAuthLink = getAuthUrl();
  res.redirect(gmailAuthLink);
});

// Gmail authentication callback
server.get('/auth/gmail/callback', async (req, res) => {
  const authCode = req.query.code as string;
  try {
    const accessTokens = await getToken(authCode);
    // Tokens would be securely stored for future usage
    res.send('Gmail authentication completed!');
  } catch (err) {
    console.error('Error in Gmail authentication:', err);
    res.status(500).send('Gmail authentication error: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
  }
});

// Route for Outlook authentication initiation
server.get('/auth/outlook', async (req, res) => {
  try {
    const outlookAuthLink = await getOutlookAuthUrl();
    console.log('Redirecting to Outlook OAuth link:', outlookAuthLink);
    res.redirect(outlookAuthLink);
  } catch (err) {
    console.error('Failed to generate Outlook OAuth URL:', err);
    res.status(500).send('Outlook authentication URL error: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
  }
});

// Outlook authentication callback
server.get('/auth/outlook/callback', async (req, res) => {
  const authCode = req.query.code as string;
  try {
    console.log('Received Outlook OAuth code:', authCode);
    const accessToken = await getOutlookToken(authCode);
    console.log('Successfully retrieved access token');
    res.send('Outlook authentication completed!');
  } catch (err) {
    console.error('Outlook authentication failed:', err);
    res.status(500).send('Outlook authentication error: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
  }
});

// Verify Outlook token validity
server.get('/verify-outlook-auth', async (req, res) => {
  try {
    const isTokenValid = await verifyOutlookToken();
    if (isTokenValid) {
      res.send('Outlook authentication is active');
    } else {
      res.status(401).send('Outlook authentication expired or invalid');
    }
  } catch (err) {
    console.error('Error verifying Outlook token:', err);
    res.status(500).send('Verification error: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
  }
});

// Route for processing emails based on provider
server.get('/process-email/:provider', async (req, res) => {
  const emailProvider = req.params.provider;

  try {
    let processingResult;
    if (emailProvider === 'gmail') {
      processingResult = await handleGmailEmails();
    } else if (emailProvider === 'outlook') {
      const isAuthenticated = await verifyOutlookToken();
      if (!isAuthenticated) {
        throw new Error('Outlook authentication invalid or expired');
      }
      processingResult = await handleOutlookEmails();
    } else {
      throw new Error('Unsupported email provider');
    }
    res.send(processingResult);
  } catch (err) {
    console.error('Error processing emails:', err);
    res.status(500).send('Processing error: ' + (err instanceof Error ? err.message : 'Unknown error occurred'));
  }
});

scheduleEmailProcessing();


// Start the server
server.listen(serverPort, () => {
  console.log(`Server is running on http://localhost:${serverPort}`);
  console.log('Email processing automation is now running.');
});
