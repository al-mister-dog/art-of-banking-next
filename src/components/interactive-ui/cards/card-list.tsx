import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import { MantineProvider } from "@mantine/core";
import { CardInfo } from "../types";
import { Display } from "../../../domain/analytics/display";
import { Bank } from "../../../domain/structures/types";
import LayoutDesktop from "./card/layout-desktop";
import React from "react";

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
          <LayoutDesktop banksArray={banksArray} />
        </MantineProvider>
      </>
    );
  }
}

const Memoized = React.memo(BalanceSheetsContainer);

export default Memoized;
