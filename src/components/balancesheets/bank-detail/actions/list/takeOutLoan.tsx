import { useAppDispatch } from "../../../../../app/hooks";
import { getLoan } from "../../../../../features/banks/banksSlice";

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
  
  function getLoanPayload() {
    const payload = {
      amount,
      c1: Customer.getById(bank.cardInfo.id),
      c2: Customer.getById(parseInt(selectedBank)),
      b1: Banks.getByCustomerId(bank.cardInfo.id),
    };
    dispatch(getLoan(payload));
  }

  const banks = Banks.getAllByCustomerId(bank.cardInfo.id).map((bank) => {
    return { value: `${bank.id}`, label: bank.name };
  });

  const validation = useValidator("getLoan", bank, amount, selectedBank);

  return (
    <SelectAndPay
      bank={bank}
      label="Get Loan From"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={banks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={getLoanPayload}
      btnText="Get Loan"
      validation={validation}
    />
  );
}
