import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { useState, useEffect } from "react";
import { Box, createStyles, Radio, Text } from "@mantine/core";
import { setDisplay } from "../../../../features/settings/settingsSlice";
import SpreadsheetMenu from "../menu-spreadsheet-mobile";

export default function DisplayRadioGroup({ setOpened }) {
  const dispatch = useAppDispatch();
  const { displaySettings } = useAppSelector(selectSettings);
  const displayButton = Object.keys(displaySettings).filter(
    (key) => displaySettings[key] === true
  )[0];

  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
    if (value !== "spreadsheet") {
      setOpened(false);
    }
  }

  return (
    <Box mt="lg">
      <Radio.Group
        value={displayButton}
        orientation="vertical"
        onChange={(value) => handleOnChange(value)}
        name="Display"
        label="Balancesheet Display"
      >
        <Radio
          color="violet"
          value="balances"
          label={<Text size="xs">Balances</Text>}
        />

        <Radio
          color="violet"
          value="taccounts"
          label={<Text size="xs">T-Accounts</Text>}
        />

        <SpreadsheetMenu setOpened={setOpened}>
          <Radio
            color="violet"
            value="spreadsheet"
            label={<Text size="xs">Spreadsheet</Text>}
          />
        </SpreadsheetMenu>
      </Radio.Group>
    </Box>
  );
}
