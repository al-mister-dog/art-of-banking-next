import {
  Box,
  Card,
  Center,
  Text,
  SimpleGrid,
  Title,
  useMantineTheme,
} from "@mantine/core";
import DisplayRadioGroup from "./menu-displays";
import OverdraftSlider from "./sliders/slider-overdraft";
import ReserveRequirementSlider from "./sliders/slider-reserve-requirement";
import ColorsMenu from "./menu-colors";
import { useAppSelector } from "../../../../app/hooks";
import { selectActions } from "../../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../../features/settings/initialState";

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
        height: "24.5rem",
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
      <Box>
        <SimpleGrid style={{ height: "220px" }} cols={2}>
          <Box>
            <Text size="sm" weight="bold" color="violet">
              Balancesheet Display
            </Text>
            <DisplayRadioGroup />
          </Box>

          <ColorsMenu />
        </SimpleGrid>
      </Box>

      <Box>
        <SimpleGrid cols={2}>
          <Box>
            <Text size="sm" weight="bold" color="violet">
              Ranges
            </Text>
            <Box style={{ marginTop: "5px", paddingRight: "5px" }}>
              <OverdraftSlider
                disabled={slidersDisabled.overdraft}
                overdraftValue={overdraftValue}
              />
              <ReserveRequirementSlider
                disabled={slidersDisabled.reserveRequirement}
              />
            </Box>
          </Box>
          <Box>
            <Text size="sm" weight="bold" color="violet"></Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Card>
  );
}
