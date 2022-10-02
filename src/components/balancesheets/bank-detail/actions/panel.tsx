import { useAppSelector } from "../../../../app/hooks";
import {
  selectActions,
  setActions,
} from "../../../../features/actions/actionsSlice";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, Center, Stack } from "@mantine/core";
import { CardInfo } from "../../types";
import ActionSelections from "./selections";
import ActionForms from "./forms";
import { useCurrentAction } from "../../../../hooks/useCurrentAction";

export default function ActionsPanel({ bank }: { bank: CardInfo }) {
  const { actions } = useAppSelector(selectActions);

  const [action, setAction] = useState<string | null>(null);

  const currentAction = useRef(action);
  useCurrentAction(actions, currentAction, setAction);
  // const actionInActions = Object.keys(actions)
  //   .flatMap((acn) => actions[acn])
  //   .find((acn) => acn.value === currentAction.current);

  // if (currentAction.current !== null && actionInActions === undefined) {
  //   currentAction.current = null;
  //   setAction(null);
  // }

  function handleSetAction(val) {
    currentAction.current = val;
    setAction(val);
  }
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
        setAction={handleSetAction}
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
