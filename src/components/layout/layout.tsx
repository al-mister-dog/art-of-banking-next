import { useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { AppShell, useMantineTheme } from "@mantine/core";
import NavbarDesktop from "./navbar-desktop";
import NavbarMobile from "./navbar-mobile";
import HeaderUi from "./header";


export default function Layout(props: any) {
  const [opened, setOpened] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery();

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
        !isMobile ? (
          <NavbarDesktop opened={opened} />
        ) : (
          <NavbarMobile mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
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