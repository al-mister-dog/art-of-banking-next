import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectSettings,
  setOverdraft,
} from "../../features/settings/settingsSlice";
import { selectLectures } from "../../features/lectures/lecturesSlice";
import { sliderSettings } from "../../features/settings/initialState";
import {
  Card,
  Center,
  Grid,
  Title,
  Text,
  useMantineTheme,
  ActionIcon,
  Box,
  Slider,
  Accordion,
  Radio,
} from "@mantine/core";
import LineChart from "../charts/linechart";
import { Refresh } from "tabler-icons-react";
import { useState } from "react";
import RefreshBalanceSheets from "./settings/refresh";
import OverdraftSlider from "./settings/slider-overdraft";
import ReserveRequirementSlider from "./settings/slider-reserve-requirement";
import InterestRateSlider from "./settings/slider-interest-rate";
import DisplayRadioGroup from "./settings/display-radio-group";
import ColorsRadioGroup from "./settings/colors-radio-group";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectLectures);
  const theme = useMantineTheme();
  const [value, setValue] = useState(40);
  const [display, setDisplay] = useState("accounts");
  const [colorCoding, setColorCoding] = useState("flash");
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
