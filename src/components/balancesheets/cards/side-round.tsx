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
      {side.accounts.map((account, i) => {
        return <MemoizedBalance key={i} account={account} />;
      })}
    </div>
  );
}

const Balance = ({ account }) => {
  const { classes } = useStyles();
  const prevCountRef = useRef(account.balance);
  const prevClass = useRef("text");

  if (account.balance !== prevCountRef.current) {
    if (account.balance > prevCountRef.current) {
      prevClass.current = "increase";
    }
    if (account.balance < prevCountRef.current) {
      prevClass.current = "decrease";
    }
    prevCountRef.current = account.balance; //*
  }

  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={classes[prevClass.current]}
    >
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);

/**
 * if the balance has changed we want to display this with a color
 * if balance has increased color changes green
 * if balance has decreased color changes red
 * then previous balance is set to current balance
 * if no change has occured th previous balance does not need to be set
 */
