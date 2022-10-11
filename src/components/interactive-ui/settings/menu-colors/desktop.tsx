import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { Box } from "@mantine/core";
import MenuSpreadSheet from "../color-coding/transactions/transactions-desktop";
import MenuBalances from "../color-coding/balances/balances-desktop";

export default function ColorMenus() {
  const { displaySettings } = useAppSelector(selectSettings);

  return (
    <Box mt="lg">
      {displaySettings.spreadsheet ? <MenuSpreadSheet /> : <MenuBalances />}
    </Box>
  );
}
