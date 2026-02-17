<h1 align="center">MysteryMessage 🕵️‍♂️💌</h1>

<p align="center">
  <a href="https://github.com/Start-Up-wala/MysteryMessage">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  </a>
  <a href="https://react.dev/">
    <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React">
  </a>
  <a href="https://socket.io/">
    <img src="https://img.shields.io/badge/Socket.IO-Realtime-black?style=for-the-badge&logo=socket.io" alt="Socket.IO">
  </a>
  <a href="https://tailwindcss.com/">
    <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS">
  </a>
  <a href="https://www.mongodb.com/">
    <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB">
  </a>
</p>

<p align="center">
  Dive into the world of anonymous feedback, mystery messages, and real-time secret chats.
  <br>
  <strong>MysteryMessage</strong> allows users to send and receive anonymous messages and participate in real-time chat rooms without revealing their identity.
</p>

---

## 🌟 Overview

**MysteryMessage** is a full-stack anonymous social messaging platform. It combines the thrill of anonymous feedback with the engagement of real-time chatting.

- **For Individuals:** Create a profile, share your unique link, and receive honest, anonymous messages from friends or strangers.
- **For Groups:** Create or join temporary chat rooms to discuss topics freely and anonymously.

It’s designed to encourage open, honest, and fun interactions.

---

## 🚀 Features

### 🔐 Anonymous Messaging
- **Unique Public Profile Links**: Share your link on social media to collect messages.
- **Privacy First**: Senders remain completely anonymous.
- **Dashboard**: View, manage, and delete received messages.

### 💬 Real-Time Chat Rooms
Powered by **Socket.IO** for instant communication.
- **Public Rooms**: Join open rooms to chat with random users (up to 3 users).
- **Private Rooms**: Create a secure room with a 4-digit code and invite a friend (2 users max).

### 🤖 AI-Powered Suggestions
- **Smart Suggestions**: Stuck on what to ask? Our integrated AI (utilizing Groq Llama 3) suggests fun and engaging questions to kickstart the conversation.

### 🧩 Secure & Modern
- **Email Verification**: Secure sign-up process using **NextAuth.js** and **Resend** for OTP verification.
- **Responsive Design**: Built with **Tailwind CSS 4** and **Shadcn/UI** for a beautiful experience on mobile and desktop.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/) |
| **Backend** | Node.js Custom Server + [Socket.IO](https://socket.io/) |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) |
| **Auth** | [NextAuth.js](https://next-auth.js.org/) |
| **AI** | [Groq SDK](https://groq.com/) (Llama 3) |
| **Email** | [Resend](https://resend.com/) |

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── (app)/          # Protected application routes (Dashboard, Rooms)
│   ├── (auth)/         # Authentication routes (Sign In, Sign Up, Verify)
│   ├── api/            # API routes (NextAuth, Suggestions, etc.)
│   └── u/[username]/   # Public profile page for sending messages
├── components/         # Reusable UI components
├── lib/                # Utility functions (DB connection, Resend, Helpers)
├── model/              # Mongoose schema definitions (User, Message)
└── server/             # Custom Express/Node server for Socket.IO
```

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mysterymessage

# Resend API Key (for emails)
RESEND_API_KEY=re_123456789

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000

# Groq API Key (for AI suggestions)
GROQ_API_KEY=gsk_123456789

# Optional: Server Port
PORT=3000
```

---

## 🏃‍♂️ Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Local or Atlas)
- **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Start-Up-wala/MysteryMessage.git
    cd MysteryMessage/mysterymessage
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up environment variables**
    Create a `.env` file in the root directory and fill in the values as shown in the **Environment Variables** section.

4.  **Run the development server**
    ```bash
    npm run dev
    ```
    > **Note:** This runs `tsx watch src/server/server.ts` to support both Next.js and Socket.IO.

5.  **Open the app**
    Visit `http://localhost:3000` in your browser.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the project, please follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request
