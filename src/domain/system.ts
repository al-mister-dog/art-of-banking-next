import { BankingSystem } from "./banking-system";
import { Dues } from "./dues";
import { Bank, bankData, SystemType } from "./structures";
import { Accounts } from "./accounts";
import { Clearinghouse } from "./clearinghouse";
export let system: SystemType = "national";

type SystemObjectFunctions = {
  [key in SystemType]: () => void;
};

const ClearinghouseObserver = {
  subscribers: [] as any[],
  subscribe(fn: any) {
    this.subscribers.push(fn);
  },
  trigger() {
    this.subscribers[0]();
  },
};
export const System = {
  setSystem(systemType: SystemType) {
    system = systemType;
    const setup: SystemObjectFunctions = {
      clearinghouse: function (): void {
        BankingSystem.createBank("clearinghouse", "clearinghouse", 200);
      },
      national: function (): void {
        return;
      },
      centralbank: function (): void {
        BankingSystem.createBank("centralbank", "centralbank");
      },
      correspondent: function (): void {},
      chips: function (): void {},
    };
    setup[systemType]();
  },
  getSystem() {
    return system;
  },
  handleDues(bank1: Bank, bank2: Bank, amount: number) {
    const systemType: SystemObjectFunctions = {
      national: function (): void {
        Dues.increase(bank1, bank2, "Customer Deposits", amount);
      },
      correspondent: function (): void {
        Dues.increase(bank1, bank2, "Customer Deposits", amount);
      },
      clearinghouse: function (): void {
        const clearinghouse = Clearinghouse.get();
        Dues.increase(bank1, clearinghouse, "ch certificates", amount);
        Dues.increase(clearinghouse, bank2, "ch certificates", amount);
      },
      centralbank: function (): void {},
      chips: function (): void {
        throw new Error("Function not implemented.");
      },
    };
    systemType[system]();
  },
  handleAfterTransfer(
    bank1: Bank,
    bank2: Bank,
    amount: number,
    increase?: boolean
  ) {
    const systemType: SystemObjectFunctions = {
      national: function (): void {
        if (Dues.owed(bank1, bank2)) {
          Dues.decrease(bank1, bank2, "Bank Deposits", amount);
        }
      },
      correspondent: function (): void {
        Dues.owed(bank1, bank2);
        if (Dues.owed(bank1, bank2)) {
          Dues.decrease(bank1, bank2, "Bank Deposits", amount);
        }
      },
      clearinghouse: function (): void {
        throw new Error("Function not implemented.");
      },
      centralbank: function (): void {
        throw new Error("Function not implemented.");
      },
      chips: function (): void {
        throw new Error("Function not implemented.");
      },
    };
    systemType[system]();
  },
  joinSystem(bank: Bank, initialDeposit?: number) {
    const systemType: SystemObjectFunctions = {
      national: function (): void {},
      correspondent: function (): void {},
      clearinghouse: function (): void {
        if (bank.type === "bank") {
          const clearinghouse = bankData.banks[0];
          Accounts.createAccount(bank, clearinghouse, "ch certificates", 100);
        }
      },
      centralbank: function (): void {
        if (bank.type === "bank") {
          const centralbank = bankData.banks[0];
          Accounts.createAccount(bank, centralbank, "Bank Deposits", initialDeposit);
        }
      },
      chips: function (): void {},
    };
    systemType[system]();
  },
};
