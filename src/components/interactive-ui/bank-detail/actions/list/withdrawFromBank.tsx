import { useAppDispatch } from "../../../../../app/hooks";
import { withdraw } from "../../../../../features/banks/banksSlice";

import { useState } from "react";

import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";

import { CardInfo } from "../../../types";

import SelectAndPay from "../compositions/select-and-pay";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";

export default function WithdrawFromBank({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  function withdrawPayload() {
    const payload = {
      amount,
      c1: Customer.getById(bank.cardInfo.id),
      b1: Banks.getById(parseInt(selectedBank)),
    };
    dispatch(withdraw(payload));
  }
  const banks = Banks.getAllByCustomerId(bank.cardInfo.id).map((bank) => {
    return { value: `${bank.id}`, label: bank.name };
  });
  
  const validation = useValidator("withdraw", bank, amount, selectedBank);

  return (
    <SelectAndPay
      bank={bank}
      label="Withdraw From"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={banks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={withdrawPayload}
      btnText="Withdraw"
      validation={validation}
    />
  );
}
