import { createStyles } from "@mantine/core";
import {
  ActionIcon,
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { Dots } from "tabler-icons-react";
import { CardInfo } from "../types";
import SideUI from "./side";

const useStyles = createStyles((theme) => ({
  card: { paddingBottom: "0px", backgroundColor: theme.colors.violet[1] },
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

interface Props {
  bank: CardInfo;
  setBankDetail: (v: CardInfo) => void;
}
export default function CardUI({ bank, setBankDetail }: Props) {
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
        onClick={() => setBankDetail(bank)}
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
      {/* <ActionIcon
        color="teal"
        variant="transparent"
        style={{ marginLeft: "auto" }}
      >
        <Dots />
      </ActionIcon> */}
    </Card>
  );
}
