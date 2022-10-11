import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { useContext } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  Button,
  Input,
  NumberInput,
  Select,
  SelectItem,
  Stack,
  Text,
} from "@mantine/core";
import { CurrencyDollar, Percentage } from "tabler-icons-react";
import { CardInfo } from "../../../types";
import { DrawerContext } from "../../../cards/card/card-mobile";
import { mediaQuery } from "../../../../../config/media-query";

interface Props {
  bank: CardInfo;
  label: string;
  placeholder: string;
  value: string;
  data: (string | SelectItem)[];
  setSubject: (v: any) => void;
  amount: number;
  setAmount: (v: any) => void;
  interestRate: number;
  setInterestRate: (v: any) => void;
  dispatchFunction: () => void;
  btnText: string;
  validation: {
    error: boolean;
    errorMessage: string;
    disabled: boolean;
  };
}
export default function SelectAndPay({
  bank,
  label,
  placeholder,
  value,
  data,
  setSubject,
  amount,
  setAmount,
  interestRate,
  setInterestRate,
  dispatchFunction,
  btnText,
  validation,
}: Props) {
  const isMobile = useMediaQuery(mediaQuery);
  const setOpened = useContext(DrawerContext);

  return (
    <Stack spacing="md">
      <Select
        label={label}
        placeholder={placeholder}
        value={value}
        data={data}
        onChange={setSubject}
      />
      <Input.Wrapper error={validation.errorMessage}>
        <NumberInput
          icon={<CurrencyDollar />}
          value={amount}
          placeholder="0"
          radius="xs"
          error={validation.error}
          onChange={(amount) => setAmount(amount)}
        />
      </Input.Wrapper>
      <NumberInput
        icon={<Percentage />}
        value={interestRate}
        placeholder="0"
        radius="xs"
        onChange={(interestRate) => setInterestRate(interestRate)}
      />
      <Text size="xs" color="dimmed">
        + {interestRate}% interest
      </Text>
      {isMobile ? (
        <Button
          color={`${bank.color}`}
          onClick={() => {
            dispatchFunction();
            setOpened(false);
          }}
          disabled={validation.disabled}
        >
          {btnText}
        </Button>
      ) : (
        <Button
          color={`${bank.color}`}
          onClick={dispatchFunction}
          disabled={validation.disabled}
        >
          {btnText}
        </Button>
      )}
    </Stack>
  );
}
