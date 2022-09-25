import { Banks } from "../../domain/bank";
import { BankingSystem } from "../../domain/banking-system";
import { Customer } from "../../domain/customer";
import { bankData, clearBankData } from "../../domain/structures";
import { System } from "../../domain/system";

export type SetupFunctions = { [key: string]: any };
export const setupFunctions: SetupFunctions = {
  0() {},
  1() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer", 200);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },

  2() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer", 200);
    BankingSystem.createBank("Customer 2", "customer", 200);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
  },
  3() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
  },
  4() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank", 100);
    BankingSystem.createBank("Customer 1", "customer", 150);
    BankingSystem.createBank("Customer 2", "customer", 150);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
  },
  5() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank", 100);
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
  },
  6() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
  },
  7() {},
  8() {
    
    clearBankData();
    System.setSystem("national")
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    BankingSystem.createBank("Customer 3", "customer", 100);
    BankingSystem.createBank("Customer 4", "customer", 100);
    Customer.createAccount(bankData.banks[1], bankData.banks[0]);
    Customer.createAccount(bankData.banks[2], bankData.banks[0]);
    Customer.createAccount(bankData.banks[3], bankData.banks[0], 50);
    Customer.createAccount(bankData.banks[4], bankData.banks[0], 50);
    
  },
  9() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Bank 2", "bank");
    BankingSystem.createBank("Customer 1", "customer", 50);
    BankingSystem.createBank("Customer 2", "customer", 50);
    Customer.createAccount(bankData.banks[2], bankData.banks[0], 50);
    Customer.createAccount(bankData.banks[3], bankData.banks[1], 50);
    // BankingSystem.createBank("Customer 3", "customer", 50);
    // BankingSystem.createBank("Customer 4", "customer", 50);
    // Customer.createAccount(bankData.banks[2], bankData.banks[0], 50);
    // Customer.createAccount(bankData.banks[3], bankData.banks[0], 50);
    // Customer.createAccount(bankData.banks[4], bankData.banks[1], 50);
    // Customer.createAccount(bankData.banks[5], bankData.banks[1], 50);
  },
  10() {
    clearBankData();
    System.setSystem("correspondent");
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Bank 2", "bank");
    BankingSystem.createBank("Bank 3", "bank");
    Banks.createAccount(bankData.banks[0], bankData.banks[1], 100);
    Banks.createAccount(bankData.banks[0], bankData.banks[2], 100);
    Banks.createAccount(bankData.banks[1], bankData.banks[0], 100);
    Banks.createAccount(bankData.banks[1], bankData.banks[2], 100);
    Banks.createAccount(bankData.banks[2], bankData.banks[0], 100);
    Banks.createAccount(bankData.banks[2], bankData.banks[1], 100);
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    BankingSystem.createBank("Customer 3", "customer", 100);
    Customer.createAccount(bankData.banks[3], bankData.banks[0], 100);
    Customer.createAccount(bankData.banks[4], bankData.banks[1], 100);
    Customer.createAccount(bankData.banks[5], bankData.banks[2], 100);
    Customer.transfer(
      20,
      bankData.banks[3],
      bankData.banks[4],
      bankData.banks[0],
      bankData.banks[1]
    );
    Customer.transfer(
      15,
      bankData.banks[4],
      bankData.banks[3],
      bankData.banks[1],
      bankData.banks[0]
    );
    Customer.transfer(
      20,
      bankData.banks[4],
      bankData.banks[5],
      bankData.banks[1],
      bankData.banks[2]
    );
    Customer.transfer(
      10,
      bankData.banks[5],
      bankData.banks[4],
      bankData.banks[2],
      bankData.banks[1]
    );
    Customer.transfer(
      20,
      bankData.banks[3],
      bankData.banks[5],
      bankData.banks[0],
      bankData.banks[2]
    );
    Customer.transfer(
      10,
      bankData.banks[5],
      bankData.banks[3],
      bankData.banks[2],
      bankData.banks[0]
    );
  },
  11() {
    clearBankData();
    System.setSystem("clearinghouse");
    BankingSystem.createBank("Customer 1", "customer", 100);
    BankingSystem.createBank("Customer 2", "customer", 100);
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Bank 2", "bank");
    
    Customer.createAccount(bankData.banks[1], bankData.banks[3], 100);
    Customer.createAccount(bankData.banks[2], bankData.banks[4], 100);
    Customer.transfer(40, bankData.banks[1], bankData.banks[2], bankData.banks[3], bankData.banks[4])
    Customer.transfer(50, bankData.banks[2], bankData.banks[1], bankData.banks[4], bankData.banks[3])
  },
  12() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  13() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  14() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  15() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  16() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  17() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  18() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
  19() {
    clearBankData();
    BankingSystem.createBank("Bank 1", "bank");
    BankingSystem.createBank("Customer 1", "customer");
    Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);
  },
};

// 10() {
//   clearBankData();
//   System.setSystem("correspondent")
//   BankingSystem.createBank("Bank 1", "bank");
//   BankingSystem.createBank("Bank 2", "bank");
//   Banks.createAccount(bankData.banks[0], bankData.banks[1], 100)
//   Banks.createAccount(bankData.banks[1], bankData.banks[0], 100)
//   BankingSystem.createBank("Customer 1", "customer", 100);
//   BankingSystem.createBank("Customer 2", "customer", 100);
//   Customer.createAccount(bankData.banks[2], bankData.banks[0], 100);
//   Customer.createAccount(bankData.banks[3], bankData.banks[1], 100);
//   Customer.transfer(20, bankData.banks[2], bankData.banks[3], bankData.banks[0], bankData.banks[1])
//   Customer.transfer(30,  bankData.banks[3], bankData.banks[2], bankData.banks[1], bankData.banks[0])
//   Customer.transfer(10, bankData.banks[2], bankData.banks[3], bankData.banks[0], bankData.banks[1])
//   Customer.transfer(20,  bankData.banks[3], bankData.banks[2], bankData.banks[1], bankData.banks[0])
//   Customer.transfer(40, bankData.banks[2], bankData.banks[3], bankData.banks[0], bankData.banks[1])
//   Customer.transfer(40,  bankData.banks[3], bankData.banks[2], bankData.banks[1], bankData.banks[0])
// },
