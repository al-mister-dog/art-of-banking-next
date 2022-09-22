import { useAppSelector } from "../../../../app/hooks";
import { selectLectures } from "../../../../features/lectures/lecturesSlice";
import { Text } from "@mantine/core";
import { useState } from "react";
import { Stack } from "@mantine/core";
import { CardInfo } from "../../types";
import ActionSelections from "./selections";
import ActionForms from "./forms";
import { useValidator } from "../../../../hooks/useValidator/useValidator";

export default function ActionsPanel({ bank }: { bank: CardInfo }) {
  const { actions } = useAppSelector(selectLectures);
  const [action, setAction] = useState<string | null>(null);

  // let actionData = [];
  // if (bank.cardInfo.type === "bank") {
  //   actionData = actions.bank;
  // }
  // if (bank.cardInfo.type === "customer") {
  //   actionData = actions.customer;
  // }
  let actionData = actions[bank.cardInfo.type];
  
  if (actionData === undefined) {
    return <Text>No Actions To Perform</Text>;
  }
  if (actionData.length === 0) {
    return <Text>No Actions To Perform</Text>;
  }
  return (
    <Stack spacing="xl">
      <ActionSelections
        bank={bank}
        action={action}
        actionData={actionData}
        setAction={setAction}
      />

      {action && <ActionForms action={action} bank={bank} />}
    </Stack>
  );
}
