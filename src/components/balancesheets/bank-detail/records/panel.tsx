import { Box, Text, useMantineTheme } from "@mantine/core";
import { Record } from "../../../../domain/Records";
import { records } from "../../../../domain/structures";
import { createStyles } from "@mantine/core";
const useStyles = createStyles(() => ({
  box: {
    overflowX: "auto",
  },
}));
import uuid from "react-uuid";
export default function RecordsPanel({ bank }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const logs = records.partyLogs[bank.cardInfo.id].log.map((logInfo) => {
    const actions = {
      Deposited:
        logInfo.direction === "to"
          ? `${logInfo.action} $${logInfo.amount} into ${logInfo.name} account`
          : `Received $${logInfo.amount} from ${logInfo.name}`,
      Withdraw:
        logInfo.direction === "to"
          ? `Paid out $${logInfo.amount} to ${logInfo.name}`
          : `Withdrew $${logInfo.amount} from ${logInfo.name} account`,
      Transfer:
        logInfo.direction === "to"
          ? `Transfered $${logInfo.amount} to ${logInfo.name}`
          : `Received $${logInfo.amount} transfer from ${logInfo.name}`,
    };
    console.log(logInfo.action);
    // const action =
    //   logInfo.direction === "to"
    //     ? `${logInfo.action} $${logInfo.amount} into ${logInfo.name} account`
    //     : `Received $${logInfo.amount} from ${logInfo.name}`;
    const action = actions[logInfo.action];
    return action;
  });

  return (
    <>
      <Box
        className={classes.box}
      >
        {logs.map((log: string, index: number) => {
          return (
            <div
              key={uuid()}
              style={{
                padding: "5px",
                backgroundColor: `${index % 2 === 0 ? "rgba(0,0,0,0.1)" : ""}`,
              }}
            >
              <Text size="sm" color={theme.colors[bank.color][9]}>
                {log}
              </Text>
            </div>
          );
        })}
      </Box>
    </>
  );
}
