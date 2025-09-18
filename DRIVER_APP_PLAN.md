# Driver Mobile App - Project Plan

## 🚗 **Driver App Features:**
- **Simple login** with phone number and password
- **GPS location sharing** (automatic in background)
- **Clock in/out** functionality
- **Bus status** (active/break/offline)
- **Route information** display
- **Emergency button** for help

## 📱 **Technology Options:**
1. **React Native** - Cross-platform mobile app
2. **PWA (Progressive Web App)** - Web app that works like mobile
3. **Flutter** - Google's cross-platform framework

## 🛠 **API Endpoints Needed:**
- `POST /api/auth/driver-login` ✅ (Already exists)
- `POST /api/buses/update-location` ✅ (Already exists)
- `POST /api/buses/status` (New - for online/offline status)

## 📋 **Driver App Structure:**
```
driver-app/
├── src/
│   ├── components/
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── LocationSharing.js
│   │   └── StatusToggle.js
│   ├── services/
│   │   ├── auth.js
│   │   ├── location.js
│   │   └── api.js
│   └── App.js
├── package.json
└── README.md
```

## 🔐 **Security Features:**
- JWT token authentication
- Automatic logout after inactivity
- Location sharing only when logged in
- Driver can see only their own bus data

---

**Commands to create Driver App:**
```bash
npx create-react-app driver-app
cd driver-app
npm install axios react-router-dom
```