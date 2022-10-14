import { useState } from "react";
import { ActionIcon, Drawer, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../../config/media-query";
import Settings from "./container/container-mobile";
import RefreshBalanceSheets from "./refresh-button";
import { DotsVertical } from "tabler-icons-react";

export default function Toolbar() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(mediaQuery);

  return isMobile ? (
    <>
      <RefreshBalanceSheets />
      <ActionIcon size="lg" onClick={() => setOpened(true)}>
        <DotsVertical size={40} color={`${theme.colors.violet[9]}`} />
      </ActionIcon>
      <Drawer position="right" opened={opened} onClose={() => setOpened(false)}>
        <Settings setOpened={setOpened} />
      </Drawer>
    </>
  ) : (
    <RefreshBalanceSheets />
  );
}
