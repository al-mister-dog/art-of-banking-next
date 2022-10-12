import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { forwardRef, useContext } from "react";
import { InterestRates } from "../../../../../domain/calculators/interest-rates";
import { mediaQuery } from "../../../../../config/media-query";
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
import { useMediaQuery } from "@mantine/hooks";

interface Props {
  bank: CardInfo;
  label: string;
  placeholder: string;
  value: string;
  data: (string | SelectItem)[];
  setSubject: (v: any, x: any) => void;
  amount: number;
  setAmount: (v: any) => void;
  paymentType: string;
  setPaymentType: (v: string) => void;
  dispatchFunction: () => void;
  btnText: string;
  validation: {
    error: boolean;
    errorMessage: string;
    disabled: boolean;
  };
  isLoan?: boolean;
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
  paymentType,
  setPaymentType,
  dispatchFunction,
  btnText,
  validation,
  isLoan,
}: Props) {
  const isMobile = useMediaQuery(mediaQuery);
  const setOpened = useContext(DrawerContext);
  const theme = useMantineTheme();

  const formatted = parseFloat(`${amount}`);
  return (
    <Stack spacing="md">
      <Select
        size="xs"
        label={
          <Text size="xs" weight="bold" color={theme.colors[bank.color][9]}>
            {label}
          </Text>
        }
        placeholder={placeholder}
        value={value}
        itemComponent={SelectItem}
        data={data}
        onChange={(value) => setSubject(value, data)}
      />
      <Radio.Group
        value={paymentType}
        onChange={setPaymentType}
        name="PaymentType"
        label="Payment Type"
      >
        <Radio
          color={`${theme.colors[bank.color]}`}
          value="deposits"
          label="Deposits"
        />
        <Radio
          color={`${theme.colors[bank.color]}`}
          value="cash"
          label="Cash"
        />
      </Radio.Group>
      <Input.Wrapper error={validation.errorMessage}>
        <NumberInput
          size="xs" icon={<CurrencyDollar />}
          value={amount}
          formatter={() =>
            !Number.isNaN(amount) ? `${formatted}` : `${amount}`
          }
          // formatter={() => {
          //     !Number.isNaN(parseFloat(value))
          //     ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          //     : '$ '
          // }}
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
  interest: number;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, owed, interest, ...others }: ItemProps, ref) => {
    const plusInterest = owed + interest;
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <div>
            <Text>
              {label}: ${owed}{" "}
              <Text size="xs">
                + {interest * 10}% interest: {plusInterest}
              </Text>
            </Text>
          </div>
        </Group>
      </div>
    );
  }
);
