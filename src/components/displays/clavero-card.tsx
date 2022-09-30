import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { Record } from "../../domain/Records";
import Clavero from "../balancesheets/cards/balances/balance-displays/clavero";
import ClaveroList from "../balancesheets/cards/balances/balance-displays/clavero-list";

const useStyles = createStyles((theme) => ({
  card: {
    paddingBottom: "0px",
    backgroundColor: theme.colors.violet[1],
    minWidth: "350px",
    margin: "5px",
  },
  header: { padding: "5px", cursor: "pointer" },
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
}));

export default function ClaveroCard({ bank }) {
  const { classes } = useStyles();

  const { assets, liabilities } = Record.getAllTransactions(bank.cardInfo.id);

  return (
    <Card
      key={bank.cardInfo.id}
      p="sm"
      radius="xs"
      shadow="sm"
      className={classes.card}
    >
      <Card.Section className={`${classes.header} ${classes[bank.color]}`}>
        <Center>
          <Title order={4} color="white">
            {bank.cardInfo.name}
          </Title>
        </Center>
      </Card.Section>
      <SimpleGrid
        cols={2}
        sx={{ borderBottom: "1px solid black", padding: "5px" }}
      >
        <Text size="sm" weight="bold" align="center">
          Assets
        </Text>
        <Text size="sm" weight="bold" align="center">
          Liabilities
        </Text>
      </SimpleGrid>

      <Card.Section>
        <SimpleGrid cols={2} spacing={0}>
          <div>
            {assets.map((record: any, index) => {
              return <Spreadsheet key={index} record={record} />;
            })}
          </div>
          <div>
            {liabilities.map((record: any, index) => {
              return <Spreadsheet key={index} record={record} />;
            })}
          </div>
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
