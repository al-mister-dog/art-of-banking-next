import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Box, Radio, Text } from "@mantine/core";
import {
  selectSettings,
  setDisplay,
} from "../../../../features/settings/settingsSlice";
import ColorsMenu from "../color-coding/balances/balances-desktop";
import SpreadsheetMenu from "../color-coding/transactions/transactions-desktop";
import { useRadioSettings } from "../../../../hooks/useRadioSettings";

export default function DisplayRadioGroup() {
  const dispatch = useAppDispatch();
  const { displaySettings } = useAppSelector(selectSettings);
  const displayButton = useRadioSettings(displaySettings);

  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
  }

  // this sets display back to "balances" on page change
  // useEffect(() => {
  //   dispatch(setDisplay({ key: "balances" }));
  // }, []);

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
            label={<Text size="xs">Balances</Text>}
          />
        </ColorsMenu>
        <ColorsMenu>
          <Radio
            color="violet"
            value="taccounts"
            label={<Text size="xs">T-Accounts</Text>}
          />
        </ColorsMenu>
        <SpreadsheetMenu>
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
