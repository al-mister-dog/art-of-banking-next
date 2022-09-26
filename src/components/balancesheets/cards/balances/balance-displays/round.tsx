import { useAppSelector } from "../../../../../app/hooks";
import { selectSettings } from "../../../../../features/settings/settingsSlice";
import { createStyles, Text } from "@mantine/core";
import React from "react";
import useColorSettings from "../../../../../hooks/useColorSettings";
import useSymbolSettings from "../../../../../hooks/useSymbolSettings";

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

const Balance = ({ account, id }) => {
  const { classes } = useStyles();
  const { displaySettings } = useAppSelector(selectSettings);
  const color = useColorSettings(account.balance);
  const symbol = useSymbolSettings(account.balance);
  let info = "";
  if (account.category === "reserves") {
    info = `${symbol}${account.balance} ${account.category}`;
  }
  if (account.subordinateId === id) {
    info = `${symbol}${account.balance} ${account.type} at ${account.thirdPartyDetail.name}`;
  }
  if (account.superiorId === id) {
    info = `${symbol}${account.balance} ${account.type} from ${account.thirdPartyDetail.name}`;
  }
  const info2 = `${
    account.thirdPartyDetail?.name ? `${account.thirdPartyDetail.name}: ` : ""
  }$${account.balance}`;

  return (
    <Text size="xs" weight="bold" align="left" className={classes[color]}>
      {displaySettings.taccounts ? `${info}` : `${info2}`}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
