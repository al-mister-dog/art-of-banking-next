
import { Box, Slider, Text } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { selectSettings, setInterestRate } from "../../../../../features/settings/settingsSlice";

export default function InterestRateSlider({
  disabled,
}: {
  disabled: boolean;
}) {
  const dispatch = useAppDispatch();
  const { interestRate } = useAppSelector(selectSettings);

  function handleChange(e: { num?: number }) {
    dispatch(setInterestRate({ num: e.num }));
  }

  return (
    <Box>
      <Text size="xs" >Interest Rate</Text>
      <Slider
        color="violet"
        label={`${interestRate}%`}
        value={interestRate}
        onChange={(num) => handleChange({ num })}
        disabled={disabled}
      />
    </Box>
  );
}
