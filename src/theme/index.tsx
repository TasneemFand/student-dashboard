import { useMemo } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeOptions, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// system
import { palette } from './palette';

// options
import RTL from './options/right-to-left';
import { useSettingsContext } from '../settings';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function ThemeProvider({ children }: Props) {
  const settings = useSettingsContext();


  const memoizedValue = useMemo(
    () => ({
      palette: {
        ...palette(),
      },
      direction: settings.themeDirection,
    }),
    [
      settings.themeMode,
      settings.themeDirection,
    ]
  );

  const theme = createTheme(memoizedValue as ThemeOptions);

  return (
    <MuiThemeProvider theme={theme}>
      <RTL themeDirection={settings.themeDirection}>
        <CssBaseline />
        {children}
      </RTL>
    </MuiThemeProvider>
  );
}
