import { Select, Text } from "@mantine/core";
import { CardInfo } from "../../types";

interface Props {
  bank: CardInfo;
  actionData: any[];
  action: any;
  setAction: (v: any) => void;
}

export default function ActionSelections({
  action,
  actionData,
  setAction,
}: Props) {
  
  return (
    <Select
      label="Actions"
      placeholder="Choose an Action"
      value={action}
      onChange={setAction}
      data={actionData}
    />
  );
}
