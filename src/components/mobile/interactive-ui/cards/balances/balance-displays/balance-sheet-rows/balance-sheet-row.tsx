import { Text } from "@mantine/core";

export default function BalanceSheetRow({ className, color, children }) {
  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      className={className}
      color={color}
    >
      {children}
    </Text>
  );
}
