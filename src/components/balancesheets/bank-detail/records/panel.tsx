import { Box, Text, useMantineTheme } from "@mantine/core";
import { Record } from "../../../../domain/Records";
import { records } from "../../../../domain/structures";
import { createStyles } from "@mantine/core";
const useStyles = createStyles(() => ({
  box: {
    height: "21rem",
    overflowX: "auto",
  },
}));
import uuid from "react-uuid";
export default function RecordsPanel({ bank }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const logs = records.partyLogs[bank.cardInfo.id].log.map((logInfo) => {
    return { action: logInfo.action, symbol: logInfo.symbol };
  });

  return (
    <>
      <Box className={classes.box}>
        {logs.map((log: { action: string; symbol: string }, index: number) => {
          return (
            <div
              key={uuid()}
              style={{
                padding: "3px",
                backgroundColor: `${index % 2 === 0 ? "rgba(0,0,0,0.1)" : ""}`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Text size="sm" color={theme.colors[bank.color][9]}>
                {log.action}
              </Text>
              <Text
                size="md"
                weight="bold"
                color={
                  log.symbol === "+"
                    ? theme.colors.green[9]
                    : theme.colors.red[9]
                }
                mr={15}
              >
                {log.symbol}
              </Text>
            </div>
          );
        })}
      </Box>
    </>
  );
}
