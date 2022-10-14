import { MantineProvider } from "@mantine/core";
import { CardInfo } from "../types";
import Layout from "./layout";
import React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { selectBanks } from "../../../../features/banks/banksSlice";
import { Bank } from "../../../../domain/structures/types";
import { Display } from "../../../../domain/analytics/display";

interface Colors {
  [index: string]: any;
}

function BalanceSheetsContainer() {
  const { banks } = useAppSelector(selectBanks);
  const colors: Colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "blue",
    clearinghouse: "blue",
  };

  function getCardInfo(bank: Bank): CardInfo {
    const cardInfo = { ...bank };
    const balanceSheet = Display.balanceSheet(cardInfo);
    const color = colors[`${bank.type}`] as keyof Colors;
    return { cardInfo, balanceSheet, color };
  }

  const banksArray: CardInfo[] = Object.keys(banks)
    .map((bank) => banks[bank])
    .map((bank) => getCardInfo(bank));

  if (banksArray.length > 0) {
    return (
      <>
        <MantineProvider theme={{ fontFamily: `"Poppins"` }}>
          <Layout banksArray={banksArray} />
        </MantineProvider>
      </>
    );
  }
}

const Memoized = React.memo(BalanceSheetsContainer);

export default Memoized;
