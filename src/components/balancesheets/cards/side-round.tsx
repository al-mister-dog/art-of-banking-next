import { createStyles, Text } from "@mantine/core";
import React, { useEffect, useRef } from "react";

const useStyles = createStyles((theme) => ({
  text: {
    transition: "all 0.5s ease-in",
    color: "black",
    padding: "0px 3px",
  },
  decrease: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[5],
    color: "white",
    padding: "0px 3px",
  },
  increase: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[5],
    color: "white",
    padding: "0px 3px",
  },
}));

export default function SideUI({ side }) {
  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="xs" weight="bold" align="left">
        {side.instrument}
      </Text>
      {side.accounts.map((account) => {
        return <MemoizedBalance key={account.id} account={account} />;
      })}
    </div>
  );
}

const Balance = ({ account }) => {
  const { classes } = useStyles();
  const prevCountRef = useRef(account.balance);

  useEffect(() => {
    
    if (account.type === "customerDeposits" && account.id === 3) {
      console.log("ROUND USE EFFECT")
      console.log("account.balance: " + account.balance);
      console.log("prevCountRef: " + prevCountRef.current);
    }
    if (account.balance !== prevCountRef.current) {
      prevCountRef.current = account.balance;
    }
  }, [account.balance]);
  if (account.type === "customerDeposits" && account.id === 3) {
    console.log("ROUND USE STATE")
    console.log("account.balance: " + account.balance);
    console.log("prevCountRef: " + prevCountRef.current);
  }
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

const MemoizedBalance = React.memo(Balance)