import React from "react";
import { useAppSelector } from "../../../../../../../app/hooks";
import { selectSettings } from "../../../../../../../features/settings/settingsSlice";
import { createStyles, Text, useMantineTheme } from "@mantine/core";
import useColorSettings from "../../../../../../../hooks/useColorSettings";
import { setAsSpreadSheet, setAsTAccount } from "../utils/balance-display";
import BalanceSheetRow from "./balance-sheet-row";

const useStyles = createStyles((theme) => ({
  text: {
    transition: "all 0.5s ease-in",
    padding: "0px",
  },
  decrease: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[5],
    color: "white",
    padding: "0px",
  },
  increase: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[5],
    color: "white",
    padding: "0px",
  },
}));

const Balance = ({ account, id, textColor }) => {
  const { displaySettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const color = useColorSettings(account.balance);
  let tAccountDisplay = setAsTAccount(account, id);
  let spreadSheetDisplay = setAsSpreadSheet(account);

  return (
    <BalanceSheetRow
      className={classes[color]}
      color={color !== "text" ? "" : theme.colors[textColor][8]}
    >
      {displaySettings.taccounts
        ? `${tAccountDisplay}`
        : `${spreadSheetDisplay}`}
    </BalanceSheetRow>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
