import { useState } from "react";
import SelectAndPay from "../compositions/select-and-pay";
import { CardInfo } from "../../../types";
import { useAppDispatch } from "../../../../../../app/hooks";
import { Banks } from "../../../../../../domain/services/bank";
import { bankTransfer } from "../../../../../../features/banks/banksSlice";
import { useValidator } from "../../../../../../hooks/useValidator/useValidator";

export default function TransferToBank({ bank }: { bank: CardInfo }) {
  const dispatch = useAppDispatch();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const banks = Banks.get()
    .filter((customer) => customer.id !== bank.cardInfo.id)
    .map((customer) => {
      return { value: customer.id, label: customer.name };
    });

  function transferPayload() {
    const payload = {
      amount,
      b1: Banks.getById(bank.cardInfo.id),
      b2: Banks.getById(parseInt(selectedBank)),
    };

    dispatch(bankTransfer(payload));
    setSelectedBank(null);
    setAmount(0);
  }
  const validation = useValidator("bankTransfer", bank, amount, selectedBank);
  return (
    <SelectAndPay
      bank={bank}
      label="Transfer To"
      placeholder="Pick a Bank"
      value={selectedBank}
      data={banks}
      setSubject={setSelectedBank}
      amount={amount}
      setAmount={setAmount}
      dispatchFunction={transferPayload}
      btnText="Transfer"
      validation={validation}
    />
  );
}
