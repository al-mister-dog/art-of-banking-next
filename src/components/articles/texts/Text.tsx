import { Text } from "@mantine/core";
export default function TextComponent({ children }) {
  return (
    <Text
      size="xl"
      sx={{
        padding: "30px",
        letterSpacing: "1px",
        marginBottom: "25px",
      }}
    >
      {children}
    </Text>
  );
}
