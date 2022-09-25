import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { createStyles } from "@mantine/core";
import {
  ActionIcon,
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
import { useCallback, useMemo } from "react";
import { Dots } from "tabler-icons-react";
import { CardInfo } from "../../types";
import SideRound from "../side-round";
import SideStatic from "../side-static";
import SideFlash from "../side-flash";
import SideOff from "../side-off";
import { creditData } from "../../../../domain/structures";

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
  handleSetBankDetail: (v: CardInfo) => void;
}
export default function CardUI({ bank, handleSetBankDetail }: Props) {
  const { colorSettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const onSelectBank = useCallback((bank) => {
    handleSetBankDetail(bank);
  }, []);
  
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
        onClick={() => onSelectBank(bank)}
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
              return <SideRound key={asset.instrument} side={asset} />;
            }
            if (colorSettings.static) {
              return <SideStatic key={asset.instrument} side={asset} />;
            }
            if (colorSettings.flash) {
              return <SideFlash key={asset.instrument} side={asset} />;
            }
            if (colorSettings.off) {
              return <SideOff key={asset.instrument} side={asset} />;
            }
          })}
        </div>
        <div>
          {bank.balanceSheet.liabilities.map((liability: any) => {
            if (colorSettings.round) {
              return <SideRound key={liability.instrument} side={liability} />;
            }
            if (colorSettings.static) {
              return <SideStatic key={liability.instrument} side={liability} />;
            }
            if (colorSettings.flash) {
              return <SideFlash key={liability.instrument} side={liability} />;
            }
            if (colorSettings.off) {
              return <SideOff key={liability.instrument} side={liability} />;
            }
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
