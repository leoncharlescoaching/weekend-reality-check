// Unit conversion helpers. Internally we always store height in cm and weight in kg.

export const cmToFtIn = (cm) => {
  const totalInches = cm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inch = Math.round(totalInches - ft * 12);
  return { ft, inch };
};

export const ftInToCm = (ft, inch) => {
  const totalInches = ft * 12 + inch;
  return Math.round(totalInches * 2.54);
};

export const kgToLb = (kg) => Math.round(kg * 2.20462);
export const lbToKg = (lb) => Math.round(lb / 2.20462);
