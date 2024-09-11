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

The project is organized as follows:

Reachinbox/ │ ├── src/ │ ├── aigen.ts # AI integration for email categorization │ ├── app.ts # Main application entry point │ ├── Authentication.ts # Handles Gmail and Outlook authentication │ ├── auto.ts # Automated response generation │ ├── Configure.ts # Configuration for environment variables │ ├── email.ts # Email service for Gmail │ ├── outlookauth.ts # Handles Outlook authentication │ └── outlookemail.ts # Outlook email service │ ├── .env # Environment variables file ├── .gitignore # Files/folders to ignore in version control ├── package-lock.json # Lock file for npm dependencies ├── package.json # Project dependencies and scripts ├── tsconfig.json # TypeScript configuration └── README.md # Project documentation (this file)


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
