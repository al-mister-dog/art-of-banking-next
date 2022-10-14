import { useAppSelector } from "../../../../../../../app/hooks";
import { selectSettings } from "../../../../../../../features/settings/settingsSlice";
import { createStyles,  useMantineTheme } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { setAsSpreadSheet, setAsTAccount } from "../utils/balance-display";
import BalanceSheetRow from "./balance-sheet-row";

function useColors(balance: number) {
  const prevBalance = useRef(balance);
  useEffect(() => {
    if (balance !== prevBalance.current) {
      prevBalance.current = balance;
    }
  }, [balance]);

  if (balance === prevBalance.current) {
    return "text";
  }
  if (balance < prevBalance.current) {
    return "decrease";
  }
  if (balance > prevBalance.current) {
    return "increase";
  }
}
const useStyles = createStyles((theme) => ({
  text: {
    transition: "all 0.5s ease-in",
    padding: "0px",
    borderRadius: "",
  },
  decrease: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[5],
    color: "white",
    padding: "0px",
    borderRadius: "",
  },
  increase: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[5],
    color: "white",
    padding: "0px",
    borderRadius: "",
  },
}));

const Balance = ({ account, id, textColor }) => {
  const { displaySettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const color = useColors(account.balance);
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
