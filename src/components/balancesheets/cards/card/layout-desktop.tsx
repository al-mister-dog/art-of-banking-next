import { Grid } from "@mantine/core";
import { useState, useCallback } from "react";
import { CardInfo } from "../../types";
import CardGrid from "./card-grid-desktop";
import BankDetail from "../../bank-detail/desktop";

export function LayoutDesktop({ banksArray }: { banksArray: CardInfo[] }) {
  const [bankDetail, setBankDetail] = useState(banksArray[0]);
  if (
    !banksArray.map((bank) => bank.cardInfo.id).includes(bankDetail.cardInfo.id)
  ) {
    setBankDetail(banksArray[0]);
  }
  const handleSetBankDetail = useCallback((bank) => {
    setBankDetail(bank);
  }, []);
  return (
    <Grid grow>
      <Grid.Col span={4}>
        <CardGrid
          group={banksArray}
          handleSetBankDetail={handleSetBankDetail}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <BankDetail key={bankDetail.cardInfo.id} bank={bankDetail} />
      </Grid.Col>
    </Grid>
  );
}
