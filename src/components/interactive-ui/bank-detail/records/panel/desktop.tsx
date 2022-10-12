import { useState } from "react";
import { Record } from "../../../../../domain/services/records";
import { Box, Text, createStyles } from "@mantine/core";
import RecordList from "../list/desktop";
import ToggleOrder from "../settings/orderby/desktop";

const useStyles = createStyles(() => ({
  box: {
    maxHeight: "16rem",
    overflowX: "auto",
  },
}));

export default function RecordsPanel({ bank }) {
  const { classes } = useStyles();
  const [order, setOrder] = useState("newest");
  const logs = Record.getLogs(bank.cardInfo.id);
  // const filteredLogs = logs.filter((log) => log.thirdPartyId === 2);

  if (logs.length === 0) {
    return <Text color={bank.color} weight="bold" size="sm">No Records</Text>;
  }
  return (
    <>
      <Box className={classes.box}>
        <RecordList bank={bank} logs={logs} order={order} />
      </Box>
      <ToggleOrder bank={bank} order={order} setOrder={setOrder} />
    </>
  );
}
