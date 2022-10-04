import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { useState } from "react";
import { Box, Radio } from "@mantine/core";
import { setColors } from "../../../../features/settings/settingsSlice";

export default function ColorsRadioGroup() {
  const { displaySettings } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [colorCoding, setColorCoding] = useState("round");

  function handleOnChange(value: string) {
    dispatch(setColors({ key: value }));
    setColorCoding(value);
  }
  return (
    <Box mt="lg">
      {!displaySettings.spreadsheet && (
        <Radio.Group
          value={colorCoding}
          orientation="vertical"
          onChange={(value) => handleOnChange(value)}
          name="ColorCoding"
          label="Balances Color Coding"
        >
          <Radio color="violet" value="static" label="Each" />
          <Radio color="violet" value="round" label="All" />
          <Radio color="violet" value="flash" label="Flash" />
          <Radio color="violet" value="off" label="Off" />
        </Radio.Group>
      )}
    </Box>
  );
}
