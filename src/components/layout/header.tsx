import Link from "next/link";
import { Burger, Header, MediaQuery, Text, useMantineTheme } from "@mantine/core";

export default function HeaderUi({
  opened,
  setOpened,
  isMobile,
  mobileOpen,
  setMobileOpen,
}) {
  const theme = useMantineTheme();
  return (
    <Header
      height={50}
      p="md"
      style={{ backgroundColor: `${theme.colors.violet[9]}` }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          color: "white",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isMobile ? mobileOpen : opened}
            onClick={() =>
              isMobile ? setMobileOpen((o) => !o) : setOpened((o) => !o)
            }
            size="sm"
            color="white"
            mr="xl"
          />
        </MediaQuery>

        <Text weight="bold">
          <Link href="/">Art of Banking</Link>
        </Text>
      </div>
    </Header>
  );
}
