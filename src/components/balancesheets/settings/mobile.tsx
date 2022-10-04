import { useAppSelector } from "../../../app/hooks";
import { selectActions } from "../../../features/actions/actionsSlice";
import { useState } from "react";
import { sliderSettings } from "../../../features/settings/initialState";
import { Center, createStyles, Title } from "@mantine/core";

import OverdraftSlider from "../settings/slider-overdraft";
import ReserveRequirementSlider from "../settings/slider-reserve-requirement";
import InterestRateSlider from "../settings/slider-interest-rate";
import DisplayRadioGroup from "../settings/radio-group-display/mobile";
import ColorsRadioGroup from "../settings/radio-group-colors";


export default function SettingsMobile({ setOpened, setHidden }) {
  const { currentLectureId } = useAppSelector(selectActions);


  const slidersDisabled = sliderSettings[currentLectureId].sliderSettings;
  const overdraftValue =
    sliderSettings[currentLectureId].sliderFixtures?.overdraft || 0;

  return (
    <div>
      <Center>
        <Title order={4}>Settings</Title>
      </Center>
      <OverdraftSlider
        disabled={slidersDisabled.overdraft}
        overdraftValue={overdraftValue}
      />
      <ReserveRequirementSlider disabled={slidersDisabled.reserveRequirement} />
      <InterestRateSlider disabled={slidersDisabled.interestRate} />
      <DisplayRadioGroup setOpened={setOpened} setHidden={setHidden} />
      <ColorsRadioGroup />
    </div>
  );
}
