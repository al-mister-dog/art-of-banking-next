import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { createStyles, Text } from "@mantine/core";
import React, { useEffect, useRef } from "react";
import { setAsSpreadSheet, setAsTAccount } from "./utils/balance-display";

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
    color: "black",
    padding: "0px 3px",
    borderRadius: "3px",
  },
  decrease: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[5],
    color: "white",
    padding: "0px 3px",
    borderRadius: "3px",
  },
  increase: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[5],
    color: "white",
    padding: "0px 3px",
    borderRadius: "3px",
  },
}));

const Balance = ({ account, id }) => {
  const { displaySettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const color = useColors(account.balance);
  let tAccountDisplay = setAsTAccount(account, id);
  let spreadSheetDisplay = setAsSpreadSheet(account);

  return (
    <Text size="xs" weight="bold" align="left" className={classes[color]}>
      {displaySettings.taccounts
        ? `${tAccountDisplay}`
        : `${spreadSheetDisplay}`}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
