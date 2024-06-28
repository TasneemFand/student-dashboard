import { useMemo, useEffect, useCallback } from 'react';

import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';
import { localStorageGetItem } from '../../utils/locale-storage';
import { isEqual } from 'lodash';
import { useLocalStorage } from '../../hooks/use-local-storage';

// ----------------------------------------------------------------------

const STORAGE_KEY = 'settings';

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage(STORAGE_KEY, defaultSettings);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar';

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isArabic]);

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [update]
  );

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
    }),
    [
      reset,
      update,
      state,
      canReset,
      onChangeDirectionByLang,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
