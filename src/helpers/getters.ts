import { Accounts } from "../domain/services/accounts";
import { Banks } from "../domain/services/bank";
import { Reserves } from "../domain/services/reserves";
import { CardInfo } from "../types";

export function getCustomerReserves(customer: CardInfo) {
  const customerReserves = Reserves.getReservesById(customer.cardInfo.id);
  return customerReserves.cashReserves;
}

export function getWithdrawDetails(customer: CardInfo) {
  const customerDeposits = Accounts.getAccountById(customer.cardInfo.id);
  const bank = Banks.getByCustomerId(customer.cardInfo.id);
  const customerBankReserves = Reserves.getReservesById(bank.id);
  return {
    customerDeposits: customerDeposits.balance,
    bankReserves: customerBankReserves.cashReserves,
    bank,
  };
}

export function getWithdrawDetailsFed(customer: CardInfo) {
  const customerDeposits = Accounts.getAccountById(customer.cardInfo.id);
  const bank = Banks.getByCustomerId(customer.cardInfo.id);
  const bankAccount = Accounts.getAccountById(bank.id);
  return {
    customerDeposits: customerDeposits.balance,
    bankReserves: bankAccount,
    bank,
  };
}

export function getTransferDetails(customer: CardInfo) {
  const customerDeposits = Accounts.getAccountById(customer.cardInfo.id);
  const bank = Banks.getByCustomerId(customer.cardInfo.id);
  const customerBankReserves = Reserves.getReservesById(bank.id);
  return {
    customerDeposits: customerDeposits.balance,
    bankReserves: customerBankReserves.cashReserves,
    bank,
  };
}
