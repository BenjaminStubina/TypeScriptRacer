# Product Requirements Document (PRD) - TypeScriptRacer

## 1. Overview
TypeScriptRacer is a web-based typing game inspired by TypeRacer, but designed for developers. Instead of random text passages, users race to type valid code snippets from popular programming languages. The goal is to improve typing speed and accuracy with code syntax.

## 2. Core Features

### 2.1 Gameplay (Single Player)
- **Code Snippets:** Users are presented with a block of code (e.g., a function, a class, or an algorithm).
- **Language Support:** Initial support for TypeScript/JavaScript, Python, Java, and Go.
- **IDE-like Experience:**
    - Syntax highlighting for the code to be typed.
    - Monospace font (Fira Code or similar).
    - Tab support (indentation).
- **Validation:**
    - **Strictness:** The game validates the *code characters* but is lenient with whitespace and indentation to allow for auto-formatting.
    - **Feedback:** Visual cues for correct (green) vs. incorrect (red) characters in real-time.
- **Metrics:**
    - **WPM (Words Per Minute):** Calculated based on standard 5 characters = 1 word.
    - **Accuracy:** Percentage of correct keystrokes.
    - **Time:** Total time taken to complete the snippet.

### 2.2 Progression & Identity
- **Nickname:** Users enter a nickname before or after the race to save their score.
- **Leaderboard:** A global leaderboard displaying the top scores (WPM) for each language.
- **No Accounts (MVP):** No login/password required initially. Identity is session-based or simple nickname entry.

### 2.3 Data Source
- **Snippet Database:** A curated collection of code snippets stored in a backend database.
- **Randomization:** Snippets are fetched randomly based on the selected language.

## 3. User Flow
1.  **Landing Page:** User sees a "Start Race" button and a "Leaderboard" link.
2.  **Setup:** User selects a language (e.g., "TypeScript").
3.  **Race:**
    - Countdown (3-2-1-GO).
    - User types the code.
    - Real-time WPM and progress bar displayed.
4.  **Results:**
    - Final WPM and Accuracy shown.
    - Option to "Save Score" (Enter Nickname).
    - "Play Again" button.
5.  **Leaderboard:** View top scores.

## 4. Non-Functional Requirements
- **Performance:** Low latency input handling.
- **Responsiveness:** Playable on desktop (mobile support is secondary due to coding nature).
- **Aesthetics:** Clean, modern, "Dark Mode" IDE theme.

## 5. Future Scope (Post-MVP)
- Real-time Multiplayer (Socket.io).
- User Accounts (Auth0/Supabase Auth).
- User-submitted snippets.
- "Ghost" mode (race against your previous best).
