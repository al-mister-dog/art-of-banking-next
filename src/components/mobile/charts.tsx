import { useAppSelector } from "../../app/hooks";
import { selectActions } from "../../features/actions/actionsSlice";
import { Card, Grid, useMantineTheme } from "@mantine/core";
import ChartPrivateCredit from "./interactive-ui/charts/linechart-private-credit";
import ChartBalances from "./interactive-ui/charts/barchart-balances";
import ChartCredit from "./interactive-ui/charts/linechart-credit";

import { charts } from "../../config/charts";
import EffectiveRate from "./interactive-ui/charts/effective-rate-beta";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  return (
    <div
      style={{
        position: "relative",
        height: `50vh`,
        marginTop: "30px",
      }}
    >
      {charts[currentLectureId] === "balances" && <ChartBalances />}
      {charts[currentLectureId] === "credit" && <ChartCredit />}
      {charts[currentLectureId] === "private credit" && <ChartPrivateCredit />}
      {charts[currentLectureId] === "weighted median" && <EffectiveRate />}
    </div>
  );
}
