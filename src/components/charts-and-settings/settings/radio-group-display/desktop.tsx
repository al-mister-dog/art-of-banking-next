import { useAppDispatch } from "../../../../app/hooks";
import { useState, useEffect } from "react";
import { Box, Radio, Text } from "@mantine/core";
import { setDisplay } from "../../../../features/settings/settingsSlice";
import ColorsMenu from "../menu-colors";
import SpreadsheetMenu from "../menu-spreadsheet";

export default function DisplayRadioGroup() {
  const dispatch = useAppDispatch();

  const [displayButton, setDisplayButton] = useState("balances");

  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
    setDisplayButton(value);
  }

  // this sets display back to "balances" on page change
  useEffect(() => {
    dispatch(setDisplay({ key: displayButton }));
  }, []);

  return (
    <Box>
      <Radio.Group
        value={displayButton}
        orientation="vertical"
        onChange={(value) => handleOnChange(value)}
        name="Display"
      >
        <ColorsMenu>
          <Radio
            color="violet"
            value="balances"
            label={
              <Text size="xs" >
                Balances
              </Text>
            }
          />
        </ColorsMenu>
        <ColorsMenu>
          <Radio
            color="violet"
            value="taccounts"
            label={
              <Text size="xs" >
                T-Accounts
              </Text>
            }
          />
        </ColorsMenu>
        <SpreadsheetMenu>
          <Radio
            color="violet"
            value="spreadsheet"
            label={
              <Text size="xs" >
                Spreadsheet
              </Text>
            }
          />
        </SpreadsheetMenu>
      </Radio.Group>
    </Box>
  );
}
