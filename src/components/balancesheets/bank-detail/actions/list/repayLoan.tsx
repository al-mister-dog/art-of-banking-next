import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { repayLoan } from "../../../../../features/banks/banksSlice";
import { useState } from "react";
import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";
import { CardInfo } from "../../../types";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";
import { creditData } from "../../../../../domain/structures";
import FixedAmount from "../compositions/fixed-amount-by-type";
import { Text } from "@mantine/core";
import { InterestRates } from "../../../../../domain/calculator";
import { selectSettings } from "../../../../../features/settings/settingsSlice";

export default function RepayLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const { interestRate } = useAppSelector(selectSettings);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [paymentType, setPaymentType] = useState("deposits");

  function repayLoanPayload() {
    const interest = parseFloat(InterestRates.percentage(interestRate, amount));
    const plusInterest = amount + interest;
    console.log(plusInterest);
    const payload = {
      amount: plusInterest,
      c1: Customer.getById(bank.cardInfo.id),
      b1: Banks.getByCustomerId(bank.cardInfo.id),
      paymentType,
    };
    dispatch(repayLoan(payload));
  }

  const owingBanks = creditData.allIds
    .map((id) => creditData.creditAccounts[id])
    .filter((account) => account.subordinateId === bank.cardInfo.id && account.balance > 0)
    .map((account) => {
      const bank = Banks.getById(account.superiorId);
      return {
        value: `${bank.id}`,
        label: bank.name,
        owed: account.balance,
      };
    });
  console.log(owingBanks);
  const validation = useValidator("repayLoan", bank, amount, selectedBank);
  if (owingBanks.length === 0 || owingBanks[0].owed <= 0) {
    return <Text>No Loans To Repay</Text>;
  }
  return (
    <>
      {/* loan amount  */}
      <FixedAmount
        bank={bank}
        label="Repay Loan To"
        placeholder="Pick a Bank"
        value={selectedBank}
        data={owingBanks}
        setSubject={setSelectedBank}
        amount={amount}
        setAmount={setAmount}
        paymentType={paymentType}
        setPaymentType={setPaymentType}
        dispatchFunction={repayLoanPayload}
        btnText="Repay"
        validation={validation}
        isLoan={true}
      />
    </>
  );
}
