import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import { useCallback, useEffect, useRef } from "react";
import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";
import { CardInfo } from "../../types";
import BalanceByInstrument from "../balances/balance-by-instrument";
import { Record } from "../../../../domain/Records";
import SpreadsheetList from "../balances/balance-displays/spreadsheet-list";

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
  teal: {
    backgroundColor: theme.colors.teal,
    "&:hover": {
      backgroundColor: theme.colors.teal[3],
    },
  }
}));
interface Props {
  bank: CardInfo;
  handleSetBankDetail: (v: CardInfo) => void;
}
export default function CardUI({ bank, handleSetBankDetail }: Props) {
  const { displaySettings, spreadsheetSettings } = useAppSelector(selectSettings);
  const { classes } = useStyles();
  const onSelectBank = useCallback((bank: CardInfo) => {
    handleSetBankDetail(bank);
  }, []);
  
  let spreadsheetBalances = { assets: undefined, liabilities: undefined };
  if (spreadsheetSettings.latest) {
    spreadsheetBalances = Record.get(bank.cardInfo.id);
  } else if (spreadsheetSettings.lastTwo) {
    spreadsheetBalances = Record.getLastTwo(bank.cardInfo.id);
  } else if (spreadsheetSettings.all) {
    spreadsheetBalances = Record.getAllTransactions(bank.cardInfo.id);
  }
  return (
    <Card
      key={bank.cardInfo.id}
      // shadow="sm"
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
      {displaySettings.spreadsheet && spreadsheetBalances.assets !== undefined ? (
        <SpreadsheetList
          assets={spreadsheetBalances.assets}
          liabilities={spreadsheetBalances.liabilities}
        />
      ) : (
        <SimpleGrid cols={2} style={{ height: "110px", overflowX: "hidden" }}>
          <div>
            {bank.balanceSheet.assets.map((asset: any) => {
              return (
                <BalanceByInstrument
                  key={asset.instrument}
                  side={asset}
                  id={bank.cardInfo.id}
                />
              );
            })}
          </div>
          <div>
            {bank.balanceSheet.liabilities.map((lbys: any) => {
              return (
                <BalanceByInstrument
                  key={lbys.instrument}
                  side={lbys}
                  id={bank.cardInfo.id}
                />
              );
            })}
          </div>
        </SimpleGrid>
      )}
    </Card>
  );
}
