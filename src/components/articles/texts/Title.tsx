import { Title } from "@mantine/core";
import { colors } from "../../../config/colorPalette";

export default function TitleComponent({ children }) {
  return (
    <Title order={1} style={{ color: colors.text }}>
      {children}
    </Title>
  );
}
