export const canBecomeInteger = (value: unknown) => {
  const valueIsFalsyAndNotZero = value !== 0 && !value;
  return !valueIsFalsyAndNotZero && Number.isInteger(Number(value));
};
