import { theFedState } from "../state"
import { theFedText } from "../texts"
export const theFed = {
  title: "The Fed",
  steps: {
    1: {
      title: "step1",
      text: theFedText.step1,
    },
    2: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: ["bank1", "bank2", "bank3", "centralbank"],
      balanceSheetDisplay: [
        "Bank Deposits",
        "daylightOverdrafts",
        "bankLoans",
        "Customer Deposits",
        "Customer Overdrafts",
      ],
      text: theFedText.step2,
      state: theFedState.daylightOverdraft,
    },
    3: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "bank1",
        "bank2",
        "bank3",
        "centralbank",
        "customer1",
        "customer2",
        "customer3",
      ],
      balanceSheetDisplay: [
        "Bank Deposits",
        "daylightOverdrafts",
        "bankLoans",
        "Customer Deposits",
      ],
      text: theFedText.step3,
      state: theFedState.fedFundsMarket,
    },
    4: {
      overdraft: true,
      credit: true,
      constraint: false,
      parties: [
        "bank1",
        "bank2",
        "bank3",
        "centralbank",
        "customer1",
        "customer2",
      ],
      balanceSheetDisplay: [
        "Bank Deposits",
        "daylightOverdrafts",
        "bankLoans",
        "properties",
        "Customer Deposits",
        "mortgages",
      ],
      text: theFedText.step4,
      state: theFedState.mortgages,
    },
  },
  nextStep: "medici",
}