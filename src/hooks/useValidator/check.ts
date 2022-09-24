import { BalanceSheets } from "../../domain/displays/balancesheets";
import { Totals } from "../../domain/displays/totals";
import { Bank } from "../../domain/structures";

export const check = {
  checks: {
    error: false,
    errorMessage: "",
    disabled: false,
  },
  validate() {
    const currentCheck = { ...this.checks };
    this.checks = {
      error: false,
      errorMessage: "",
      disabled: false,
    };
    return currentCheck;
  },
  requiredFields(selectedBank: string, amount: number) {
    this.isAmount(amount);
    this.isSelectedBank(selectedBank);
    this.isPositiveAmount(amount);
    return this;
  },
  isAmount(amount: number) {
    if (!amount) {
      this.checks = { ...this.checks, disabled: true };
    }
    return this;
  },
  isSelectedBank(selectedBank: string) {
    if (selectedBank === null || selectedBank === undefined) {
      this.checks = { ...this.checks, disabled: true };
    }
    return this;
  },
  isPositiveAmount(amount: number) {
    if (amount <= 0) {
      this.checks = { ...this.checks, disabled: true };
    }
    return this;
  },
  sufficientReserves(reserves: number, amount: number, customer: string) {
    if (reserves - amount < 0) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `${customer} Has Insufficient Reserves`,
        disabled: true,
      };
    }
    return this;
  },
  sufficentDeposits(
    customerDeposits: number,
    amount: number,
    customer: string
  ) {
    if (customerDeposits < amount) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `${customer} Has Insufficient Deposits`,
        disabled: true,
      };
    }
    return this;
  },
  isOverdraftLimit(
    customerDeposits: number,
    overdraft: number,
    amount: number
  ) {
    if (customerDeposits - amount < -overdraft) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `Overdraft Limit Reached`,
        disabled: true,
      };
    }
    return this;
  },
  isRequiredReserves(
    reserves: number,
    reserveRequirement: number,
    amount: number,
    bank: Bank
  ) {
    const banksDepositLiabilities =
      Totals.getTotalCustomerDepositLiabilites(bank);
    const requiredReservesAmount =
      (reserveRequirement / 100) * banksDepositLiabilities;
    if (reserves - amount < requiredReservesAmount) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `${bank.name} Has Insufficient Reserve Requirements`,
        disabled: true,
      };
    }
    return this;
  },
  isReasonableAmount(amount: number) {
    if (amount > 200) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `Bank Will Not Lend This Amount`,
        disabled: true,
      };
    }
    return this;
  },
  isLoanAmount(amount: number, loanAmount: number) {
    if (amount > loanAmount) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `Exceeds Loan Amount`,
        disabled: true,
      };
    }
    return this;
  },
  isDuesAmount(amount: number, loanAmount: number) {
    if (amount > loanAmount) {
      this.checks = {
        ...this.checks,
        error: true,
        errorMessage: `Exceeds Amount Due`,
        disabled: true,
      };
    }
    return this;
  },
  isPayed(amount: number) {
    if (amount <= 0) {
      this.checks = {
        ...this.checks,
        error: false,
        errorMessage: ``,
        disabled: true,
      };
    }
    return this;
  }
};
