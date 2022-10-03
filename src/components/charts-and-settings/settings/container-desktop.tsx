import { Card, Center, Paper, Title, useMantineTheme } from "@mantine/core";
import { useAppSelector } from "../../../app/hooks";
import { selectActions } from "../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../features/settings/initialState";
import RefreshBalanceSheets from "./refresh";
import ColorsRadioGroup from "./radio-group-colors";
import DisplayRadioGroup from "./radio-group-display";
import InterestRateSlider from "./slider-interest-rate";
import OverdraftSlider from "./slider-overdraft";
import ReserveRequirementSlider from "./slider-reserve-requirement";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  const theme = useMantineTheme();
  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <Card style={{ backgroundColor: theme.colors.violet[1], overflow: "visible" }}>
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
    </Card>
  );
}
