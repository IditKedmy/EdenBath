export const typesBase = {
  hasValue(value: string) {
    for (const key in this) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (this[key] === value) return true;
    }
    return false;
  },
};
