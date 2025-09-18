# 📱 Hyderabad TSRTC - Android APK Build Guide

## 🚀 **Project Setup Complete!**

Your React app has been successfully configured for Android development using Capacitor.

### **📂 Project Structure:**
```
user-app/
├── android/                    # Native Android project
├── build/                      # React production build
├── src/                        # React source code
├── capacitor.config.ts         # Capacitor configuration
└── package.json               # Dependencies
```

### **⚙️ Configuration Details:**
- **App Name:** Hyderabad TSRTC
- **Package ID:** com.tsrtc.hyderabad.userapp
- **Build Tool:** Capacitor + Android Studio
- **Permissions:** Internet, Location, Network State

---

## 🔧 **Method 1: Build APK using Android Studio (Recommended)**

### **Prerequisites:**
1. **Java Development Kit (JDK 11+)**
   ```bash
   # Check if Java is installed
   java -version
   ```

2. **Android Studio** (Latest version)
   - Download from: https://developer.android.com/studio
   - Install with Android SDK

### **Build Steps:**

1. **Open Android Project:**
   ```bash
   cd C:\BusTracking1\user-app
   npx cap open android
   ```

2. **In Android Studio:**
   - Wait for Gradle sync to complete
   - Go to `Build` → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Or press `Ctrl + Shift + A` and type "Build APK"

3. **Find Your APK:**
   ```
   C:\BusTracking1\user-app\android\app\build\outputs\apk\debug\app-debug.apk
   ```

---

## 🛠️ **Method 2: Command Line Build**

### **Prerequisites:**
1. **Install Android SDK Command Line Tools**
2. **Set Environment Variables:**
   ```bash
   ANDROID_HOME=C:\Users\[Username]\AppData\Local\Android\Sdk
   PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
   ```

### **Build Commands:**
```bash
# Navigate to project
cd C:\BusTracking1\user-app

# Build React app
npm run build

# Sync with Capacitor
npx cap sync

# Build debug APK
cd android
./gradlew assembleDebug

# Build release APK (for Play Store)
./gradlew assembleRelease
```

---

## 🎨 **Customization Options**

### **Change App Icon:**
1. Replace icons in: `android\app\src\main\res\mipmap-*\`
2. Use Android Studio's Image Asset Studio:
   - Right-click `res` → `New` → `Image Asset`

### **Update Splash Screen:**
```typescript
// In capacitor.config.ts
plugins: {
  SplashScreen: {
    launchShowDuration: 3000,
    backgroundColor: "#22c55e",  // TSRTC Green
    showSpinner: true,
    spinnerColor: "#ffffff"
  }
}
```

### **App Signing (For Play Store):**
```bash
# Generate keystore
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias

# Sign APK
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk my-key-alias
```

---

## 📦 **Build Outputs**

### **Debug APK (Testing):**
- File: `app-debug.apk`
- Size: ~15-20MB
- Installation: Enable "Unknown Sources" on Android device

### **Release APK (Production):**
- File: `app-release.apk`
- Signed and optimized
- Ready for Google Play Store

---

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **Gradle Build Failed:**
   ```bash
   cd android
   ./gradlew clean
   ./gradlew build
   ```

2. **SDK Not Found:**
   - Install Android SDK via Android Studio
   - Set ANDROID_HOME environment variable

3. **Permission Denied:**
   ```bash
   chmod +x gradlew
   ```

4. **OutOfMemory Error:**
   ```gradle
   // In android/gradle.properties
   org.gradle.jvmargs=-Xmx4096m -XX:MaxPermSize=512m
   ```

---

## 📱 **Testing Your APK**

### **On Physical Device:**
1. Enable Developer Options
2. Enable USB Debugging
3. Install via ADB: `adb install app-debug.apk`

### **On Emulator:**
1. Open Android Studio
2. AVD Manager → Create/Start Emulator
3. Drag & drop APK to emulator

---

## 🚀 **Publishing to Google Play Store**

1. **Create Developer Account** ($25 one-time fee)
2. **Build Release APK** with signing
3. **Upload to Play Console**
4. **Add Store Listing** (screenshots, description)
5. **Submit for Review**

---

## 📋 **Quick Commands Reference**

```bash
# Development workflow
npm run build              # Build React app
npx cap sync              # Sync to native project
npx cap open android      # Open in Android Studio

# Update app after changes
npm run build && npx cap sync

# Build APK via command line
cd android && ./gradlew assembleDebug
```

---

## ✅ **Your App Features**
- 🏠 Home with route search
- 👤 User profile with QR code
- 📅 Bus schedules
- 🕒 Trip history
- ⭐ Favorite routes
- ⚙️ Settings
- 🆘 Support

---

**🎉 Congratulations! Your Hyderabad TSRTC user app is ready to be built as an Android APK!**

For any issues, refer to the official Capacitor documentation: https://capacitorjs.com/docs/android