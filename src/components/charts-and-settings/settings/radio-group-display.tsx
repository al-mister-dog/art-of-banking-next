import { useState } from "react";
import { Box, Radio } from "@mantine/core";

export default function DisplayRadioGroup() {
  const [display, setDisplay] = useState("balances");
  return (
    <Box mt="lg">
      <Radio.Group
        value={display}
        onChange={setDisplay}
        name="Display"
        label="Balance Sheet Display"
      >
        <Radio color="violet" value="balances" label="Balances" />
        <Radio color="violet" value="taccounts" label="T-Accounts" />
        <Radio color="violet" value="clavaro" label="Clavaro" />
      </Radio.Group>
    </Box>
  );
}
