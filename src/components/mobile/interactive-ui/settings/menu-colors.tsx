import { Box } from "@mantine/core";
import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import MenuSpreadSheet from "./color-coding/transactions";
import MenuBalances from "./menu-radio-colors";

export default function ColorMenus({ setOpened }) {
  const { displaySettings } = useAppSelector(selectSettings);

  return (
    <Box mt="lg" style={{ marginLeft: "auto", marginRight: 0 }}>
      {displaySettings.spreadsheet ? (
        <MenuSpreadSheet setOpened={setOpened} />
      ) : (
        <MenuBalances setOpened={setOpened} />
      )}
    </Box>
  );
}
