import { useAppSelector } from "../../app/hooks";
import { selectActions } from "../../features/actions/actionsSlice";
import { Card, Grid, useMantineTheme } from "@mantine/core";
import ChartPrivateCredit from "./charts/linechart-private-credit";
import ChartBalances from "./charts/barchart-balances";
import ChartCredit from "./charts/linechart-credit";
import SettingsDesktop from "./settings/container-desktop";
import SettingsMobile from "./settings/container-mobile";
import { charts } from "../../config/charts";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../config/media-query";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(mediaQuery);
  return (
    <>
      {isMobile ? (
        <div
          style={{
            position: "relative",
            height: `${isMobile ? "50vh" : "inherit"}`,
            marginTop: "30px",
          }}
        >
          {charts[currentLectureId] === "balances" && <ChartBalances />}
          {charts[currentLectureId] === "credit" && <ChartCredit />}
          {charts[currentLectureId] === "private credit" && (
            <ChartPrivateCredit />
          )}
        </div>
      ) : (
        <Grid grow>
          <Grid.Col span={1}>
            <SettingsDesktop />
          </Grid.Col>
          <Grid.Col span={4}>
            <Card style={{ backgroundColor: theme.colors.violet[1] }}>
              {charts[currentLectureId] === "balances" && <ChartBalances />}
              {charts[currentLectureId] === "credit" && <ChartCredit />}
              {charts[currentLectureId] === "private credit" && (
                <ChartPrivateCredit />
              )}
            </Card>
          </Grid.Col>
        </Grid>
      )}
    </>
  );
}
