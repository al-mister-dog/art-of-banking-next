import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import { useMediaQuery } from "@mantine/hooks";
import { MantineProvider } from "@mantine/core";
import { CardInfo } from "../types";
import { Display } from "../../../domain/display";
import { Bank } from "../../../domain/structures";
import LayoutMobile from "./card/layout-mobile";
import LayoutDesktop from "./card/layout-desktop";
import React from "react";
import { mediaQuery } from "../../../config/media-query";

interface Colors {
  [index: string]: any;
}

function BalanceSheetsContainer() {
  const { banks } = useAppSelector(selectBanks);
  const isMobile = useMediaQuery(mediaQuery);
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
          {isMobile ? (
            <LayoutMobile banksArray={banksArray} />
          ) : (
            <LayoutDesktop banksArray={banksArray} />
          )}
        </MantineProvider>
      </>
    );
  }
}

const Memoized = React.memo(BalanceSheetsContainer);

export default Memoized;
