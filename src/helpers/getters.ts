import { CardInfo } from "../components/balancesheets/types";
import { Accounts } from "../domain/accounts";
import { Banks } from "../domain/bank";
import { Reserves } from "../domain/reserves";

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
