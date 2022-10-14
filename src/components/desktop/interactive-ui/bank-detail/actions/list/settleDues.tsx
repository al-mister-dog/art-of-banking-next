import { forwardRef, useContext, useState } from "react";

import {
  Button,
  Group,
  Radio,
  Select,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { System } from "../../../../../../domain/system";
import { useAppDispatch } from "../../../../../../app/hooks";
import { Banks } from "../../../../../../domain/services/bank";
import { Dues } from "../../../../../../domain/services/dues";
import { creditData } from "../../../../../../domain/structures/objects";
import {
  creditBank,
  debitBank,
  creditClearinghouse,
  debitClearinghouse,
} from "../../../../../../features/banks/banksSlice";
import { useValidator } from "../../../../../../hooks/useValidator/useValidator";
import { CardInfo } from "../../../types";

export default function SettleDues({ bank }: { bank: CardInfo }) {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const theme = useMantineTheme();

  const dues = Dues.getByIdAndNetted(bank.cardInfo.id).map((account) => {
    if (account.superiorId === bank.cardInfo.id) {
      const debtorBank = Banks.getById(account.subordinateId);
      return {
        value: `${account.id}`,
        label: debtorBank.name,
        amountOwed: account.balance,
        // isDebtor: false,
        message: `${debtorBank.name} owes you $${account.balance}`,
      };
    }
    if (account.subordinateId === bank.cardInfo.id) {
      const creditorBank = Banks.getById(account.superiorId);
      return {
        value: `${account.id}`,
        label: creditorBank.name,
        amountOwed: account.balance,
        // isDebtor: true,
        message: `you owe ${creditorBank.name} $${account.balance}`,
      };
    }
  });

  if (dues.length === 0) {
    return <Text>No Dues to Settle</Text>;
  }

  return (
    <Stack spacing="md">
      <Select
        size="xs"
        label={
          <Text size="xs" weight="bold" color={theme.colors[bank.color][9]}>
            Settle Dues With
          </Text>
        }
        placeholder="Choose a Bank"
        value={selectedBank}
        itemComponent={SelectItem}
        data={dues}
        onChange={(value) => {
          setSelectedAccount(value);
          setSelectedBank(value);
        }}
      />
      {selectedAccount && System.getSystem() !== "clearinghouse" && (
        <NextStep bank={bank} selectedBank={selectedBank} />
      )}
      {selectedAccount && System.getSystem() == "clearinghouse" && (
        <NextStepCH bank={bank} selectedBank={selectedBank} />
      )}
    </Stack>
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  amountOwed: any;
  message: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, amountOwed, message, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" color="dimmed">
            {message}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function NextStep({ bank, selectedBank }) {
  const dispatch = useAppDispatch();
  const [paymentType, setPaymentType] = useState("credit");

  const accountInfo = { ...creditData.creditAccounts[selectedBank] };
  const amount = accountInfo.balance;
  let otherBank = null;
  let isDebtor = false;
  let settlementInfo = "";
  let creditLabel = "";
  let debitLabel = "";
  if (accountInfo.subordinateId === bank.cardInfo.id) {
    isDebtor = true;
    otherBank = Banks.getById(accountInfo.superiorId);
    const bankName = otherBank.name;
    settlementInfo = `You owe ${bankName} $${accountInfo.balance}`;
    creditLabel = `Credit ${bankName}'s Account with You`;
    debitLabel = `Debit Your Account with ${bankName}`;
  } else {
    isDebtor = false;
    otherBank = Banks.getById(accountInfo.subordinateId);
    const bankName = otherBank.name;
    settlementInfo = `${bankName} owes you $${accountInfo.balance}`;
    creditLabel = `Credit Your Account with ${bankName}`;
    debitLabel = `Debit ${bankName}'s Account with You`;
  }

  const validation = useValidator("settleDues", bank, amount, selectedBank);
  function payDuesPayload() {
    if (isDebtor && paymentType === "credit") {
      const payload = {
        amount: accountInfo.balance,
        b1: otherBank,
        b2: Banks.getById(bank.cardInfo.id),
      };
      dispatch(creditBank(payload));
    }
    if (isDebtor && paymentType === "debit") {
      const payload = {
        amount: accountInfo.balance,
        b1: Banks.getById(bank.cardInfo.id),
        b2: otherBank,
      };
      dispatch(debitBank(payload));
    }
    if (!isDebtor && paymentType === "credit") {
      const payload = {
        amount: accountInfo.balance,
        b1: Banks.getById(bank.cardInfo.id),
        b2: otherBank,
      };
      dispatch(creditBank(payload));
    }
    if (!isDebtor && paymentType === "debit") {
      const payload = {
        amount: accountInfo.balance,
        b1: otherBank,
        b2: Banks.getById(bank.cardInfo.id),
      };
      dispatch(debitBank(payload));
    }
  }

  return (
    <>
      <Text size="xs" mb={0} color="dimmed">
        {settlementInfo}
      </Text>

      <Radio.Group
        mt={-10}
        value={paymentType}
        onChange={setPaymentType}
        name="PaymentMethod"
        label={
          <Text size="sm" weight="bold" color={`${bank.color}`}>
            Payment Method
          </Text>
        }
      >
        <Radio
          size="xs"
          color={`${bank.color}`}
          value="credit"
          label={<Text size="xs">{creditLabel}</Text>}
        />
        <Radio
          size="xs"
          color={`${bank.color}`}
          value="debit"
          label={<Text size="xs">{debitLabel}</Text>}
        />
      </Radio.Group>

      <Button
        color={`${bank.color}`}
        onClick={payDuesPayload}
        disabled={validation.disabled}
      >
        Settle Dues
      </Button>
    </>
  );
}

function NextStepCH({ bank, selectedBank }) {
  const dispatch = useAppDispatch();
  const accountInfo = { ...creditData.creditAccounts[selectedBank] };
  const amount = accountInfo.balance;
  let otherBank = null;
  let isDebtor = false;
  let settlementInfo = "";

  if (accountInfo.subordinateId === bank.cardInfo.id) {
    isDebtor = true;
    otherBank = Banks.getById(accountInfo.superiorId);
    const bankName = otherBank.name;
    settlementInfo = `You owe ${bankName} $${accountInfo.balance}`;
  } else {
    isDebtor = false;
    otherBank = Banks.getById(accountInfo.subordinateId);
    const bankName = otherBank.name;
    settlementInfo = `${bankName} owes you $${accountInfo.balance}`;
  }

  const validation = useValidator("settleDues", bank, amount, selectedBank);
  function payDuesPayload() {
    if (isDebtor) {
      const payload = {
        amount: accountInfo.balance,
        b1: otherBank,
        b2: Banks.getById(bank.cardInfo.id),
      };
      dispatch(creditClearinghouse(payload));
    }

    if (!isDebtor) {
      const payload = {
        amount: accountInfo.balance,
        b1: otherBank,
        b2: Banks.getById(bank.cardInfo.id),
      };
      dispatch(debitClearinghouse(payload));
    }
  }
  return (
    <>
      <Text size="xs" mb={0} color="dimmed">
        {settlementInfo}
      </Text>

      {isDebtor ? (
        <Button
          color={`${bank.color}`}
          onClick={payDuesPayload}
          disabled={validation.disabled}
        >
          Increase {otherBank.name} Balance
        </Button>
      ) : (
        <>
          (
          <Button
            color={`${bank.color}`}
            onClick={payDuesPayload}
            disabled={validation.disabled}
          >
            Decrease {otherBank.name} Balance
          </Button>
          )
        </>
      )}
    </>
  );
}
