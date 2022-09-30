import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { MantineProvider } from "@mantine/core";
import { CardInfo } from "../types";
import { Display } from "../../../domain/display";
import { Bank, creditData, records } from "../../../domain/structures";
import LayoutMobile from "./card/layout-mobile";
import LayoutDesktop from "./card/layout-desktop";
import { useRef, useState } from "react";
import { selectActions } from "../../../features/actions/actionsSlice";

interface Colors {
  [index: string]: any;
}

export default function BalanceSheetsContainer() {
  const { banks } = useAppSelector(selectBanks);
  const isMobile = useMediaQuery();

  const colors: Colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "teal",
    clearinghouse: "pink",
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

  return (
    <>
      <MantineProvider theme={{ fontFamily: `"Poppins"` }}>
        {isMobile ? (
          <LayoutMobile banksArray={banksArray} />
        ) : (
          <LayoutDesktop banksArray={banksArray} />
        )}
      </MantineProvider>
    </>
  );
}
