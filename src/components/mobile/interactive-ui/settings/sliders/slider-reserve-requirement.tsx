import { Box, Slider, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import {
  selectSettings,
  setReserveRequirement,
} from "../../../../../features/settings/settingsSlice";

export default function ReserveRequirementSlider({
  disabled,
}: {
  disabled: boolean;
}) {
  const dispatch = useAppDispatch();
  const { reserveRequirement } = useAppSelector(selectSettings);

  function handleChange(e: { num?: number }) {
    dispatch(setReserveRequirement({ num: e.num }));
  }
  return (
    <Box>
      <Text size="xs">Reserve Requirement</Text>
      <Slider
        color="violet"
        size="md"
        label={`${reserveRequirement}%`}
        value={reserveRequirement}
        onChange={(num) => handleChange({ num })}
        disabled={disabled}
      />
    </Box>
  );
}
