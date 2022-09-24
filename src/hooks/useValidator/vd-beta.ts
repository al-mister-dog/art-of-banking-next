import { CardInfo } from "../../components/balancesheets/types";
import { Loans } from "../../domain/loans";
import { Reserves } from "../../domain/reserves";
import { creditData } from "../../domain/structures";
import { getTransferDetails, getWithdrawDetails } from "../../helpers/getters";
import { check } from "./check";

const validatorsByLecture = (
  customer: CardInfo,
  amount: number,
  selectedBank: string,
  overdraft: number,
  reserveRequirement: number
) => ({
  simple: {
    bank: {},
    customer: {
      deposit() {
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
      withdraw() {
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
      transfer() {
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
      deposit() {
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
      withdraw() {
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
      transfer() {
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
      deposit() {
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
      withdraw() {
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
      transfer() {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isOverdraftLimit(customerDeposits, overdraft, amount)
          .validate();
      },
      getLoan() {
        const { customerDeposits, bankReserves, bank } =
          getTransferDetails(customer);
        return check
          .isAmount(amount)
          .isSelectedBank(selectedBank)
          .isPositiveAmount(amount)
          .isReasonableAmount(amount)
          .validate();
      },
      repayLoan() {
        const loan = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
              account.superiorId === parseInt(selectedBank)
          );
        if (loan.length > 0) {
          const loanAmount = loan[0].balance;

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
      deposit() {
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
      withdraw() {
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
      transfer() {
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
      payDues() {
        const dues = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
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
      transfer() {
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
      settleDues() {
        return check.isPayed(amount).validate();
      },
    },
    bank: {
      settleDues() {
        const dues = creditData.allIds
          .map((id) => creditData.creditAccounts[id])
          .filter(
            (account) =>
              account.subordinateId === customer.cardInfo.id &&
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
      netDues() {
        return check.validate();
      },
    },
    customer: {
      transfer() {
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
});

export const validatorsById = (
  customer: CardInfo,
  amount: number,
  selectedBank: string,
  overdraft: number,
  reserveRequirement: number
) => ({
  validate: validatorsByLecture(
    customer,
    amount,
    selectedBank,
    overdraft,
    reserveRequirement
  ),
  0() {
    this.validate.simple;
  },
  1() {
    this.validate.simple;
  },
  2() {
    this.validate.simple;
  },
  3() {
    this.validate.simpleOverdraft;
  },
  4() {
    this.validate.loans;
  },
  5() {
    this.validate.simpleOverdraftReserveRequirement;
  },
  6() {
    this.validate.simple;
  },
  7() {
    this.validate.simple;
  },
  8() {
    this.validate.simple;
  },
  9() {
    this.validate.dues1;
  },
  10() {
    this.validate.dues2;
  },
  11() {
    this.validate.dues2;
  },
});
