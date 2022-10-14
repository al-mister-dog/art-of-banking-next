import { useState } from "react";
import { useAppDispatch } from "../../../../../../app/hooks";
import { InterestRates } from "../../../../../../domain/calculators/interest-rates";
import { Banks } from "../../../../../../domain/services/bank";
import { Customer } from "../../../../../../domain/services/customer";
import { getLoan } from "../../../../../../features/banks/banksSlice";
import { useValidator } from "../../../../../../hooks/useValidator/useValidator";
import { CardInfo } from "../../../types";
import SelectLoan from "../compositions/select-loan";


export default function GetLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();

  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);

  function getLoanPayload() {
    const interest = parseFloat(InterestRates.percentage(interestRate, amount));
    const payload = {
      amount,
      interest,
      interestRate,
      c1: Customer.getById(bank.cardInfo.id),
      b1: Banks.getByCustomerId(bank.cardInfo.id),
    };
    dispatch(getLoan(payload));
  }

  const banks = Banks.getAllByCustomerId(bank.cardInfo.id).map((bank) => {
    return { value: `${bank.id}`, label: bank.name };
  });

  const validation = useValidator("getLoan", bank, amount, selectedBank);

  function onSetInterestRate(value) {
    if (value === undefined) {
      setInterestRate(0);
    } else {
      setInterestRate(value);
    }
  }

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
      interestRate={interestRate}
      setInterestRate={onSetInterestRate}
      dispatchFunction={getLoanPayload}
      btnText="Get Loan"
      validation={validation}
    />
  );
}
