import { createStyles, Text } from "@mantine/core";
import React from "react";

const useStyles = createStyles(() => ({
  text: {
    color: "black",
    padding: "0px 3px",
  },
}));

const Balance = ({ account }) => {
  const { classes } = useStyles();

  return (
    <Text size="xs" weight="bold" align="left" className={classes.text}>
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
