import { useAppSelector } from "../../../../app/hooks";
import { selectLectures } from "../../../../features/lectures/lecturesSlice";
import { useState, useCallback, useEffect } from "react";
import { Grid } from "@mantine/core";
import { CardInfo } from "../../types";
import CardGrid from "./card-grid-desktop";
import BankDetail from "../../bank-detail/desktop";

export default function LayoutDesktop({
  banksArray,
}: {
  banksArray: CardInfo[];
}) {
  const { currentLectureId } = useAppSelector(selectLectures);
  const [bankDetail, setBankDetail] = useState(banksArray[0]);

  useEffect(() => {
    setBankDetail(banksArray[0]);
  }, [currentLectureId]);

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
