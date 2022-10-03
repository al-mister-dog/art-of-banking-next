import { useAppDispatch } from "../../../app/hooks";
import { useEffect, useState } from "react";
import { setDisplay } from "../../../features/settings/settingsSlice";
import { Box, Radio } from "@mantine/core";
import SpreadsheetMenu from "./menu-spreadsheet";

import ColorsMenu from "./menu-colors";

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
    <Box mt="lg">
      <Radio.Group
        value={displayButton}
        onChange={(value) => handleOnChange(value)}
        name="Display"
        label="Balance Sheet Display"
      >
        <ColorsMenu>
          <Radio color="violet" value="balances" label="Balances" />
        </ColorsMenu>
        <ColorsMenu>
          <Radio color="violet" value="taccounts" label="T-Accounts" />
        </ColorsMenu>
        <SpreadsheetMenu>
          <Radio color="violet" value="spreadsheet" label="Spreadsheet" />
        </SpreadsheetMenu>
      </Radio.Group>
    </Box>
  );
}
