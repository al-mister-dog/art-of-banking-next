import { createStyles, Text } from "@mantine/core";
import React, { useEffect, useRef } from "react";

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

const Balance = ({ account }) => {
  const { classes } = useStyles();
  const prevCountRef = useRef(account.balance);

  useEffect(() => {
    if (account.balance !== prevCountRef.current) {
      prevCountRef.current = account.balance;
    }
  }, [account.balance]);

  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={`${account.balance === prevCountRef.current && classes.text} ${
        account.balance < prevCountRef.current && classes.decrease
      } ${account.balance > prevCountRef.current && classes.increase}`}
    >
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
