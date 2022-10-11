import { useAppDispatch } from "../../../../../app/hooks";
import { transfer } from "../../../../../features/banks/banksSlice";

import { useState } from "react";

import { Customer } from "../../../../../domain/services/customer";
import { Banks } from "../../../../../domain/services/bank";

import SelectAndPay from "../compositions/select-and-pay";
import { CardInfo } from "../../../types";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";

export default function TransferToCustomer({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const customers = Customer.get()
    .filter((customer) => customer.id !== bank.cardInfo.id)
    .map((customer) => {
      return { value: customer.id, label: customer.name };
    });

  function checkMultipleBanks(selectedCustomer: string) {
    const bank1 = Banks.getByCustomerId(bank.cardInfo.id);
    const bank2 = Banks.getByCustomerId(parseInt(selectedCustomer));
    return bank1.id !== bank2.id
      ? {
          amount,
          c1: Customer.getById(bank.cardInfo.id),
          c2: Customer.getById(parseInt(selectedCustomer)),
          b1: bank1,
          b2: bank2,
        }
      : {
          amount,
          c1: Customer.getById(bank.cardInfo.id),
          c2: Customer.getById(parseInt(selectedCustomer)),
          b1: Banks.getByCustomerId(bank.cardInfo.id),
        };
  }
  function transferPayload() {
    const payload = checkMultipleBanks(selectedCustomer);
    dispatch(transfer(payload));
    setSelectedCustomer(null);
    setAmount(0);
  }
  const validation = useValidator("transfer", bank, amount, selectedCustomer);
  return (
    <SelectAndPay
      bank={bank}
      label="Transfer To"
      placeholder="Pick a Customer"
      value={selectedCustomer}
      data={customers}
      setSubject={setSelectedCustomer}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={transferPayload}
      btnText="Transfer"
      validation={validation}
    />
  );
}
