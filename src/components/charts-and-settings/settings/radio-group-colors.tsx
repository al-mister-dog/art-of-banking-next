import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectSettings } from "../../../features/settings/settingsSlice";
import { useState } from "react";
import { Box, Radio } from "@mantine/core";
useAppSelector;
import { setColors } from "../../../features/settings/settingsSlice";

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
      {!displaySettings.clavero && (
        <Radio.Group
          value={colorCoding}
          onChange={(value) => handleOnChange(value)}
          name="ColorCoding"
          label="Color Coding"
        >
          <Radio color="violet" value="round" label="Round" />
          <Radio color="violet" value="static" label="Static" />
          <Radio color="violet" value="flash" label="Flash" />
          <Radio color="violet" value="off" label="Off" />
        </Radio.Group>
      )}
    </Box>
  );
}
