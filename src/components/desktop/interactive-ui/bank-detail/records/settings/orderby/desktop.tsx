import { Box, Radio, Text, useMantineTheme } from "@mantine/core";

export default function ToggleOrder({ bank, order, setOrder }) {
  const theme = useMantineTheme();
  return (
    <Box mt={10}>
      <Text size="xs" weight="bold" color={theme.colors[bank.color][9]}>
        Sort By
      </Text>
      <Radio.Group name="sortBy" value={order} onChange={setOrder}>
        <Radio
          size="xs"
          color={`${bank.color}`}
          value="newest"
          label={
            <Text size="xs" color={theme.colors[bank.color][9]}>
              newest
            </Text>
          }
        />
        <Radio
          size="xs"
          color={`${bank.color}`}
          value="oldest"
          label={
            <Text size="xs" color={theme.colors[bank.color][9]}>
              oldest
            </Text>
          }
        />
      </Radio.Group>
    </Box>
  );
}
