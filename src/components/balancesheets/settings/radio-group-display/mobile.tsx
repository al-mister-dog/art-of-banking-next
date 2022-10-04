import { useAppDispatch } from "../../../../app/hooks";
import { useState, useEffect } from "react";
import { Box, createStyles, Radio, Text } from "@mantine/core";
import { setDisplay } from "../../../../features/settings/settingsSlice";
import SpreadsheetMenu from "../menu-spreadsheet-mobile";

export default function DisplayRadioGroup({ setOpened, setHidden }) {
  const dispatch = useAppDispatch();
  
  const [displayButton, setDisplayButton] = useState("balances");
  

  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
    if (value !== "spreadsheet") {
      setOpened(false);
    } 

    // setDisplayButton(value);
  }

  // this sets display back to "balances" on page change
  // useEffect(() => {
  //   dispatch(setDisplay({ key: displayButton }));
  // }, []);

  return (
    <Box>
      <Radio.Group
        value={displayButton}
        // orientation="vertical"
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

        <SpreadsheetMenu setOpened={setOpened} setHidden={setHidden}>
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
