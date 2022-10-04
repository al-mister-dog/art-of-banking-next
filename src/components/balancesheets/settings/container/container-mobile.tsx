import { useAppSelector } from "../../../../app/hooks";
import { selectActions } from "../../../../features/actions/actionsSlice";
import { sliderSettings } from "../../../../features/settings/initialState";
import { Center, Title } from "@mantine/core";

import OverdraftSlider from "../sliders/slider-overdraft";
import ReserveRequirementSlider from "../sliders/slider-reserve-requirement";
import InterestRateSlider from "../sliders/slider-interest-rate";
import DisplayRadioGroup from "../menu-displays/mobile";
import ColorsRadioGroup from "../menu-colors/mobile";

export default function SettingsMobile({ setOpened }) {
  const { currentLectureId } = useAppSelector(selectActions);

  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <>
      <Center>
        <Title order={4}>Settings</Title>
      </Center>
      <div
        style={{
          width: "70%",
          margin: "auto",
          marginTop: "1rem",
        }}
      >
        <OverdraftSlider
          disabled={slidersDisabled.overdraft}
          overdraftValue={overdraftValue}
        />
        <ReserveRequirementSlider
          disabled={slidersDisabled.reserveRequirement}
        />
        <InterestRateSlider disabled={slidersDisabled.interestRate} />
        <DisplayRadioGroup />
        <ColorsRadioGroup setOpened={setOpened} />
      </div>
    </>
  );
}
