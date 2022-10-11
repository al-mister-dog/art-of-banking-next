import { bankData } from "../structures";

export const Clearinghouse = {
  get() {
    const clearinghouse = Object.keys(bankData.banks)
      .map((key) => bankData.banks[key])
      .filter((bank) => bank.type === "clearinghouse")[0];
    return clearinghouse;
  },
  
};
