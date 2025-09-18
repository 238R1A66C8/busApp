import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tsrtc.hyderabad.userapp',
  appName: 'Hyderabad TSRTC',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#22c55e",
      showSpinner: false
    }
  }
};

export default config;
