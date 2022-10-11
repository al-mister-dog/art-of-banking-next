import { Bank, reservesData, ReservesData } from "../structures";

export const Reserves = {
  getReserves(bank: Bank) {
    return reservesData.reserves[bank.id];
  },
  getReservesById(id: number) {
    return reservesData.reserves[id];
  },
  increaseReserves(bank: Bank, amount: number) {
    let reserves = { ...reservesData.reserves[bank.id] };
    reserves.cashReserves += amount;
    ReservesData.assignReservesAccounts(reserves);
  },
  decreaseReserves(bank: Bank, amount: number) {
    let reserves = { ...reservesData.reserves[bank.id] };
    reserves.cashReserves -= amount;
    ReservesData.assignReservesAccounts(reserves);
  },
};
