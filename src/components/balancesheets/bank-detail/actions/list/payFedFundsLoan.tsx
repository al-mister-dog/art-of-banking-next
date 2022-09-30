import { useAppDispatch } from "../../../../../app/hooks";
import { repayFedFundsLoan } from "../../../../../features/banks/banksSlice";
import { useState } from "react";
import { Banks } from "../../../../../domain/bank";
import { Customer } from "../../../../../domain/customer";
import { CardInfo } from "../../../types";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";
import { creditData } from "../../../../../domain/structures";
import FixedAmount from "../compositions/fixed-amount";
import { Text } from "@mantine/core";

export default function PayFedFundsLoan({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  function repayLoanPayload() {
    const payload = {
      amount,
      b1: Banks.getById(bank.cardInfo.id),
      b2: Banks.getById(parseInt(selectedBank)),
    };
    dispatch(repayFedFundsLoan(payload));
  }

  const owingBanks = creditData.allIds
    .map((id) => creditData.creditAccounts[id])
    .filter((account) => account.subordinateId === bank.cardInfo.id)
    .map((account) => {
      const bank = Banks.getById(account.superiorId);
      return {
        value: `${bank.id}`,
        label: bank.name,
        owed: account.balance,
      };
    });

  const validation = useValidator(
    "payFedFundsLoan",
    bank,
    amount,
    selectedBank
  );
  if (owingBanks.length === 0 || owingBanks[0].owed <= 0) {
    return <Text>No Loans To Repay</Text>;
  }
  return (
    <FixedAmount
      bank={bank}
      label="Repay Loan To"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={owingBanks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={repayLoanPayload}
      btnText="Repay"
      validation={validation}
    />
  );
}
