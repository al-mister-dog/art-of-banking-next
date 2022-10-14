
import FixedAmountLoan from "../compositions/fixed-amount-loan";
import { Text } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch } from "../../../../../../app/hooks";
import { Banks } from "../../../../../../domain/services/bank";
import { creditData } from "../../../../../../domain/structures/objects";
import { repayFedFundsLoan } from "../../../../../../features/banks/banksSlice";
import { useValidator } from "../../../../../../hooks/useValidator/useValidator";
import { CardInfo } from "../../../types";

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
  function onSelectBank(val, data) {
    setSelectedBank(val);
    setAmount(data[0].owed + data[0].interest);
  }
  const owingBanks = creditData.allIds
    .map((id) => creditData.creditAccounts[id])
    .filter(
      (account) =>
        account.subordinateId === bank.cardInfo.id && account.balance > 0
    )
    .map((account) => {
      const bank = Banks.getById(account.superiorId);
      return {
        value: `${bank.id}`,
        label: bank.name,
        owed: account.balance,
        interest: account.interest,
        interestRate: account.interestRate,
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
    <FixedAmountLoan
      bank={bank}
      label="Repay Loan To"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={owingBanks}
      setSubject={onSelectBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={repayLoanPayload}
      btnText="Repay"
      validation={validation}
    />
  );
}
