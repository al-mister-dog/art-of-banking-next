import { Box } from "@mantine/core";
import MenuSpreadSheet from "./color-coding/transactions";
import MenuBalances from "./color-coding/balances";
import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";

export default function ColorMenus() {
  const { displaySettings } = useAppSelector(selectSettings);

  return (
    <Box>
      {displaySettings.spreadsheet ? <MenuSpreadSheet /> : <MenuBalances />}
    </Box>
  );
}
