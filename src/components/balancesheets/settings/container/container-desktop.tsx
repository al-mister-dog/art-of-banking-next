import { useAppSelector } from "../../../../app/hooks";
import { selectActions } from "../../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../../features/settings/initialState";
import {
  Card,
  Center,
  Text,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import DisplayRadioGroup from "../menu-displays/desktop";
import InterestRateSlider from "../sliders/slider-interest-rate";
import OverdraftSlider from "../sliders/slider-overdraft";
import ReserveRequirementSlider from "../sliders/slider-reserve-requirement";
import ColorsMenu from "../menu-colors/desktop";

export default function Desktop() {
  const { currentLectureId } = useAppSelector(selectActions);
  const theme = useMantineTheme();
  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <Card
      style={{
        backgroundColor: theme.colors.violet[1],
        overflow: "visible",
        height: "27.5rem",
      }}
    >
      <Card.Section
        mb="xs"
        p="xs"
        style={{ borderBottom: `1px solid ${theme.colors.violet[2]}` }}
      >
        <Center>
          <Title order={4} color="violet">
            Settings
          </Title>
        </Center>
      </Card.Section>

      <SimpleGrid cols={2}>
        <div style={{ borderRight: `1px solid ${theme.colors.violet[2]}` }}>
          <Text size="sm" weight="bold" color="violet">
            Ranges
          </Text>
          <div style={{ marginTop: "5px", paddingRight: "5px" }}>
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
          <Text size="sm" weight="bold" color="violet">
            Balancesheet Display
          </Text>
          <DisplayRadioGroup />
          <ColorsMenu />
        </div>
      </SimpleGrid>
    </Card>
  );
}
