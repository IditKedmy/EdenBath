import {typesBase} from '../utils';

export type SeverityTypes = 'error' | 'warning' | 'info' | 'success';

export const SeverityTypes = {
  Error: 'error' as SeverityTypes,
  Warning: 'warning' as SeverityTypes,
  Info: 'info' as SeverityTypes,
  Success: 'success' as SeverityTypes,
  ...typesBase,
} as const;
