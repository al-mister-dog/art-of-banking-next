export const overdraft = 0;
export const reserveRequirement = 0;
export const interestRate = 0;

export interface ColorSettings {
  round: boolean;
  static: boolean;
  flash: boolean;
  off: boolean;
}

export interface DisplaySettings {
  balances: boolean;
  taccounts: boolean;
  clavero: boolean;
}

export const colorSettings: ColorSettings = {
  round: true,
  static: false,
  flash: false,
  off: false,
};

export const displaySettings: DisplaySettings = {
  balances: true,
  taccounts: false,
  clavero: false,
};

export interface ClaveroSettings {
  latest: boolean;
  lastTwo: boolean;
  all: boolean;
}

export const claveroSettings: ClaveroSettings = {
  latest: true,
  lastTwo: false,
  all: false,
};

export const sliderSettings = {
  0: {
    overdraft: true,
    reserveRequirement: true,
    interestRate: true,
  },
  1: {
    overdraft: true,
    reserveRequirement: true,
    interestRate: true,
  },
  2: {
    overdraft: true,
    reserveRequirement: true,
    interestRate: true,
  },
  3: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  4: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  5: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  6: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  7: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  8: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  9: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  10: {
    overdraft: false,
    reserveRequirement: false,
    interestRate: true,
  },
  11: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  12: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  13: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  14: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  15: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
  16: {
    overdraft: false,
    reserveRequirement: true,
    interestRate: true,
  },
};
