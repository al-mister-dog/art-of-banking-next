import { useAppDispatch } from "../../../../../app/hooks";
import { deposit } from "../../../../../features/banks/banksSlice";

import { useState } from "react";

import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";

import { CardInfo } from "../../../types";

import SelectAndPay from "../compositions/select-and-pay";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";

export default function DepositIntoBank({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  
  function depositPayload() {
    const payload = {
      amount,
      c1: Customer.getById(bank.cardInfo.id),
      c2: Customer.getById(parseInt(selectedBank)),
      b1: Banks.getByCustomerId(bank.cardInfo.id),
    };
    dispatch(deposit(payload));
  }

  const banks = Banks.getAllByCustomerId(bank.cardInfo.id).map((bank) => {
    return { value: `${bank.id}`, label: bank.name };
  });

  const validation = useValidator("deposit", bank, amount, selectedBank);

  return (
    <SelectAndPay
      bank={bank}
      label="Deposit Into"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={banks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={depositPayload}
      btnText="Deposit"
      validation={validation}
    />
  );
}