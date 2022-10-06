import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { getLoan } from "../../../../../features/banks/banksSlice";

import { useState } from "react";

import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";

import { CardInfo } from "../../../types";

import SelectLoan from "../compositions/select-loan";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { InterestRates } from "../../../../../domain/calculator";

export default function TakeOutLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const { interestRate } = useAppSelector(selectSettings);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  
  function getLoanPayload() {
    const interest = parseFloat(InterestRates.percentage(interestRate, amount));
    const payload = {
      amount,
      interest,
      c1: Customer.getById(bank.cardInfo.id),
      b1: Banks.getByCustomerId(bank.cardInfo.id),
    };
    dispatch(getLoan(payload));
  }

  const banks = Banks.getAllByCustomerId(bank.cardInfo.id).map((bank) => {
    return { value: `${bank.id}`, label: bank.name };
  });

  const validation = useValidator("getLoan", bank, amount, selectedBank);

  return (
    <SelectLoan
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
