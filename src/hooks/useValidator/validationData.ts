import { CardInfo } from "../../components/interactive-ui/types";
import { Reserves } from "../../domain/reserves";
import { creditData } from "../../domain/structures";
import {
  getTransferDetails,
  getWithdrawDetails,
  getWithdrawDetailsFed,
} from "../../helpers/getters";
import { check } from "./check";

const validatorsByLecture = {
  simple: {
    bank: {},
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .requiredFields(selectedBank, amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();
      },
      withdraw(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(bankReserves, amount, bank.name)
          .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
          .validate();
      },
      transfer(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(bankReserves, amount, bank.name)
          .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
          .validate();
      },
    },
  },
  simpleOverdraft: {
    bank: {},
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .requiredFields(selectedBank, amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();
      },
      withdraw(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetails(customer);

        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(bankReserves, amount, bank.name)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
      transfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
    },
  },
  loans: {
    bank: {},
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .requiredFields(selectedBank, amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();
      },
      withdraw(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetails(customer);

        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(bankReserves, amount, bank.name)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
      transfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
      getLoan(customer: CardInfo, amount: number, selectedBank: string) {
        const owingBanks = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
              // account.superiorId === parseInt(selectedBank) &&
              account.balance > 0
          );
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .currentLoan(owingBanks)
          .isReasonableAmount(amount) //work on this obviously
          .validate();
      },
      repayLoan(customer: CardInfo, amount: number, selectedBank: string) {
        const loans = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
              account.superiorId === parseInt(selectedBank) &&
              account.balance > 0
          );
        if (loans.length > 0) {
          const loanAmount = loans[0].balance + loans[0].interest;

          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .isLoanAmount(amount, loanAmount)
            .validate();
        } else
          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .validate();
      },
    },
  },
  simpleOverdraftReserveRequirement: {
    bank: {},
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .requiredFields(selectedBank, amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();
      },
      withdraw(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetails(customer);

        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .sufficientReserves(bankReserves, amount, bank.name)
          .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
      transfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
          .validate();
      },
    },
  },
  dues1: {
    bank: {
      payDues(bank: CardInfo, amount: number, selectedBank: string) {
        const dues = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === bank.cardInfo.id &&
              account.superiorId === parseInt(selectedBank) &&
              account.category === "dues"
          );
        if (dues.length > 0) {
          const duesAmount = dues[0].balance;

          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .isDuesAmount(amount, duesAmount)
            .validate();
        } else
          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .validate();
      },
    },
    customer: {
      transfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
          .validate();
      },
    },
  },
  dues2: {
    clearinghouse: {
      netDues() {
        return check.validate();
      },
      settleDues(bank: CardInfo, amount: number) {
        return check.isPayed(amount).validate();
      },
    },
    bank: {
      settleDues(bank: CardInfo, amount: number, selectedBank: string) {
        const dues = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === bank.cardInfo.id &&
              account.superiorId === parseInt(selectedBank) &&
              account.category === "dues"
          );
        if (dues.length > 0) {
          const duesAmount = dues[0].balance;

          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .validate();
        } else
          return check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .validate();
      },
      netDues(bank: CardInfo, amount: number, selectedBank: string) {
        return check.validate();
      },
      payDues() {
        return check.validate();
      },
    },
    customer: {
      transfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return (
          check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .isOverdraftLimit(customerDeposits, overdraft, amount)
            .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
            // .sufficientReserves(bankReserves, amount, bank.name)
            // .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
            .validate()
        );
      },
    },
  },
  fed: {
    centralbank: {},
    bank: {
      bankTransfer(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .validate();
      },
      getFedFundsLoan(
        customer: CardInfo,
        amount: number,
        selectedBank: string
      ) {
        const owingBanks = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
              account.superiorId === parseInt(selectedBank) &&
              account.balance > 0
          );
        return (
          check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .currentLoan(owingBanks)
            // .isOverdraftLimit(customerDeposits, overdraft, amount)
            // .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
            // .sufficientReserves(bankReserves, amount, bank.name)
            // .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
            .validate()
        );
      },
      payFedFundsLoan(
        customer: CardInfo,
        amount: number,
        selectedBank: string,
        overdraft: number,
        reserveRequirement: number
      ) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return (
          check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .isOverdraftLimit(customerDeposits, overdraft, amount)
            // .isRequiredReserves(bankReserves, reserveRequirement, amount, bank)
            // .sufficientReserves(bankReserves, amount, bank.name)
            // .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
            .validate()
        );
      },
    },
    customer: {
      deposit(customer: CardInfo, amount: number, selectedBank: string) {
        const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
        return check
          .requiredFields(selectedBank, amount)
          .sufficientReserves(
            customerReserves.cashReserves,
            amount,
            customer.cardInfo.name
          )
          .validate();
      },
      withdraw(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getWithdrawDetailsFed(customer);

        return (
          check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            .sufficientReservesFed(bank, bankReserves, amount)
            // .sufficientReserves(bankReserves, amount, bank.name)
            // .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
            .validate()
        );
      },
      transfer(customer: CardInfo, amount: number, selectedBank: string) {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return (
          check
            .isAmount(amount)
            .isSelectedBank(selectedBank)
            .isPositiveAmount(amount)
            // .sufficientReserves(bankReserves, amount, bank.name)
            .sufficentDeposits(customerDeposits, amount, customer.cardInfo.name)
            .validate()
        );
      },
    },
  },
};

export const validatorsById = {
  0: validatorsByLecture.simple,
  1: validatorsByLecture.simple,
  2: validatorsByLecture.simple,
  3: validatorsByLecture.simpleOverdraft,
  4: validatorsByLecture.loans,
  5: validatorsByLecture.simpleOverdraftReserveRequirement,
  6: validatorsByLecture.simple,
  7: validatorsByLecture.simple,
  8: validatorsByLecture.simple,
  9: validatorsByLecture.dues1,
  10: validatorsByLecture.dues2,
  11: validatorsByLecture.dues2,
  12: validatorsByLecture.dues2,
  13: validatorsByLecture.dues2,
  14: validatorsByLecture.simple,
  15: validatorsByLecture.fed,
  16: validatorsByLecture.fed,
  17: validatorsByLecture.fed,
  18: validatorsByLecture.fed,
};
