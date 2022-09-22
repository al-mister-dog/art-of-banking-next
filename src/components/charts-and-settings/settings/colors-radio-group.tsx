import { useState } from "react";
import { Box, Radio } from "@mantine/core";

export default function ColorsRadioGroup() {
  const [colorCoding, setColorCoding] = useState("flash");
  return (
    <Box mt="lg">
      <Radio.Group
        value={colorCoding}
        onChange={setColorCoding}
        name="ColorCoding"
        label="Color Coding"
      >
        <Radio color="violet" value="flash" label="Flash" />
        <Radio color="violet" value="static" label="Static" />
        <Radio color="violet" value="off" label="Off" />
      </Radio.Group>
    </Box>
  );
}
