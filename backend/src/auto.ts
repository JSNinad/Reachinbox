import { processEmail as handleGmailEmails } from './email';
import { processEmail as handleOutlookEmails } from './outlookemial';
import { CronJob } from 'cron';

async function executeEmailProcessing() {
  console.log('Initiating email processing tasks...');

  try {
    // Process Gmail inbox
    await handleGmailEmails();
    console.log('Successfully processed Gmail emails.');

    // Process Outlook inbox
    await handleOutlookEmails();
    console.log('Successfully processed Outlook emails.');
  } catch (err) {
    console.error('An error occurred during email processing:', err);
  }
}

export function scheduleEmailProcessing() {
  // Define a cron job that runs every 5 minutes
  const cronTask = new CronJob('*/5 * * * *', executeEmailProcessing);

  cronTask.start();

  console.log('Scheduled email processing initiated. It will run every 5 minutes.');
}
