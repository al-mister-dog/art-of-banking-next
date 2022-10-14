import React from "react";
import { createStyles, Text, useMantineTheme } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  assignment: {
    transition: "all 0.5s ease-in",
    background: theme.colors.yellow[7],
    color: "white",
    padding: "0px",
  },
  issuance: {
    transition: "all 0.5s ease-in",
    background: theme.colors.green[7],
    color: "white",
    padding: "0px",
  },
  setOff: {
    transition: "all 0.5s ease-in",
    background: theme.colors.red[7],
    color: "white",
    padding: "0px",
  },
  novation: {
    transition: "all 0.5s ease-in",
    background: theme.colors.blue[7],
    color: "white",
    padding: "0px",
  },
}));

const SpreadsheetRow = ({ record, bank }) => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  if (record === null) {
    return (
      <Text
        size="xs"
        style={{ borderBottom: `1px solid ${theme.colors[bank.color][2]}` }}
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
      style={{ borderBottom: `1px solid ${theme.colors[bank.color][2]}` }}
    >
      {record.symbol}
      {record.amount} {record.instrumentType}{" "}
      {record.name === "clearinghouse" ? "CH" : record.name}
    </Text>
  );
};

const MemoizedSpreadsheetRow = React.memo(SpreadsheetRow);
export default MemoizedSpreadsheetRow;
