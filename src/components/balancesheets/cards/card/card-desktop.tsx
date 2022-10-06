import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { useCallback } from "react";
import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  useMantineTheme,
} from "@mantine/core";
import { CardInfo } from "../../types";
import BalanceByInstrument from "../balances/balance-by-instrument";
import { Record } from "../../../../domain/Records";
import SpreadsheetList from "../balances/balance-displays/spreadsheet-list";

const useStyles = createStyles((theme) => ({
  card: {
    paddingBottom: "0px",
    height: "13.75rem",
    backgroundColor: theme.colors.violet[1],
  },
  header: { padding: "3px", cursor: "pointer" },
  grape: {
    // backgroundColor: theme.colors.grape[8],
    "&:hover": {
      backgroundColor: theme.colors.grape[3],
    },
  },
  violet: {
    // backgroundColor: theme.colors.violet[8],
    "&:hover": {
      backgroundColor: theme.colors.violet[3],
    },
  },
  indigo: {
    // backgroundColor: theme.colors.violet,
    "&:hover": {
      backgroundColor: theme.colors.violet[3],
    },
  },
  pink: {
    // backgroundColor: theme.colors.pink,
    "&:hover": {
      backgroundColor: theme.colors.pink[3],
    },
  },
  teal: {
    // backgroundColor: theme.colors.teal,
    "&:hover": {
      backgroundColor: theme.colors.teal[3],
    },
  },
  blue: {
    // backgroundColor: theme.colors.blue,
    "&:hover": {
      backgroundColor: theme.colors.blue[3],
    },
  },
}));
interface Props {
  bank: CardInfo;
  handleSetBankDetail: (v: CardInfo) => void;
}
export default function CardUI({ bank, handleSetBankDetail }: Props) {
  const { displaySettings, spreadsheetSettings } =
    useAppSelector(selectSettings);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const onSelectBank = useCallback((bank: CardInfo) => {
    handleSetBankDetail(bank);
  }, []);

  let spreadsheetBalances = { assets: undefined, liabilities: undefined };
  if (spreadsheetSettings.each) {
    spreadsheetBalances = Record.getLastTwo(bank.cardInfo.id);
  } else if (spreadsheetSettings.all) {
    spreadsheetBalances = Record.getAllTransactions(bank.cardInfo.id);
  }

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
          {/* <Title order={4} color="white"> */}
          <Title order={4} color={theme.colors[bank.color][9]}>
            {bank.cardInfo.name}
          </Title>
        </Center>
      </Card.Section>
      <Card.Section>
        <SimpleGrid
          cols={2}
          sx={{
            // backgroundColor: theme.colors[bank.color][8],
            borderBottom: `1px solid ${theme.colors[bank.color][2]}`,
            height: "1.25rem",
          }}
        >
          <Text
            size="xs"
            weight="bold"
            align="center"
            color={`${theme.colors[bank.color][9]}`}
            // color="white"
          >
            Assets
          </Text>
          <Text
            size="xs"
            weight="bold"
            align="center"
            color={`${theme.colors[bank.color][9]}`}
            // color="white"
          >
            Liabilities
          </Text>
        </SimpleGrid>
      </Card.Section>
      <Card.Section style={{ padding: "5px" }}>
        {displaySettings.spreadsheet &&
        spreadsheetBalances.assets !== undefined ? (
          <SpreadsheetList
            assets={spreadsheetBalances.assets}
            liabilities={spreadsheetBalances.liabilities}
            bank={bank}
          />
        ) : (
          <SimpleGrid cols={2} style={{ height: "10rem", overflowX: "hidden" }}>
            <div
              style={{
                borderRight: `1px solid ${theme.colors[bank.color][2]}`,
              }}
            >
              {bank.balanceSheet.assets.map((asset: any) => {
                return (
                  <BalanceByInstrument
                    key={asset.instrument}
                    side={asset}
                    id={bank.cardInfo.id}
                    textColor={bank.color}
                  />
                );
              })}
            </div>
            <div>
              {bank.balanceSheet.liabilities.map((liability: any) => {
                return (
                  <BalanceByInstrument
                    key={liability.instrument}
                    side={liability}
                    id={bank.cardInfo.id}
                    textColor={bank.color}
                  />
                );
              })}
            </div>
          </SimpleGrid>
        )}
      </Card.Section>
    </Card>
  );
}
