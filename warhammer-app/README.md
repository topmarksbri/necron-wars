# Necron Wars — Warhammer 40,000 Learning App

A mobile-first web app for learning the Warhammer 40,000 11th Edition core rules, built around a Necrons theme.

## Features

- 🧠 **Quiz Mode** — 60 questions across 10 categories, with explanations and XP rewards
- ⚔️ **Battle Simulator** — Play full scenarios using real dice, guided through all 5 phases
- 📖 **Rules Reference** — Fast searchable reference for every core rule
- 🏆 **Dynasty Honours** — 11 achievement badges to unlock
- ⬆️ **10 Player Levels** — From Dormant Warrior to The Silent King

## Getting Started (Local)

Open `index.html` directly in a browser, or serve it:

```bash
cd warhammer-app
python3 -m http.server 8080
# Then open http://localhost:8080
```

## Deploy to GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages
3. Set source to **main branch**, root folder
4. Your app will be live at `https://yourusername.github.io/your-repo-name/`

## Editing on Your Phone

Since this is plain HTML/CSS/JS with no build step, you can edit any file directly in GitHub's web editor or the GitHub mobile app.

To add quiz questions, edit `data.js` and add to the `QUIZ_QUESTIONS` array.

## Based On

Warhammer 40,000 11th Edition Core Rules (© Games Workshop)
