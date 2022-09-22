import { BankingSystem } from "../../domain/banking-system";
import { Customer } from "../../domain/customer";
import { bankData } from "../../domain/structures";

BankingSystem.createBank("Bank 1", "bank");
BankingSystem.createBank("Customer 1", "customer", 150);
Customer.createAccount(bankData.banks[1], bankData.banks[0], 100);

const initialBankData = JSON.parse(JSON.stringify(bankData))

export default initialBankData