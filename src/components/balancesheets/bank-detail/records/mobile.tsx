import { useState } from "react";
import { Box, Radio, Text, useMantineTheme } from "@mantine/core";
import { records } from "../../../../domain/structures";
import { createStyles } from "@mantine/core";
const useStyles = createStyles(() => ({
  box: {
    maxHeight: "21rem",
    overflowX: "auto",
  },
  newest: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  oldest: {
    display: "flex",
    flexDirection: "column",
  },
}));
import uuid from "react-uuid";

export default function RecordsPanel({ bank }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const [order, setOrder] = useState("newest");
  const logs = records.partyLogs[bank.cardInfo.id].log.map((logInfo) => {
    return {
      action: logInfo.action,
      symbol: logInfo.symbol,
      aside: logInfo.aside,
    };
  });

  return (
    <>
      <Box className={classes.box}>
        <div className={classes[order]}>
          {logs.map(
            (
              log: { action: string; symbol: string; aside?: boolean },
              index: number
            ) => {
              return (
                <div
                  key={uuid()}
                  style={{
                    padding: "3px",
                    backgroundColor: `${
                      index % 2 === 0 ? "rgba(0,0,0,0.1)" : ""
                    }`,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    size="xs"
                    color={log.aside ? "gray" : theme.colors[bank.color][9]}
                  >
                    <span>{index + 1}: </span> {log.action}
                  </Text>
                  <Text
                    size="sm"
                    weight="bold"
                    color={
                      log.aside
                        ? "gray"
                        : log.symbol === "+"
                        ? theme.colors.green[9]
                        : theme.colors.red[9]
                    }
                    mr={15}
                  >
                    {log.symbol}
                  </Text>
                </div>
              );
            }
          )}
        </div>
      </Box>
      <Box mt={10}>
        <Text size="sm" weight="bold" color={theme.colors[bank.color][9]}>
          Sort By
        </Text>
        <Radio.Group value={order} onChange={setOrder} name="sortBy">
          <Radio
            color={`${bank.color}`}
            value="newest"
            label={
              <Text size="xs" color={theme.colors[bank.color][9]}>
                newest
              </Text>
            }
          />
          <Radio
            color={`${bank.color}`}
            value="oldest"
            label={
              <Text size="xs" color={theme.colors[bank.color][9]}>
                oldest
              </Text>
            }
          />
        </Radio.Group>
      </Box>
    </>
  );
}
