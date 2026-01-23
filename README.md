# 🐝 Bee Agile Mobile

[![React Native](https://img.shields.io/badge/React%20Native-0.74.5-61DAFB.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51.0.14-000020.svg)](https://expo.dev/)
[![i18next](https://img.shields.io/badge/i18next-25.4.2-26A69A.svg)](https://www.i18next.com/)

Bee Agile is now a React Native mobile experience for building, previewing, and tracking user stories on the go. The app keeps the core workflow intact while adapting the interface for touch-first mobile usage.

## ✨ Features

- **📱 Mobile-first User Story Builder**: Capture titles, personas, goals, and tags from a handheld-friendly interface.
- **✅ Acceptance Criteria & DoD**: Add Gherkin scenarios and Definition of Done items, with completion toggles.
- **📝 Markdown Preview**: Review a generated markdown summary right inside the app.
- **🌍 Internationalization**: Portuguese and English translations via react-i18next.
- **🧭 Quick Templates**: Apply common story templates and Gherkin starters with a tap.

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Expo Go (for running on device) or Android/iOS simulator

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the Expo development server**
   ```bash
   npm run start
   ```

3. **Run on device or simulator**
   - Scan the QR code with Expo Go, or
   - Press `a` for Android / `i` for iOS in the Expo CLI.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start the Expo development server |
| `npm run android` | Launch the Android app |
| `npm run ios` | Launch the iOS app |
| `npm run web` | Launch the Expo web preview |
| `npm run lint` | Run ESLint checks |

## 🏗️ Project Structure

```
src/
├── App.jsx             # React Native screen
├── hooks/              # Shared hooks (language)
├── i18n/               # Translation setup and locale files
```

## 🛠️ Tech Stack

- **React Native** for the mobile UI
- **Expo** for development tooling and build pipeline
- **React i18next** for localization
- **@react-native-picker/picker** for mobile select inputs

## 🤝 Contributing

1. Create a branch: `git checkout -b feature/mobile-update`
2. Commit changes: `git commit -m "Your message"`
3. Push and open a PR

## 📝 License

This project is private and not available for public use.
