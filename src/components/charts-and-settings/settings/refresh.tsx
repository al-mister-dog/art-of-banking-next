import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActions,
  setActions,
} from "../../../features/actions/actionsSlice";
import { setup } from "../../../features/banks/banksSlice";
import { ActionIcon, Box, Text, useMantineTheme } from "@mantine/core";
import { Refresh } from "tabler-icons-react";

export default function RefreshBalanceSheets() {
  const dispatch = useAppDispatch();
  const { currentLectureId } = useAppSelector(selectActions);

  function handleRefresh() {
    dispatch(setup({ id: currentLectureId }));
    dispatch(setActions({ id: currentLectureId }));
  }

  const theme = useMantineTheme();
  return (
    <Box style={{ display: "flex" }}>
      <ActionIcon onClick={handleRefresh}>
        <Refresh color={`${theme.colors.violet[9]}`} />
      </ActionIcon>
      <Text>Refresh</Text>
    </Box>
  );
}
