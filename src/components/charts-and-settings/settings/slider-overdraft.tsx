import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import {
  selectSettings,
  setOverdraft,
} from "../../../features/settings/settingsSlice";
import { selectLectures } from "../../../features/lectures/lecturesSlice";
import { Box, Slider, Text } from "@mantine/core";
import { Totals } from "../../../domain/displays/totals";

//NEEDS TO BE RANGE
export default function OverdraftSlider({
  disabled,
}: {
  disabled: boolean;
}) {
  const dispatch = useAppDispatch();
  const { overdraft } = useAppSelector(selectSettings);
  

  function handleChange(e: { num?: number }) {
    dispatch(setOverdraft({ num: e.num }));
  }

  return (
    <Box>
      <Text>Overdraft Limit</Text>
      <Slider
        color="violet"
        label={`$${overdraft}`}
        min={0}
        max={Totals.getTotalReserves()}
        value={overdraft}
        onChange={(num) => handleChange({ num })}
        disabled={disabled}
      />
    </Box>
  );
}
