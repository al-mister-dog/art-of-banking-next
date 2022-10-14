import { useState } from "react";
import { Text, Center, Stack, useMantineTheme } from "@mantine/core";
import { CardInfo } from "../../types";
import ActionSelections from "./selections";
import ActionForms from "./forms";
import { useAppSelector } from "../../../../../app/hooks";
import { selectActions } from "../../../../../features/actions/actionsSlice";

export default function ActionsPanel({ bank }: { bank: CardInfo }) {
  const { actions } = useAppSelector(selectActions);
  const [action, setAction] = useState<string | null>(null);
  const theme = useMantineTheme();
  let actionData = actions[bank.cardInfo.type];

  if (actionData === undefined || actionData.length === 0) {
    return (
      <Center>
        <Text weight="bold" color={theme.colors[bank.color][9]}>
          No Actions to Perform in This Lecture
        </Text>
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

/**TRACE
 *
 * user sets action state in ActionSelections
 * if action, ActionForms is rendered
 *
 * when user selects a new lecture, actionstate needs to be set back to null
 */
