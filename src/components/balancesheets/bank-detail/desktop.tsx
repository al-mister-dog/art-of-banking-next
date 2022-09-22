import {
  Card,
  Center,
  Title,
  Tabs,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { CardInfo } from "../types";
import ActionsPanel from "./actions/panel";
import LineChart from "../../charts/linechartbank";

const useStyles = createStyles((theme) => ({
  header: { padding: "5px" },

  grape: {
    color: theme.colors.grape,
  },
  violet: {
    color: theme.colors.violet,
  },
  indigo: {
    color: theme.colors.indigo,
  },
}));

export default function SidePanel({ bank }: { bank: CardInfo }) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  
  return (
    <Card
      shadow="sm"
      p="sm"
      radius="sm"
      style={{
        paddingBottom: "0px",
        minHeight: "450px",
        backgroundColor: theme.colors.violet[1],
      }}
    >
      <Card.Section className={`${classes.header} ${classes[bank.color]}`}>
        <Center>
          <Title order={2} color={`${bank.color}`}>
            {bank.cardInfo.name}
          </Title>
        </Center>
      </Card.Section>
      <Tabs color={`${bank.color}`} defaultValue="actions">
        <Tabs.List grow>
          <Tabs.Tab value="actions">Actions</Tabs.Tab>
          <Tabs.Tab value="charts">Charts</Tabs.Tab>
          <Tabs.Tab value="records">Records</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="actions" pt="xs">
          <ActionsPanel bank={bank} />
        </Tabs.Panel>

        <Tabs.Panel value="charts" pt="xs">
          Charts tab content
          {/* <LineChart bank={bank} /> */}
        </Tabs.Panel>

        <Tabs.Panel value="records" pt="xs">
          Records tab content
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}
