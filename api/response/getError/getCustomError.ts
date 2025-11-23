/* eslint-disable @typescript-eslint/no-explicit-any */
import {errors as errorsTranslation} from './errors';

export function getCustomError(errors: any): string | null {
  if (!errors) return null;
  if (errors.push) {
    if (!errors.length) return null;
    // noinspection LoopStatementThatDoesntLoopJS
    for (let error of errors) {
      if (!error) return null;
      if (error.push && error.length) {
        error = error[0];
      }
      const translated = errorsTranslation[error];
      return translated || (error as string);
    }
  }
  if (errors && Object.keys(errors).length) {
    // noinspection LoopStatementThatDoesntLoopJS
    for (const key in errors) {
      const translated = errorsTranslation[key];
      if (translated) return translated;
      if (!errors[key]) return key;
      if (!errors[key].push || !errors[key][0]) return errors[key] as string;
      return errors[key][0] as string;
    }
  }
  return null;
}
