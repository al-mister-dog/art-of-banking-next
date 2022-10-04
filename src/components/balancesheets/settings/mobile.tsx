import { useAppSelector } from "../../../app/hooks";
import { selectActions } from "../../../features/actions/actionsSlice";
import { useState } from "react";
import { sliderSettings } from "../../../features/settings/initialState";
import { Center, createStyles, Title } from "@mantine/core";

import OverdraftSlider from "../settings/slider-overdraft";
import ReserveRequirementSlider from "../settings/slider-reserve-requirement";
import InterestRateSlider from "../settings/slider-interest-rate";
import DisplayRadioGroup from "../settings/radio-group-display/mobile";
import ColorsRadioGroup from "../settings/radio-group-colors/mobile";

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
        style={{ marginTop: "1rem", marginLeft: "4rem", marginRight: "3rem" }}
      >
        <OverdraftSlider
          disabled={slidersDisabled.overdraft}
          overdraftValue={overdraftValue}
        />
        <ReserveRequirementSlider
          disabled={slidersDisabled.reserveRequirement}
        />
        <InterestRateSlider disabled={slidersDisabled.interestRate} />
        <DisplayRadioGroup setOpened={setOpened} />
        <ColorsRadioGroup setOpened={setOpened} />
      </div>
    </>
  );
}
