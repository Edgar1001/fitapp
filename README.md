# Fitapp

**Fitapp** is a modern fitness tracking mobile application built with React Native and TypeScript, designed for both Android and iOS platforms. 
It helps users track their physical activity, set personalized goals, and visualize their progress using intuitive and interactive layouts.

---

## Features

### Authentication
- Secure login and user session management.
- Personalized user profile setup.

### Activity Tracking
- Save and track activities on a daily, weekly, and monthly basis.
- Visualize progress through interactive layouts and bar completion graphs.
- Uses GPS to track distance (km/day) accurately.

### Personalized Goals
- Custom fitness goals generated based on user profile data.
- Daily and weekly goal completion tracking with progress indicators.

### Statistics Dashboard
- View detailed performance trends:
  - Weekly summaries
  - Monthly overviews
  - Completion rates in visual charts

### Theme Customization
- Easily toggle between Dark Mode and Light Mode.

### Multilingual Support
- Available in English and Spanish.
- Language selection handled automatically or manually via the settings screen.

---

##  Tech Stack

- **React Native** – Cross-platform mobile development
- **TypeScript** – Type-safe JavaScript
- **React Navigation** – Smooth navigation between app screens
- **AsyncStorage / SecureStore** – Persistent local storage
- **GPS/Geolocation APIs** – Real-time tracking
- **Context API / Redux** – For managing global state

---

## UI Overview

- **Home Screen:** Displays a summary of daily and weekly goals, with bar progress indicators.
- **Calendar Screen:** Allows users to view and select past activity data by date.
- **Map Screen:** Shows GPS-tracked routes and distance covered on a map.
- **Stats Screen:** Visual breakdown of activity trends with weekly/monthly analytics.
- **Profile Screen:** Manage personal info, fitness goals, and preferences.
- **Settings Screen:** Language selection (English/Spanish), theme toggle, and app settings.

---

##  Installation

1. Clone the repository
   ```bash
   git clone
   cd fitapp
   ```
2. Install dependencies
   ```bash
   npm install
   or
   yarn install
   ```

3. Run on Android:
   Make sure an emulator is running or a device is connected
   ```bash
   npx react-native run-android
   ```

4. Run on iOS:
   Only on macOS with Xcode and CocoaPods installed
   ```bash
   npx pod-install
   npx react-native run-ios
   ```
