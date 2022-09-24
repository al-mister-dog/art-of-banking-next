import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { Box, Radio } from "@mantine/core";
import { setColors } from "../../../features/settings/settingsSlice";

export default function ColorsRadioGroup() {
  const dispatch = useAppDispatch();
  const [colorCoding, setColorCoding] = useState("round");

  function handleOnChange(value: string) {
    dispatch(setColors({ key: value }));
    setColorCoding(value);
  }
  return (
    <Box mt="lg">
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
    </Box>
  );
}
