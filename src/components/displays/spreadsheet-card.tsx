import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { Record } from "../../domain/services/records";
import SpreadsheetRow from "../interactive-ui/cards/balances/balance-displays/spreadsheet-row";

const useStyles = createStyles((theme) => ({
  card: {
    margin: "10px",
    paddingBottom: "0px",
    minHeight: "13.75rem",
    minWidth: "24rem",
    backgroundColor: theme.colors.violet[1],
  },
  header: { padding: "3px", cursor: "pointer" },
  grape: {
    backgroundColor: theme.colors.grape,
    "&:hover": {
      backgroundColor: theme.colors.grape[3],
    },
  },
  violet: {
    backgroundColor: theme.colors.violet,
    "&:hover": {
      backgroundColor: theme.colors.violet[3],
    },
  },
  indigo: {
    backgroundColor: theme.colors.violet,
    "&:hover": {
      backgroundColor: theme.colors.violet[3],
    },
  },
  pink: {
    backgroundColor: theme.colors.pink,
    "&:hover": {
      backgroundColor: theme.colors.pink[3],
    },
  },
  blue: {
    backgroundColor: theme.colors.blue,
    "&:hover": {
      backgroundColor: theme.colors.blue[3],
    },
  },
}));

export default function RowCard({ bank }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { assets, liabilities } = Record.getAllTransactions(bank.cardInfo.id);

  return (
    <Card
      key={bank.cardInfo.id}
      shadow="sm"
      p="sm"
      radius="xs"
      className={classes.card}
    >
      <Card.Section className={`${classes.header} ${classes[bank.color]}`}>
        <Center>
          <Title order={4} color="white">
            {bank.cardInfo.name}
          </Title>
        </Center>
      </Card.Section>
      <Card.Section>
        <SimpleGrid
          cols={2}
          sx={{
            borderBottom: `1px solid ${theme.colors[bank.color][2]}`,
            height: "1.25rem",
          }}
        >
          <Text
            size="xs"
            weight="bold"
            align="center"
            color={`${theme.colors[bank.color][9]}`}
          >
            Assets
          </Text>
          <Text
            size="xs"
            weight="bold"
            align="center"
            color={`${theme.colors[bank.color][9]}`}
          >
            Liabilities
          </Text>
        </SimpleGrid>
      </Card.Section>

      <Card.Section style={{ padding: "5px" }}>
        <SimpleGrid
          cols={2}
          spacing={0}
          style={{  overflowX: "hidden" }}
        >
          <div
            style={{ borderRight: `1px solid ${theme.colors[bank.color][2]}` }}
          >
            {assets.map((record: any, index: number) => {
              return <SpreadsheetRow key={index} record={record} bank={bank} />;
            })}
          </div>
          <div>
            {liabilities.map((record: any, index: number) => {
              return <SpreadsheetRow key={index} record={record} bank={bank} />;
            })}
          </div>
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
