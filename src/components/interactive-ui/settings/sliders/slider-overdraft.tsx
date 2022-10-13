import { useAppSelector, useAppDispatch } from "../../../../app/hooks";
import {
  selectSettings,
  setOverdraft,
} from "../../../../features/settings/settingsSlice";
import { Box, Slider, Text } from "@mantine/core";
import { useEffect } from "react";

//NEEDS TO BE RANGE
export default function OverdraftSlider({
  disabled,
  overdraftValue,
}: {
  disabled: boolean;
  overdraftValue?: number;
}) {
  const dispatch = useAppDispatch();
  const { overdraft } = useAppSelector(selectSettings);

  function handleChange(e: { num?: number }) {
    dispatch(setOverdraft({ num: e.num }));
  }
  useEffect(() => {
    if (overdraftValue > 0) {
      dispatch(setOverdraft({ num: overdraftValue }));
    }
  }, []);
  return (
    <Box>
      <Text size="xs">Overdraft Limit</Text>
      <Slider
        color="violet"
        size="md"
        label={`$${overdraft}`}
        min={0}
        max={100}
        value={overdraft}
        onChange={(num) => handleChange({ num })}
        disabled={disabled}
      />
    </Box>
  );
}
