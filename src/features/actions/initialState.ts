const actionLists = {
  0: {
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
    ],
    bank: [],
  },
  1: {
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
      { value: "transfer", label: "Transfer Money to Someone" },
    ],
    bank: [],
  },
  2: {
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
      { value: "transfer", label: "Transfer Money to Someone" },
      { value: "getLoan", label: "Take out a Loan" },
      { value: "repayLoan", label: "Repay Loan" },
    ],
    bank: [],
  },
  3: {
    customer: [{ value: "transfer", label: "Transfer Money to Someone" }],
    bank: [{ value: "payDues", label: "Pay Off Dues to Bank" }],
  },
  4: {
    customer: [{ value: "transfer", label: "Transfer Money to Someone" }],
    bank: [
      { value: "settleDues", label: "Settle Dues with Bank" },
      { value: "netDues", label: "Net Dues with Bank" },
    ],
  },
  5: {
    clearinghouse: [
      { value: "settleDues", label: "Settle Dues with Banks" },
      { value: "netDues", label: "Net Dues with Banks" },
    ],
    bank: [],
    customer: [{ value: "transfer", label: "Transfer Money to Someone" }],
  },
  6: {
    centralbank: [
      { value: "settleDues", label: "Settle Dues with Banks" },
      { value: "netDues", label: "Net Dues with Banks" },
    ],
    bank: [
      { value: "bankTransfer", label: "Transfer Money to Bank" },
      { value: "getFedFundsLoan", label: "Get Fed Funds Loan" },
      { value: "payFedFundsLoan", label: "Pay Back a Fed Funds Loan" },
    ],
    customer: [
      { value: "deposit", label: "Deposit Cash into Bank" },
      { value: "withdraw", label: "Withdraw Money from Bank" },
      { value: "transfer", label: "Transfer Money to Someone" },
    ],
  },
};

export const actions = {
  0: {},
  1: actionLists[0],
  2: actionLists[1],
  3: actionLists[1],
  4: actionLists[2],
  5: actionLists[1],
  6: actionLists[1],
  7: {},
  8: actionLists[1],
  9: actionLists[3],
  10: actionLists[4],
  11: actionLists[5],
  12: actionLists[5],
  13: actionLists[5],
  14: actionLists[5],
  15: actionLists[6],
  16: actionLists[6],
  17: actionLists[6],
};

const initialActionData = actions[0];

export default initialActionData;
