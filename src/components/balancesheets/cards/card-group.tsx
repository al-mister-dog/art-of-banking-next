import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import React, { useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { Group, MantineProvider, Grid, Center } from "@mantine/core";
import CardUI from "./card";
import CardMobileUI from "./cardmobile";
import { Display } from "../../../domain/display";
import { CardInfo } from "../types";
import { Bank } from "../../../domain/structures";
import BankDetailDesktop from "../bank-detail/desktop";

interface Colors {
  [index: string]: any;
}

export default function BalanceSheet() {
  const { banks } = useAppSelector(selectBanks);
  const isMobile = useMediaQuery();

  const colors: Colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "indigo",
    clearinghouse: "pink"
  };

  function getCardInfo(bank: Bank): CardInfo {
    const cardInfo = { ...bank };
    const balanceSheet = Display.balanceSheet(bank);
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

function LayoutDesktop({ banksArray }: { banksArray: CardInfo[] }) {
  const [bankDetail, setBankDetail] = useState(banksArray[0]);
  //hack
  if (
    !banksArray.map((bank) => bank.cardInfo.id).includes(bankDetail.cardInfo.id)
  ) {
    setBankDetail(banksArray[0])
  }
  return (
    <Grid grow>
      <Grid.Col span={4}>
        <CardGrid group={banksArray} setBankDetail={setBankDetail} />
      </Grid.Col>
      <Grid.Col span={1}>
        <BankDetailDesktop key={bankDetail.cardInfo.id} bank={bankDetail} />
      </Grid.Col>
    </Grid>
  );
}

function LayoutMobile({ banksArray }: { banksArray: CardInfo[] }) {
  return (
    <Group>
      {banksArray.map((bank) => (
        <CardMobileUI key={bank.cardInfo.id} bank={bank} />
      ))}
    </Group>
  );
}

function CardGrid({ group, setBankDetail }) {
  function halveArray(a) {
    const half = a.length / 2;
    const halfAndRemainder = Math.round(half);
    return a.length % 2 === 0
      ? [a.slice(0, half), a.slice(half, a.length)]
      : [a.slice(0, halfAndRemainder), a.slice(halfAndRemainder, a.length)];
  }

  const [group1, group2] = halveArray(group);

  return (
    <Grid gutter="xl" grow>
      <Grid.Col span={1}>
        <div style={{ height: "450px", overflow: "auto" }}>
          {group1.map((bank) => (
            <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
              <CardUI bank={bank} setBankDetail={setBankDetail} />
            </div>
          ))}
        </div>
      </Grid.Col>
      <Grid.Col span={1}>
        <div style={{ height: "450px", overflow: "auto" }}>
          {group2.map((bank) => (
            <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
              <CardUI bank={bank} setBankDetail={setBankDetail} />
            </div>
          ))}
        </div>
      </Grid.Col>
    </Grid>
  );
}
