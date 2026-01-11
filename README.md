<h1 align="center">SecretSender 💌</h1>

<p align="center">
  Dive into the world of anonymous feedback, mystery messages, and real-time secret chats.
</p>

---

## 🌟 Overview

**SecretSender** is an anonymous social messaging and chat platform where users can send and receive secret messages —  
and now, join real-time chat rooms to talk anonymously with others!  

It’s designed to encourage open, honest, and fun interactions — share your profile link, receive anonymous feedback,  
and chat live without revealing your identity.

---

## 🚀 Features

- 🔐 **Anonymous messaging system** — receive and reply to secret messages  
- 💬 **Real-time chat rooms** powered by **Socket.IO**  
  - 🟢 **Public Rooms:** up to 3 users can chat together anonymously  
  - 🔵 **Private Rooms:** create a 4-digit code to invite one other user (2 users max)  
- ✉️ Personalized message links you can share with friends  
- 🤖 **AI-powered message suggestions** (via OpenAI / OpenRouter API)  
- 🧩 Secure **email-based sign-up and verification**  
- ⚡ Built with **Next.js 16**, **TailwindCSS**, and **TypeScript**  
- ☁️ Hosted on **Vercel** (or Node host for WebSockets)

---

## 🛠️ Tech Stack

| Layer | Tools |
|--------|--------|
| **Frontend** | Next.js 16, React 19, TailwindCSS |
| **Backend** | Custom Node.js + Socket.IO server |
| **Database** | MongoDB with Mongoose |
| **Authentication** | NextAuth.js with email verification |
| **AI Integration** | OpenAI / OpenRouter API |
| **Deployment** | Vercel (frontend) + Node server for WebSockets |

---

## ⚙️ Environment Variables

Before running the project, create a `.env.local` file in your root directory and add:

```bash
# Core App URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Email Verification
EMAIL_SERVER=smtp_your_email_provider
EMAIL_FROM=your_verified_email@example.com

# AI (OpenAI or OpenRouter)
OPENAI_API_KEY=your_openai_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
