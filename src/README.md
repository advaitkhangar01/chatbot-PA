# Assistant AI

This is a fully functional AI-powered personal assistant chatbot built with Next.js, Firebase, and Genkit (using Google's Gemini models).

## Features

- **Conversational AI**: Engage in natural, human-like conversations powered by Google's Gemini model.
- **Smart Suggestions**: Get alternative prompts and ideas to refine your queries.
- **Reminder Management**: Set reminders via the chat interface, which are stored in Firebase Firestore.
- **Email Notifications**: A backend setup is designed to work with Firebase Functions to send email reminders (requires user implementation).
- **Modern Chat UI**: A clean, responsive, and visually appealing chat interface built with Tailwind CSS and shadcn/ui.
- **Conversation History**: Chat history is saved to Firestore to provide context for ongoing conversations (requires user configuration).

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, shadcn/ui
- **AI**: Google AI (via Genkit), Next.js Server Actions
- **Backend**: Firebase (Firestore for data storage)
- **Deployment**: Vercel (Frontend), Firebase (Backend services)

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Firebase project](https://console.firebase.google.com/)
- A Google Cloud project with the AI Platform API enabled.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd assistant-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of your project and add your Firebase and Google AI credentials.

```
# Firebase Configuration
# Get these from your Firebase project settings
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Google AI (Genkit) Configuration
# This is your Google Cloud Project's API Key
GOOGLEAI_API_KEY=
```

### 4. Firebase Setup

1.  **Create a Firebase Project**: Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
2.  **Create a Web App**: In your project dashboard, add a new Web App to get your Firebase configuration keys for `.env.local`.
3.  **Set up Firestore**:
    - Go to the "Firestore Database" section and create a new database.
    - Start in **production mode**.
    - You will need to set up security rules to allow your app to read and write data.

#### Firestore Security Rules

Go to the "Rules" tab in your Firestore dashboard and paste the following rules. These rules are a basic example that allows any authenticated user to read/write data. For a production application, you should refine these to be more secure (e.g., only allowing users to access their own data).

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read/write for this example.
    // For a real app, implement authentication and secure these rules.
    // e.g., allow read, write: if request.auth != null;
    match /chats/{chatId} {
      allow read, write: if true;
    }
    match /reminders/{reminderId} {
      allow read, write: if true;
    }
  }
}
```

### 5. Run the Development Server

You can now start the development server for the Next.js frontend.

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

---

## Backend Services (Reminders)

This project is configured to save reminders to Firestore. To send email notifications, you need to implement a backend service.

### Recommended Approach: Firebase Functions

1.  **Set up Firebase CLI**: If you haven't already, install the Firebase CLI and initialize Firebase Functions in your project.
2.  **Create a Scheduled Function**: Write a Firebase Function that runs on a schedule (e.g., every minute).
3.  **Query Firestore**: The function should query the `reminders` collection for any reminders that are due.
4.  **Send Emails**: Use a service like **Nodemailer** or **SendGrid** to send an email to the hardcoded recipient (`advaitkhangar01@gmail.com`) for each due reminder.
5.  **Update Reminder Status**: After sending the notification, update the reminder document in Firestore to mark it as sent.

This part of the implementation is left for the user to complete as it requires backend infrastructure setup beyond the scope of this frontend application.

## Deployment

### Deploying the Frontend to Vercel

1.  Push your code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com/) and create a new project, importing your GitHub repository.
3.  Vercel will automatically detect that it's a Next.js project.
4.  **Add Environment Variables**: In the Vercel project settings, add all the environment variables from your `.env.local` file.
5.  Click "Deploy". Your site will be live!

### Deploying Backend Functions

If you implement the reminder system, deploy your Firebase Functions using the Firebase CLI:

```bash
firebase deploy --only functions
```
