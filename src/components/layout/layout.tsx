import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { AppShell, useMantineTheme } from "@mantine/core";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import HeaderUi from "./header";
import { mediaQuery } from "../../config/media-query";

export default function Layout(props: any) {
  const [opened, setOpened] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(mediaQuery);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.red[0],
          padding: 0,
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed={isMobile}
      navbar={
        isMobile ? (
          <NavbarMobile mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        ) : (
          <NavbarDesktop opened={opened} />
        )
      }
      header={
        <HeaderUi
          opened={opened}
          setOpened={setOpened}
          isMobile={isMobile}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      }
    >
      {props.children}
    </AppShell>
  );
}
