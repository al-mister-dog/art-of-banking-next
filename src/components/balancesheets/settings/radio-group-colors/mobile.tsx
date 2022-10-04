import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { useState } from "react";
import { Box, Radio } from "@mantine/core";
import { setColors } from "../../../../features/settings/settingsSlice";
import MenuSpreadsheetMobile from "../menu-spreadsheet-mobile";
import MenuColors from "../menu-colors-mobile";

export default function ColorsRadioGroup({ setOpened }) {
  const { displaySettings } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();
  const [colorCoding, setColorCoding] = useState("round");

  function handleOnChange(value: string) {
    dispatch(setColors({ key: value }));
    setColorCoding(value);
    setOpened(false);
  }
  return (
    <Box mt="lg" style={{ marginLeft: "auto", marginRight: 0 }}>
      {displaySettings.spreadsheet ? (
        <MenuSpreadsheetMobile setOpened={setOpened} />
      ) : (
        <MenuColors setOpened={setOpened} />
      )}
    </Box>
  );
}
