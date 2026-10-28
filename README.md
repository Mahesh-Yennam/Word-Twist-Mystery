# 🔍 Word Twist Mystery

An atmospheric noir detective anagram vocabulary puzzle game built with pure vanilla JavaScript, CSS3, and the Web Audio API. Crack confidential case files, unscramble letter tiles to discover hidden words of 3 to 6 letters, find the **Master Key Word** to crack the case, and rise through the detective ranks!

Part of the [Gamility](https://mahesh-yennam.github.io/Gamility/) web games collection. Fully configured to run as an **independent standalone repository** or embedded directly within the Gamility portal.

---

## 📁 Repository Structure

```text
word-twist-mystery/
├── index.html        # Game layout, detective case board, semantic HTML & Schema.org JSON-LD
├── style.css         # Noir detective aesthetics, brass accents, responsive tile racks
├── game.js           # Anagram lexicon engine, timer/scoring, hints, and Web Audio SFX
├── favicon.svg       # Magnifying glass and mystery letter vector SVG favicon
├── site.webmanifest  # Progressive Web App (PWA) manifest for mobile install
├── robots.txt        # Search engine crawler configuration
├── sitemap.xml       # Standalone XML sitemap
├── .gitignore        # Standard web gitignore
└── README.md         # Documentation & deployment guide
```

---

## 🎮 How to Play

- **Objective:** You are a detective solving confidential case files. Each case presents you with **6 scrambled letters**. Unscramble and spell as many valid 3, 4, 5, and 6-letter words as possible before the timer runs out!
- **Case Clearance Condition:** You **must find at least one 6-letter Master Key Word** to qualify for the next case file and advance your detective rank.
- **Controls:**
  - **Click/Tap Tiles:** Select letters from the bottom rack into the answer tray. Tap a letter in the answer tray to return it to the rack.
  - **Keyboard:** Type any letter directly on your keyboard (`A`–`Z`).
  - **Backspace / Delete:** Undo the last letter placed.
  - **Enter / Return:** Submit the current word for verification.
  - **Spacebar / S:** **Twist (Shuffle)** the letter rack with an animated flip to spark new combinations!
  - **C:** **Clear** all letters in the answer tray.
  - **H:** Reveal a **Hint** (uncovers the starting letter of an unrevealed word).
  - **P:** Pause / Resume the case timer.
- **Game Modes:**
  - **Timed Detective Cases:** 2 minutes per case file. Uncover the 6-letter mystery key word before the clock expires to advance to the next mystery!
  - **Relaxed Investigation:** Untimed word discovery with no countdown pressure.

---

## ✨ Features

- **Built-in Curated Offline Lexicon:** Tens of thousands of valid word combinations pre-calculated for instantaneous validation without any external network calls.
- **Web Audio Sound Effects:** Dynamic procedural audio synthesizers (letter clacks, valid word chime arpeggios, error buzz, twist whoosh, clue sparkle, and case solved fanfare).
- **Responsive Mobile & Desktop Design:** Finger-friendly touch tiles on mobile screens, fluid animations, full physical keyboard integration on desktop.
- **Detective Case Progression:** Earn detective badges and ranks (Rookie Sleuth → Junior Detective → Senior Inspector → Chief of Detectives → Master Mind).
- **Persistent Local Records:** High score, cases solved, and highest detective rank saved automatically via browser `localStorage`.
- **Zero External Dependencies:** Built with 100% native Web Standards.

---

## 📄 Copyright & Terms

Copyright © 2026 Gamility. All rights reserved.
This repository and its source code are proprietary. Unauthorized copying, distribution, or commercial reuse without explicit permission is strictly prohibited.
