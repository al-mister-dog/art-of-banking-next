import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
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

import BankDetail from "../../bank-detail/mobile";

import Round from "../balances/round";
import Static from "../balances/static";
import Off from "../balances/off";
import Flash from "../balances/flash";

import { CardInfo } from "../../types";

export const useStyles = createStyles((theme) => ({
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
  const { colorSettings } = useAppSelector(selectSettings);
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles();

  return (
    <Card
      key={bank.cardInfo.id}
      shadow="sm"
      p="sm"
      radius="xs"
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
            if (colorSettings.round) {
              return <Round key={asset.instrument} side={asset} />;
            }
            if (colorSettings.static) {
              return <Static key={asset.instrument} side={asset} />;
            }
            if (colorSettings.flash) {
              return <Flash key={asset.instrument} side={asset} />;
            }
            if (colorSettings.off) {
              return <Off key={asset.instrument} side={asset} />;
            }
          })}
        </div>
        <div>
          {bank.balanceSheet.liabilities.map((liability: any) => {
            if (colorSettings.round) {
              return <Round key={liability.instrument} side={liability} />;
            }
            if (colorSettings.static) {
              return <Static key={liability.instrument} side={liability} />;
            }
            if (colorSettings.flash) {
              return <Flash key={liability.instrument} side={liability} />;
            }
            if (colorSettings.off) {
              return <Off key={liability.instrument} side={liability} />;
            }
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
