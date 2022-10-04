import { ActionIcon, Popover, useMantineTheme } from "@mantine/core";

import RefreshBalanceSheets from "../balancesheets/settings/refresh";
import Settings from "../balancesheets/settings/mobile";
import { DotsVertical } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../config/media-query";


export default function Toolbar() {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(mediaQuery);
  return isMobile ? (
    <>
      <RefreshBalanceSheets />
      <Popover trapFocus position="bottom" shadow="md">
        <Popover.Target>
          <ActionIcon size="lg">
            <DotsVertical size={40} color={`${theme.colors.violet[9]}`} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Settings />
        </Popover.Dropdown>
      </Popover>
    </>
  ) : (
    <RefreshBalanceSheets />
  );
}
