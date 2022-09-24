import { useAppSelector } from "../../../app/hooks";
import { selectBanks } from "../../../features/banks/banksSlice";
import React, { useCallback, useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { Group, MantineProvider, Grid } from "@mantine/core";
import CardDesktopUI from "./card/card-desktop";
import CardMobileUI from "./card/card-mobile";
import { Display } from "../../../domain/display";
import { CardInfo } from "../types";
import { Bank } from "../../../domain/structures";
import BankDetailDesktop from "../bank-detail/desktop";
import LayoutMobile from "./card/layout-mobile";
import { LayoutDesktop } from "./card/layout-desktop";

interface Colors {
  [index: string]: any;
}

export default function BalanceSheetsContainer() {
  const { banks } = useAppSelector(selectBanks);
  const isMobile = useMediaQuery();

  const colors: Colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "indigo",
    clearinghouse: "pink",
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

// function LayoutDesktop({ banksArray }: { banksArray: CardInfo[] }) {
//   const [bankDetail, setBankDetail] = useState(banksArray[0]);

//   if (
//     !banksArray.map((bank) => bank.cardInfo.id).includes(bankDetail.cardInfo.id)
//   ) {
//     setBankDetail(banksArray[0]);
//   }
//   const handleSetBankDetail = useCallback((bank) => {
//     setBankDetail(bank);
//   }, []);
//   return (
//     <Grid grow>
//       <Grid.Col span={4}>
//         <Foo group={banksArray} handleSetBankDetail={handleSetBankDetail} />
//       </Grid.Col>
//       <Grid.Col span={1}>
//         <BankDetailDesktop key={bankDetail.cardInfo.id} bank={bankDetail} />
//       </Grid.Col>
//     </Grid>
//   );
// }

// function LayoutMobile({ banksArray }: { banksArray: CardInfo[] }) {
//   function halveArray(array: any[]) {
//     const half = array.length / 2;
//     const halfAndRemainder = Math.round(half);
//     return array.length % 2 === 0
//       ? [array.slice(0, half), array.slice(half, array.length)]
//       : [
//           array.slice(0, halfAndRemainder),
//           array.slice(halfAndRemainder, array.length),
//         ];
//   }

//   const [group1, group2] = halveArray(banksArray);
//   return (
//     <Group style={{ height: "65vh", width: "100%", overflow: "auto" }}>
//       {banksArray.map((bank) => (
//         <CardMobileUI key={bank.cardInfo.id} bank={bank} />
//       ))}
//     </Group>
//   );
// }

// function CardGrid({ group, handleSetBankDetail }) {
//   function halveArray(a) {
//     const half = a.length / 2;
//     const halfAndRemainder = Math.round(half);
//     return a.length % 2 === 0
//       ? [a.slice(0, half), a.slice(half, a.length)]
//       : [a.slice(0, halfAndRemainder), a.slice(halfAndRemainder, a.length)];
//   }

//   const [group1, group2] = halveArray(group);

//   return (
//     <Grid gutter="xl" grow>
//       <Grid.Col span={1}>
//         <div style={{ height: "450px", overflow: "auto" }}>
//           {group1.map((bank) => (
//             <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
//               <CardDesktopUI
//                 bank={bank}
//                 handleSetBankDetail={handleSetBankDetail}
//               />
//             </div>
//           ))}
//         </div>
//       </Grid.Col>
//       <Grid.Col span={1}>
//         <div style={{ height: "450px", overflow: "auto" }}>
//           {group2.map((bank) => (
//             <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
//               <CardDesktopUI
//                 bank={bank}
//                 handleSetBankDetail={handleSetBankDetail}
//               />
//             </div>
//           ))}
//         </div>
//       </Grid.Col>
//     </Grid>
//   );
// }

// const Foo = React.memo(CardGrid);
