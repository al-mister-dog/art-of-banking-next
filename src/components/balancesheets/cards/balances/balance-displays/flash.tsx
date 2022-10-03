import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { createStyles, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { setAsSpreadSheet, setAsTAccount } from "./utils/balance-display";

const useStyles = createStyles((theme) => ({
  text: {
    transition: "all 0.5s ease-in",
    
    padding: "0px",
  },
  decrease: {
    background: theme.colors.red[5],
    color: "white",
    padding: "0px",
  },
  increase: {
    background: theme.colors.green[5],
    color: "white",
    padding: "0px",
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

function Balance({ account, id, textColor }) {
  const { displaySettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const color = useColors(account.balance);
  let tAccountDisplay = setAsTAccount(account, id);
  let spreadSheetDisplay = setAsSpreadSheet(account);
  
  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={classes[color]}
      color={color !== "text" ? "" : theme.colors[textColor][8]}
    >
      {displaySettings.taccounts
        ? `${tAccountDisplay}`
        : `${spreadSheetDisplay}`}
    </Text>
  );
}

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
