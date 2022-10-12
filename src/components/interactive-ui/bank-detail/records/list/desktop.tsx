import uuid from "react-uuid";
import { Text, useMantineTheme } from "@mantine/core";
import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  newest: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  oldest: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function RecordList({ bank, logs, order }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  return (
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
                backgroundColor: `${index % 2 === 0 ? "rgba(0,0,0,0.1)" : ""}`,
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
  );
}
