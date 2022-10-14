import { ActionIcon, Box, Text, Tooltip, useMantineTheme } from "@mantine/core";
import { RefreshDot } from "tabler-icons-react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  selectActions,
  setActions,
} from "../../../../features/actions/actionsSlice";
import { setup } from "../../../../features/banks/banksSlice";

export default function RefreshBalanceSheets() {
  const dispatch = useAppDispatch();
  const { currentLectureId } = useAppSelector(selectActions);

  function handleRefresh() {
    dispatch(setup({ id: currentLectureId }));
    dispatch(setActions({ id: currentLectureId }));
  }

  const theme = useMantineTheme();
  return (
    <Tooltip color="violet" label="Reset Balancesheets">
      <ActionIcon size="lg" onClick={handleRefresh}>
        <RefreshDot size={40} color={`${theme.colors.violet[9]}`} />
      </ActionIcon>
    </Tooltip>
  );
}
