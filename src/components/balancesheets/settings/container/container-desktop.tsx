import {
  Card,
  Center,
  Text,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useAppSelector } from "../../../../app/hooks";
import { selectActions } from "../../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../../features/settings/initialState";
import DisplayRadioGroup from "../menu-displays/desktop";
import InterestRateSlider from "../sliders/slider-interest-rate";
import OverdraftSlider from "../sliders/slider-overdraft";
import ReserveRequirementSlider from "../sliders/slider-reserve-requirement";


export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  const theme = useMantineTheme();
  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <Card
      style={{ backgroundColor: theme.colors.violet[1], overflow: "visible" }}
    >
      <Card.Section mb="xs" p="xs">
        <Center>
          <Title order={4}>Settings</Title>
        </Center>
      </Card.Section>

      <SimpleGrid cols={2}>
        <div>
          <Text size="sm" weight="bold" >Ranges</Text>
          <div style={{ marginTop: "5px" }}>
            <OverdraftSlider
              disabled={slidersDisabled.overdraft}
              overdraftValue={overdraftValue}
            />
            <ReserveRequirementSlider
              disabled={slidersDisabled.reserveRequirement}
            />
            <InterestRateSlider disabled={slidersDisabled.interestRate} />
          </div>
        </div>
        <div>
        <Text size="sm" weight="bold" >Balancesheet Display</Text>
          <DisplayRadioGroup />
        </div>
      </SimpleGrid>
    </Card>
  );
}
