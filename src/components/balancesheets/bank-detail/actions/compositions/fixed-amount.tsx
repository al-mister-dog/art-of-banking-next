import { forwardRef, useContext, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import {
  Button,
  Group,
  Input,
  NumberInput,
  Radio,
  Select,
  SelectItem,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { CurrencyDollar } from "tabler-icons-react";
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

  dispatchFunction: () => void;
  btnText: string;
  validation: {
    error: boolean;
    errorMessage: string;
    disabled: boolean;
  };
}
export default function FixedAmount({
  bank,
  label,
  placeholder,
  value,
  data,
  setSubject,
  amount,
  setAmount,

  dispatchFunction,
  btnText,
  validation,
}: Props) {
  const isMobile = useMediaQuery(mediaQuery);
  const setOpened = useContext(DrawerContext);
  const theme = useMantineTheme();

  return (
    <Stack spacing="md">
      <Select
        label={label}
        placeholder={placeholder}
        value={value}
        itemComponent={SelectItem}
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

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  owed: any;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, owed, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>
            {label}: ${owed}
          </Text>
        </div>
      </Group>
    </div>
  )
);
