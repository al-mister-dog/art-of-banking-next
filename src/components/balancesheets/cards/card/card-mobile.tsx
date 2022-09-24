import { createContext, useContext, useState } from "react";

export const DrawerContext = createContext((v: boolean) => {});

import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  Drawer,
} from "@mantine/core";

import SideUI from "../side-flash";
import BankDetail from "../../bank-detail/mobile";

import { CardInfo } from "../../types";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.violet[1],
    paddingBottom: "0px",
    width: "90%",
    margin: "auto",
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

export default function CardUI({ bank }: { bank: CardInfo }) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <Card
      key={bank.cardInfo.id}
      shadow="sm"
      p="sm"
      radius="sm"
      className={classes.card}
    >
      <Card.Section
        className={`${classes.header} ${classes[bank.color]}`}
        onClick={() => setOpened(true)}
      >
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
      <SimpleGrid cols={2} style={{ height: "110px", overflowX: "hidden" }}>
        <div>
          {bank.balanceSheet.assets.map((asset: any) => {
            return <SideUI key={asset.instrument} side={asset} />;
          })}
        </div>
        <div>
          {bank.balanceSheet.liabilities.map((liability: any) => {
            return <SideUI key={liability.instrument} side={liability} />;
          })}
        </div>
      </SimpleGrid>

      <DrawerContext.Provider value={setOpened}>
        <Drawer
          opened={opened}
          onClose={() => setOpened(false)}
          title={`${bank.cardInfo.name}: ${bank.cardInfo.type}`}
          padding="xl"
          size="lg"
        >
          <BankDetail bank={bank} />
        </Drawer>
      </DrawerContext.Provider>
    </Card>
  );
}
