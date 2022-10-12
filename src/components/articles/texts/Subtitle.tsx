import { Title } from "@mantine/core";
import { colors } from "../../../config/colorPalette";

export default function SubTitle({ children }) {
  return (
    <Title order={2} style={{ color: colors.text }}>
      {children}
    </Title>
  );
}
