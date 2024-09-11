# Reachinbox Backend Assignment

## Overview

**Reachinbox** is an OpenAI-powered email assistant developed by **J S Ninad**. This Node.js application automates email processing for both Gmail and Outlook accounts. It utilizes **GPT 3.5 turbo** to categorize incoming emails, generate appropriate responses, and apply labels or categories to processed emails.

## Features

- Supports both Gmail and Outlook email providers.
- AI-powered email categorization and response generation.
- Automated email labeling and categorization.
- OAuth2 authentication for secure access to email accounts.

## Prerequisites

Make sure you have the following installed before setting up the project:

- **Node.js** (v14 or higher) – [Download here](https://nodejs.org/)
- **npm** (v6 or higher) – Installed with Node.js.
- **Gmail Account** – For OAuth configuration.
- **Microsoft Azure Account** – For Outlook email configuration.
- **OpenAI API Key** – For AI-driven email functionality.

## Folder Structure


```bash 

The project is organized as follows:
Reachinbox/
│
├── backend/
│   ├── node_modules/          # Node.js dependencies (auto-generated)
│   ├── src/                   # Source files
│   │   ├── aigen.ts           # AI service for email categorization
│   │   ├── app.ts             # Main application entry point
│   │   ├── Authentication.ts  # OAuth authentication for Gmail and Outlook
│   │   ├── auto.ts            # Handles automated email response generation
│   │   ├── Configure.ts       # Configuration and environment variable setup
│   │   ├── email.ts           # Gmail email service integration
│   │   ├── outlookauth.ts     # Handles OAuth authentication for Outlook
│   │   └── outlookemail.ts    # Outlook email service integration
│   │
│   ├── .env                   # Environment variables file (not committed to version control)
│   ├── .gitignore             # Git ignore file
│   ├── package.json           # Project metadata and dependencies
│   ├── package-lock.json      # npm lock file for exact dependency versions
│   ├── tsconfig.json          # TypeScript configuration
│   └── README.md              # Documentation (this file)
│
└── frontend/                  # (Optional) Placeholder for frontend if applicable




## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/reachinbox.git
cd reachinbox/backend
npm install
# Gmail Configuration
GMAIL_CLIENT_ID=your_gmail_client_id
GMAIL_CLIENT_SECRET=your_gmail_client_secret
GMAIL_REDIRECT_URI=http://localhost:3000/auth/gmail/callback

# Outlook Configuration
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret
OUTLOOK_TENANT_ID=your_outlook_tenant_id
OUTLOOK_REDIRECT_URI=http://localhost:3000/auth/outlook/callback

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
5. Start the Server
Once the setup is complete, you can start the server using the following command:

bash
Copy code
npm start
The server will be accessible at http://localhost:3000.

6. Authenticate Email Accounts
To authenticate Gmail and Outlook accounts, use the following URLs:

Gmail Authentication: Visit http://localhost:3000/auth/gmail.
Outlook Authentication: Visit http://localhost:3000/auth/outlook.
7. Process Emails
You can process unread emails by visiting the following URLs:

Process Gmail Emails: http://localhost:3000/process-email/gmail
Process Outlook Emails: http://localhost:3000/process-email/outlook
API Endpoints
Here is a list of available API endpoints for this project:

/auth/gmail: Initiates Gmail OAuth2 authentication.
/auth/outlook: Initiates Outlook OAuth2 authentication.
/process-email/gmail: Processes the latest unread Gmail email.
/process-email/outlook: Processes the latest unread Outlook email.
Technologies Used
Node.js: Backend server framework.
Express: Web application framework.
OAuth2: Authentication for Gmail and Outlook.
OpenAI GPT: For email categorization and automated response generation.