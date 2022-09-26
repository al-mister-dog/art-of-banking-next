import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { createStyles, Text } from "@mantine/core";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { setAsSpreadSheet, setAsTAccount } from "./utils/balance-display";

const useStyles = createStyles((theme) => ({
  text: {
    transition: "all 0.5s ease-in",
    color: "black",
    padding: "0px 3px",
  },
  decrease: {
    background: theme.colors.red[5],
    color: "white",
    padding: "0px 3px",
  },
  increase: {
    background: theme.colors.green[5],
    color: "white",
    padding: "0px 3px",
  },
}));

function useColors(balance) {
  const [prevBalance, setPrevBalance] = useState(balance);
  const prevCountRef = useRef(balance);

  useEffect(() => {
    prevCountRef.current = balance;
    setPrevBalance(prevCountRef.current);
  }, [balance]);
  if (balance === prevBalance) {
    return "text";
  }
  if (balance < prevBalance) {
    return "decrease";
  }
  if (balance > prevBalance) {
    return "increase";
  }
}

function Balance({ account, id }) {
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
}

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
