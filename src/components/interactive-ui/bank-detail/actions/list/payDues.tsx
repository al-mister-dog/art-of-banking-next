import { useAppDispatch } from "../../../../../app/hooks";
import { payDues } from "../../../../../features/banks/banksSlice";
import { useState } from "react";
import { Banks } from "../../../../../domain/services/bank";
import { Customer } from "../../../../../domain/services/customer";
import { CardInfo } from "../../../types";
import { useValidator } from "../../../../../hooks/useValidator/useValidator";
import { creditData } from "../../../../../domain/structures";
import FixedAmount from "../compositions/fixed-amount";
import { Text } from "@mantine/core";

export default function PayDues({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);

  function payDuesPayload() {
    const payload = {
      amount,
      b1: Banks.getById(bank.cardInfo.id),
      b2: Banks.getById(parseInt(selectedBank)),
    };
    dispatch(payDues(payload));
  }

  const owingBanks = creditData.allIds
    .map((id) => creditData.creditAccounts[id])
    .filter(
      (account) =>
        account.subordinateId === bank.cardInfo.id &&
        account.category === "dues"
    )
    .map((account) => {
      const bank = Banks.getById(account.superiorId);
      return {
        value: `${bank.id}`,
        label: bank.name,
        owed: account.balance,
      };
    });

  const validation = useValidator("payDues", bank, amount, selectedBank);
  
  if (
    owingBanks.length === 0 ||
    owingBanks[0].value === bank.cardInfo.id.toString()
  ) {
    return <Text>No Dues To Pay</Text>;
  }
  return (
    <FixedAmount
      bank={bank}
      label="Pay Dues To"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={owingBanks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={payDuesPayload}
      btnText="Pay Dues"
      validation={validation}
    />
  );
}
