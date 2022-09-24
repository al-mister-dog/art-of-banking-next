import { createStyles, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";

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

export default function SideUI({ side }) {
  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="xs" weight="bold" align="left">
        {side.instrument}
      </Text>
      {side.accounts.map((account) => {
        return <Balance key={account.id} account={account} />;
      })}
    </div>
  );
}

function Balance({ account }) {
  const { classes } = useStyles();
  const [prevBalance, setPrevBalance] = useState(account.balance);
  const prevCountRef = useRef(account.balance);

  useEffect(() => {
    prevCountRef.current = account.balance;
    setPrevBalance(prevCountRef.current);
  }, [account.balance]);

  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={`${account.balance === prevBalance && classes.text} ${
        account.balance < prevBalance && classes.decrease
      } ${account.balance > prevBalance && classes.increase}`}
    >
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
}
