
import './App.css'

// i18n
import './locales/i18n';

// ----------------------------------------------------------------------

import { ReactQueryProvider } from './providers/ReactQueryProvider';
import ThemeProvider from './theme';
import { ReactRouterProvider } from './providers/ReactRouterProvider';
import { SettingsProvider } from './settings';
import { AuthProvider } from './auth/context/jwt';
import './index.css';

function App() {

  return (
    <AuthProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light', // 'light' | 'dark'
          themeDirection: 'ltr', //  'rtl' | 'ltr'
        }}
      >
        <ReactQueryProvider>
          <ThemeProvider>
            <ReactRouterProvider />
          </ThemeProvider>
        </ReactQueryProvider>
       </SettingsProvider>
    </AuthProvider>
  )
}

export default App
