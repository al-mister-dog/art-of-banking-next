const actionLists = {
  0: {
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
    ],
    bank: {},
  },
  1: {
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
      { value: "transfer", label: "Transfer Money to Someone" },
    ],
    bank: {},
  },
  
};
export const actions = {
  0: {},
  1: actionLists[0],
  2: actionLists[1],
  3: actionLists[1],
  4: actionLists[1],
  5: actionLists[1],
  6: {},
  7: actionLists[1],
};
