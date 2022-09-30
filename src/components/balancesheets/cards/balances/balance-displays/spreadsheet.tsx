import React from "react";
import { createStyles, Text } from "@mantine/core";
import useColorSettings from "../../../../../hooks/useColorSettings";

const useStyles = createStyles((theme) => ({
  assignment: {
    transition: "all 0.5s ease-in",
    background: theme.colors.yellow[7],
    color: "white",
    padding: "0px 3px",
  },
  issuance: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[7],
    color: "white",
    padding: "0px 3px",
  },
  setOff: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[7],
    color: "white",
    padding: "0px 3px",
  },
  novation: {
    transition: "all 0.5s ease-in",
    background: theme.colors.blue[7],
    color: "white",
    padding: "0px 3px",
  },
}));

const Balance = ({ record }) => {
  const { classes } = useStyles();
  if (record === null) {
    return (
      <Text size="xs" 
      style={{borderTop: "1px solid #828282"}}
      >
        <br></br>
      </Text>
    );
  }
  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={classes[record.notationType]}
      style={{borderTop: "1px solid #828282"}}
    >
      {record.symbol}
      {record.amount} {record.instrumentType} {record.name === "clearinghouse" ? "CH" : record.name}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
