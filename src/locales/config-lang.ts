import merge from 'lodash/merge';

// core
import {
  enUS as enUSCore,
  arSA as arSACore,
} from '@mui/material/locale';
// data-grid
import {
  enUS as enUSDataGrid,
  arSD as arSDDataGrid,
} from '@mui/x-data-grid/locales';

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const allLangs = [
  {
    label: 'English',
    value: 'en',
    systemValue: merge(enUSDataGrid, enUSCore),
    icon: 'flagpack:gb-nir',
  },
  {
    label: 'Arabic',
    value: 'ar',
    systemValue: merge(arSDDataGrid, arSACore),
    icon: 'flagpack:sa',
  },
];

export const defaultLang = allLangs[0]; // English


