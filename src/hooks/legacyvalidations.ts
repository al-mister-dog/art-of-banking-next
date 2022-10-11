import { CardInfo } from "../components/interactive-ui/types";
import { Reserves } from "../domain/services/reserves";
import { Banks } from "../domain/services/bank";
import { Accounts } from "../domain/services/accounts";
import { getTransferDetails, getWithdrawDetails } from "../helpers/getters";

const check = {
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
};

const validatorsByLecture = {
  simple: {
    bank: {},
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();

        if (!amount) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (selectedBank === null || selectedBank === undefined) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (amount <= 0) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (customerReserves.cashReserves - amount < 0) {
          return {
            error: true,
            errorMessage: `${customer.cardInfo.name} Has Insufficient Reserves`,
            disabled: true,
          };
        }
        return {
          error: false,
          errorMessage: "",
          disabled: false,
        };
      },
      withdraw(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetails(customer);
        if (!amount) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (selectedBank === null || selectedBank === undefined) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (amount <= 0) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (bankReserves - amount < 0) {
          return {
            error: true,
            errorMessage: `${bank.name} Has Insufficient Reserves`,
            disabled: true,
          };
        }
        if (customerDeposits < amount) {
          return {
            error: true,
            errorMessage: `${customer.cardInfo.name} Has Insufficient Deposits`,
            disabled: true,
          };
        }
        return {
          error: false,
          errorMessage: "",
          disabled: false,
        };
      },
      transfer(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);

        if (!amount) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (!selectedBank) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (amount <= 0) {
          return {
            error: false,
            errorMessage: "",
            disabled: true,
          };
        }
        if (bankReserves - amount < 0) {
          return {
            error: true,
            errorMessage: `${bank.name} Has Insufficient Reserves`,
            disabled: true,
          };
        }
        if (customerDeposits < amount) {
          return {
            error: true,
            errorMessage: `${customer.cardInfo.name} Has Insufficient Deposits`,
            disabled: true,
          };
        }
        return {
          error: false,
          errorMessage: "",
          disabled: false,
        };
      },
    },
  },
  simpleOverdraft: {},
};

export const validatorsById = {
  0: validatorsByLecture.simple,
  1: validatorsByLecture.simple,
  2: validatorsByLecture.simple,
  3: validatorsByLecture.simpleOverdraft,
};
