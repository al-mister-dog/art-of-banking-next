import { useAppSelector } from "../../app/hooks";
import { selectActions } from "../../features/actions/actionsSlice";
import { sliderSettings } from "../../features/settings/initialState";
import { Card, Center, Grid, Title, useMantineTheme } from "@mantine/core";
import LineChart from "./charts/linechart-private-credit";
import LineChartNational from "./charts/linechart-balances";
import RefreshBalanceSheets from "./settings/refresh";
import OverdraftSlider from "./settings/slider-overdraft";
import ReserveRequirementSlider from "./settings/slider-reserve-requirement";
import InterestRateSlider from "./settings/slider-interest-rate";
import DisplayRadioGroup from "./settings/radio-group-display/mobile";
import ColorsRadioGroup from "./settings/radio-group-colors";
import BarChart from "./charts/barchart-balances";
import { Bar } from "react-chartjs-2";
import { charts } from "../../config/charts";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  const theme = useMantineTheme();
  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <>
      <Center>
        <Title order={4}>Settings</Title>
      </Center>
      <OverdraftSlider
        disabled={slidersDisabled.overdraft}
        overdraftValue={overdraftValue}
      />
      <ReserveRequirementSlider disabled={slidersDisabled.reserveRequirement} />
      <InterestRateSlider disabled={slidersDisabled.interestRate} />
      <DisplayRadioGroup />
      <ColorsRadioGroup />
    </>
  );
}
