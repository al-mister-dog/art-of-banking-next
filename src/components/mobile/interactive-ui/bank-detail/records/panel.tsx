import { useState } from "react";
import { Record } from "../../../../../domain/services/records";
import { Box, createStyles } from "@mantine/core";
import RecordList from "./list";
import ToggleOrder from "./settings/order-by";

const useStyles = createStyles(() => ({
  box: {
    maxHeight: "21rem",
    overflowX: "auto",
  },
}));

export default function RecordsPanel({ bank }) {
  const { classes } = useStyles();
  const [order, setOrder] = useState("newest");
  const logs = Record.getLogs(bank.cardInfo.id);

  return (
    <>
      <Box className={classes.box}>
        <RecordList bank={bank} logs={logs} order={order} />
      </Box>
      <ToggleOrder bank={bank} order={order} setOrder={setOrder} />
    </>
  );
}
