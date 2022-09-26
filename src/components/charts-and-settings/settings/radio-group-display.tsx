import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { setDisplay } from "../../../features/settings/settingsSlice";
import { Box, Radio } from "@mantine/core";

export default function DisplayRadioGroup() {
  const dispatch = useAppDispatch();

  const [displayButton, setDisplayButton] = useState("balances");

  function handleOnChange(value: string) {
    dispatch(setDisplay({ key: value }));
    setDisplayButton(value);
  }
  return (
    <Box mt="lg">
      <Radio.Group
        value={displayButton}
        onChange={(value) => handleOnChange(value)}
        name="Display"
        label="Balance Sheet Display"
      >
        <Radio color="violet" value="balances" label="Balances" />
        <Radio color="violet" value="taccounts" label="T-Accounts" />
        <Radio color="violet" value="clavero" label="Clavero" />
      </Radio.Group>
    </Box>
  );
}
