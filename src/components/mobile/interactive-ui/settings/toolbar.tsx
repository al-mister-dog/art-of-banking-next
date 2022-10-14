import { useMantineTheme, ActionIcon, Drawer } from "@mantine/core";
import { useState } from "react";
import { DotsVertical } from "tabler-icons-react";
import RefreshBalanceSheets from "./refresh-button";
import Settings from "./container";

export default function Toolbar() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  return (
    <>
      <RefreshBalanceSheets />
      <ActionIcon size="lg" onClick={() => setOpened(true)}>
        <DotsVertical size={40} color={`${theme.colors.violet[9]}`} />
      </ActionIcon>
      <Drawer position="right" opened={opened} onClose={() => setOpened(false)}>
        <Settings setOpened={setOpened} />
      </Drawer>
    </>
  );
}
