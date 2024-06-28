// ----------------------------------------------------------------------

export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
  themeDirection: 'rtl' | 'ltr';
};

export type SettingsContextProps = SettingsValueProps & {
  // Update
  onUpdate: (name: string, value: string | boolean) => void;
  // Direction by lang
  onChangeDirectionByLang: (lang: string) => void;
  // Reset
  canReset: boolean;
  onReset: VoidFunction;
};
