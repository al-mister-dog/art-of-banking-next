import { Box, Radio, Text, useMantineTheme } from "@mantine/core";

export default function ToggleOrder({ bank, order, setOrder }) {
  const theme = useMantineTheme();
  return (
    <Box mt={10}>
      <Text size="sm" weight="bold" color={theme.colors[bank.color][9]}>
        Sort By
      </Text>
      <Radio.Group value={order} onChange={setOrder} name="sortBy">
        <Radio
          color={`${bank.color}`}
          value="newest"
          label={
            <Text size="xs" color={theme.colors[bank.color][9]}>
              newest
            </Text>
          }
        />
        <Radio
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
