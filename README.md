<<<<<<< HEAD
# 🚌 Hyderabad TSRTC Bus Tracking System

A complete bus tracking system for Hyderabad TSRTC with user app, driver app, and backend API.

## 📱 Features

### User App
- 🏠 **Route Search** - Find buses between locations with interactive maps
- 🗺️ **Interactive Maps** - View real-time bus routes and stops
- 👤 **User Profile** - Digital bus pass with QR code
- 📅 **Schedule** - Bus timings and frequencies
- 🕒 **Trip History** - Previous journey records
- ⭐ **Favorites** - Save frequently used routes
- ⚙️ **Settings** - App preferences and notifications
- 🆘 **Support** - Help and customer service

### Driver App
- 📍 **Location Sharing** - Real-time GPS tracking
- 🚏 **Route Management** - Current route and stops
- 👥 **Driver Profile** - Login and duty status
- 📊 **Trip Analytics** - Daily statistics and reports

### Backend API
- 🔄 **Real-time Updates** - Live bus location tracking
- 📊 **Data Management** - Routes, schedules, and users
- 🔐 **Authentication** - Driver and user login
- 📱 **API Endpoints** - RESTful services

## 🛠️ Technology Stack

- **Frontend:** React 18, Capacitor (for Android APK)
- **Maps:** React Leaflet with OpenStreetMap
- **Styling:** CSS3 with Glassmorphism effects
- **Mobile:** Capacitor for native Android app
- **Backend:** Node.js, Express.js
- **Deployment:** Render platform

## 📂 Project Structure

```
BusTracking1/
├── user-app/              # React user application
│   ├── src/
│   ├── android/          # Android project files
│   └── build/            # Production build
├── bus-driver-app/       # React driver application
└── backend/              # Node.js API server
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Android Studio (for APK building)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hyderabad-tsrtc-bus-app.git
   cd hyderabad-tsrtc-bus-app
   ```

2. **Install User App dependencies:**
   ```bash
   cd user-app
   npm install
   npm start
   ```

3. **Install Driver App dependencies:**
   ```bash
   cd ../bus-driver-app
   npm install
   npm start
   ```

4. **Install Backend dependencies:**
   ```bash
   cd ../backend
   npm install
   npm start
   ```

## 📱 Building Android APK

The user app can be built as a native Android APK:

```bash
cd user-app
npm run build
npx cap sync
npx cap open android
```

See `ANDROID_BUILD_GUIDE.md` for detailed instructions.

## 🌐 Deployment

Deploy to Render platform:
- **Backend:** Web Service
- **User App:** Static Site
- **Driver App:** Static Site

## 📍 Bus Routes

Includes real Hyderabad TSRTC routes:
- **5K:** Secunderabad ↔ HITEC City
- **8A:** Koti ↔ Gachibowli  
- **10H:** Uppal ↔ Kondapur
- **18C:** Koti ↔ Miyapur

## 🎨 Design Features

- **Glassmorphism UI** - Modern translucent design
- **Responsive Layout** - Works on all devices
- **Interactive Maps** - Real-time route visualization
- **Green Theme** - TSRTC brand colors
- **Smooth Animations** - Enhanced user experience

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Email: support@tsrtc.telangana.gov.in
- Phone: +91 40-23450033
- Website: https://www.tsrtc.telangana.gov.in

---

**Made with ❤️ for Hyderabad commuters**
=======
# busApp
>>>>>>> f3854d96aeb8332196038fdee98c964e1084de85
