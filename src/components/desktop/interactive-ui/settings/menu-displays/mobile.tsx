import { useAppSelector, useAppDispatch } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { setDisplay } from "../../../../../features/settings/settingsSlice";
import { Box, Radio, Text } from "@mantine/core";
import { useRadioSettings } from "../../../../../hooks/useRadioSettings";

export default function MenuDisplays() {
  const dispatch = useAppDispatch();
  const { displaySettings } = useAppSelector(selectSettings);
  const displayButton = useRadioSettings(displaySettings);
  
  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
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

        <Radio
          color="violet"
          value="spreadsheet"
          label={<Text size="xs">Spreadsheet</Text>}
        />
      </Radio.Group>
    </Box>
  );
}
