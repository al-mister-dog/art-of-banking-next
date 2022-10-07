import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { getFedFundsLoan } from "../../../../../features/banks/banksSlice";
import { useState } from "react";
import { Banks } from "../../../../../domain/bank";
import { CardInfo } from "../../../types";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";
import SelectLoan from "../compositions/select-loan";
import { InterestRates } from "../../../../../domain/calculator";

export default function GetFedFundsLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const { interestRate } = useAppSelector(selectSettings);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  function getLoanPayload() {
    const interest = parseFloat(InterestRates.percentage(interestRate, amount));
    const payload = {
      amount,
      interest,
      interestRate, 
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
    <SelectLoan
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
