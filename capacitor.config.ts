import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.astramaan.app',
  appName: 'Astramaan',
  webDir: 'out',
  server: {
    // hostname: '192.168.1.100', // Example for local network testing
    // cleartext: true,
  },
};

export default config;
