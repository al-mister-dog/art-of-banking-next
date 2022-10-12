import { Select, Text, useMantineTheme } from "@mantine/core";
import { CardInfo } from "../../types";

interface Props {
  bank: CardInfo;
  actionData: any[];
  action: any;
  setAction: (v: any) => void;
}

export default function ActionSelections({
  bank,
  action,
  actionData,
  setAction,
}: Props) {
  const theme = useMantineTheme();
  return (
    <Select
      size="xs"
      label={
        <Text size="xs" weight="bold" color={theme.colors[bank.color][9]}>
          Actions
        </Text>
      }
      placeholder="Choose an Action"
      value={action}
      onChange={setAction}
      data={actionData}
    />
  );
}
