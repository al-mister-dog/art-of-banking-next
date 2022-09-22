interface ReservesAccount {
  id: number;
  cashReserves: number;
}

interface ReservesAccounts {
  [key: string]: ReservesAccount;
}

interface ReservesData {
  id: number;
  reservesAccounts: ReservesAccounts;
}
export let reservesData = {
  id: 0,
  reservesAccounts: {} as ReservesAccounts,
};

export const ReservesData = {
  assign(newReservesData: ReservesData) {
    reservesData = { ...newReservesData };
  },
  assignReservesAccounts(reservesAccounts: ReservesAccounts) {
    reservesData = { ...reservesData, reservesAccounts };
  },
};
