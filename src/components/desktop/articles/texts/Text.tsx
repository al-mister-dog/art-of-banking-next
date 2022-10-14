import { Text } from "@mantine/core";
import { colors } from "../../../config/colorPalette";
export default function TextComponent({ children }) {
  return (
    <Text
      size="xl"
      style={{
        padding: "30px",
        letterSpacing: "1px",
        marginBottom: "25px",
        color: colors.text
      }}
    >
      {children}
    </Text>
  );
}
