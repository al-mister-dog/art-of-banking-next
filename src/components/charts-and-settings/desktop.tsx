import { useAppSelector } from "../../app/hooks";
import { selectLectures } from "../../features/lectures/lecturesSlice";
import { sliderSettings } from "../../features/settings/initialState";
import {
  Card,
  Center,
  Grid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import LineChart from "../charts/linechart";
import RefreshBalanceSheets from "./settings/refresh";
import OverdraftSlider from "./settings/slider-overdraft";
import ReserveRequirementSlider from "./settings/slider-reserve-requirement";
import InterestRateSlider from "./settings/slider-interest-rate";
import DisplayRadioGroup from "./settings/radio-group-display";
import ColorsRadioGroup from "./settings/radio-group-colors";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectLectures);
  const theme = useMantineTheme();
  const slidersDisabled = sliderSettings[currentLectureId];
  
  return (
    <Grid grow>
      <Grid.Col span={1}>
        <Card style={{ backgroundColor: theme.colors.violet[1] }}>
          <Center>
            <Title order={4}>Settings</Title>
          </Center>
          <RefreshBalanceSheets />
          <OverdraftSlider disabled={slidersDisabled.overdraft} />
          <ReserveRequirementSlider disabled={slidersDisabled.reserveRequirement} />
          <InterestRateSlider disabled={slidersDisabled.interestRate} />
          <DisplayRadioGroup />
          <ColorsRadioGroup />
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <Card style={{ backgroundColor: theme.colors.violet[1] }}>
          <LineChart />
        </Card>
      </Grid.Col>
    </Grid>
  );
}
