import { clearinghouseState } from "../state";
import { clearinghouseText } from "../texts";
export const clearinghouse = {
  title: "clearinghouse",
  steps: {
    1: {
      title: "step1",
      text: clearinghouseText.step1,
    },
    2: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: ["customer1", "customer2", "customer3", "customer4", "bank1"],
      balanceSheetDisplay: ["Customer Deposits", "Customer Overdrafts"],
      text: clearinghouseText.step2,
      state: clearinghouseState.oneBigBank,
    },
    3: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "customer1",
        "customer2",
        "customer3",
        "customer4",
        "bank1",
        "bank2",
      ],
      balanceSheetDisplay: ["Customer Deposits", "Customer Overdrafts", "dues"],
      text: clearinghouseText.step3,
      state: clearinghouseState.multipleBanks,
    },
    4: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "customer1",
        "customer2",
        "customer3",
        "customer4",
        "bank1",
        "bank2",
      ],
      balanceSheetDisplay: [
        "Customer Deposits",
        "Customer Overdrafts",
        "Bank Deposits",
        "bankOverdrafts",
        "dues",
      ],
      text: clearinghouseText.step4,
      state: clearinghouseState.correspondentBanking,
    },
    5: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "customer1",
        "customer2",
        "customer3",
        "customer4",
        "bank1",
        "bank2",
        "clearinghouse",
      ],
      balanceSheetDisplay: [
        "Customer Deposits",
        "Customer Overdrafts",
        "dues",
        "chCertificates",
        "chOverdrafts",
        "chLoans",
      ],
      text: clearinghouseText.step5,
      state: clearinghouseState.clearinghouse,
    },
    6: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "customer1",
        "customer2",
        "customer3",
        "customer4",
        "customer5",
        "customer6",
        "customer7",
        "customer8",
        "bank1",
        "bank2",
        "bank3",
        "bank4",
        "clearinghouse",
      ],
      balanceSheetDisplay: [
        "Customer Deposits",
        "Customer Overdrafts",
        "dues",
        "chCertificates",
        // "chOverdrafts",
        "chLoans",
      ],
      text: clearinghouseText.step6,
      state: clearinghouseState.clearinghouseLoans,
    },
    7: {
      playground: "true",
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "customer1",
        "customer2",
        "customer3",
        "customer4",
        "bank1",
        "bank2",
        "bank3",
        "bank4",
        "clearinghouse",
      ],
      balanceSheetDisplay: [
        "Customer Deposits",
        "Customer Overdrafts",
        "dues",
        "chCertificates",
        // "chOverdrafts",
        "chLoans",
      ],
      text: clearinghouseText.step7,
      state: clearinghouseState.playground,
    },
  },

  nextStep: "the-fed",
};
