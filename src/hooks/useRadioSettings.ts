export function useRadioSettings(settings) {
  const transactionType = Object.keys(settings).filter(
    (key) => settings[key] === true
  )[0];
  return transactionType;
}
