import { useAppSelector } from "../../../../app/hooks";
import { selectActions } from "../../../../features/actions/actionsSlice";
import { useState } from "react";
import { Text, Center, Stack } from "@mantine/core";
import { CardInfo } from "../../types";
import ActionSelections from "./selections";
import ActionForms from "./forms";
import { useValidator } from "../../../../hooks/useValidator/useValidator";

export default function ActionsPanel({ bank }: { bank: CardInfo }) {
  const { actions } = useAppSelector(selectActions);
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
    return (
      <Center>
        <Text weight="bold">No Actions to Perform in This Lecture</Text>
      </Center>
    );
  }
  if (actionData.length === 0) {
    return (
      <Center>
        <Text weight="bold">No Actions to Perform in This Lecture</Text>
      </Center>
    );
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
