import { useAppDispatch } from "../../../../../app/hooks";
import { getFedFundsLoan } from "../../../../../features/banks/banksSlice";

import { useState } from "react";

import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";

import { CardInfo } from "../../../types";

import SelectAndPay from "../compositions/select-and-pay";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";

export default function GetFedFundsLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  function getLoanPayload() {
    const payload = {
      amount,
      b1: Banks.getById(bank.cardInfo.id),
      b2: Banks.getById(parseInt(selectedBank)),
    };
    dispatch(getFedFundsLoan(payload));
  }

  const thisBankId = bank.cardInfo.id;
  const banks = Banks.getAll()
    .filter((bank) => bank.type === "bank" && bank.id !== thisBankId)
    .map((bank) => {
      return { value: `${bank.id}`, label: bank.name };
    });

  const validation = useValidator(
    "getFedFundsLoan",
    bank,
    amount,
    selectedBank
  );

  return (
    <SelectAndPay
      bank={bank}
      label="Get Loan From"
      placeholder="Pick a Bank With Excess Reserves"
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
