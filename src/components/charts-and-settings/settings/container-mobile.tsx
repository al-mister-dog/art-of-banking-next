import { Accordion, Card, Center, Title, useMantineTheme } from "@mantine/core";
import { useAppSelector } from "../../../app/hooks";
import { selectActions } from "../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../features/settings/initialState";
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
    // <Card style={{ backgroundColor: theme.colors.violet[1] }}>
    <Accordion>
      <Accordion.Item
        value="customization"
        style={{ backgroundColor: theme.colors.violet[1] }}
      >
        <Accordion.Control>
          <Title order={4}>Settings</Title>
        </Accordion.Control>
        <Accordion.Panel>
          <OverdraftSlider
            disabled={slidersDisabled.overdraft}
            overdraftValue={overdraftValue}
          />
          <ReserveRequirementSlider
            disabled={slidersDisabled.reserveRequirement}
          />
          <InterestRateSlider disabled={slidersDisabled.interestRate} />
          <DisplayRadioGroup />
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
    // </Card>
  );
}
