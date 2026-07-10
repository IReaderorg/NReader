import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.ireader.next',
  appName: 'IReader Next',
  webDir: '../frontend/dist',
  server: { androidScheme: 'https' },
  plugins: {
    Filesystem: { directory: 'Documents' },
    LocalNotifications: { smallIcon: 'ic_stat_icon_config_sample', iconColor: '#488AFF' },
  },
}

export default config
