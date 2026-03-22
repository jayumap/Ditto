<div align="center">

# 🪞 Ditto

### *Find the developer who codes just like you.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Launch%20App-7C3AED?style=for-the-badge&logo=vercel)](https://ditto-app.vercel.app)
[![MIT License](https://img.shields.io/badge/License-MIT-06B6D4?style=for-the-badge)](LICENSE)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)

</div>

---

## 🚀 Overview

**Ditto** is a developer discovery tool that analyzes your public GitHub activity and finds your **coding doppelgänger** — the developer in the world who codes most like you.

No sign-up. No OAuth. Just enter a GitHub username and watch Ditto scan thousands of developers to surface your digital twin in seconds.

> Built for developers who believe that the way you write code is as personal as a fingerprint.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧬 **Language DNA** | Analyzes your language mix across all public repos and matches developers with a near-identical fingerprint |
| 🕐 **Commit Rhythm** | Detects when you code — morning, midnight, weekdays — and finds devs who share your schedule |
| 📊 **Similarity Score** | A 0–100% match score with a full breakdown across 5 metrics |
| 🃏 **Side-by-Side Comparison** | Rich profile cards for you and your twin — avatars, bios, language pills, star counts |
| ⚡ **Zero Auth Required** | Works entirely on public GitHub data. No keys, no login, no friction |
| 🎨 **Immersive Loader** | An animated DNA helix loader keeps you entertained while the algorithm runs |
| 🌗 **Dark / Light Mode** | GitHub-inspired dark mode with one-click toggle and localStorage persistence |

---

## 🧠 How It Works

```
Enter GitHub Username
        ↓
Fetch public profile, repos & commit events
        ↓
Build your Coding Fingerprint
  (language mix · star profile · commit schedule · account age)
        ↓
Search GitHub for developers with similar language DNA
        ↓
Score each candidate across 5 weighted metrics
        ↓
Return your highest-scoring Doppelgänger
```

The matching uses **cosine similarity** for language vectors and normalized distance functions for behavioral signals. All computation happens **client-side** — your data never touches a server.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Styling** | Tailwind CSS v3 (dark mode via `class` strategy) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Routing** | React Router v6 |
| **Data** | GitHub REST API v3 (no auth, public endpoints) |
| **Deployment** | Vercel |


## ⚡ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/jayumap/ditto.git
cd ditto

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and enter any GitHub username to find a match.

> **Note:** The GitHub API allows 60 unauthenticated requests per hour. Each Ditto search uses approximately 20–25 requests.

---

## 🌍 Deployment

Ditto is designed for zero-config deployment on **Vercel**:

```bash
# Install the Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to [vercel.com](https://vercel.com) for automatic deployments on every push.

---

## 🔮 Future Ideas

- **🔑 GitHub OAuth** — Authenticated requests for 5,000 req/hr, enabling deeper analysis (private contribution graphs, starred repos)
- **🌐 Social Sharing** — One-click Twitter/X card: *"My GitHub doppelgänger is @username (87% match)"*
- **📈 Trend Mode** — Find your twin within a specific country, company, or time period
- **🤝 Connect Button** — Open a GitHub "follow" or send a pre-written intro message to your twin
- **🧪 Leaderboard** — See the highest-similarity matches discovered on the platform
- **🎯 Topic Matching** — Factor in repo topics (e.g., machine-learning, game-dev) for richer matches

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/cool-thing`)
3. Commit your changes (`git commit -m 'feat: add cool thing'`)
4. Push and open a Pull Request

---

## 📄 License

MIT © [Your Name](https://github.com/jayumap)

---

<div align="center">

*Made with ☕ and too many GitHub API calls.*

**[Launch Ditto →](https://ditto-app.vercel.app)**

</div>
