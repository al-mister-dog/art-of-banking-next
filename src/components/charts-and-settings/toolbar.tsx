import {
  ActionIcon,
  createStyles,
  Popover,
  useMantineTheme,
} from "@mantine/core";

import RefreshBalanceSheets from "../balancesheets/settings/refresh";
import Settings from "../balancesheets/settings/mobile";
import { DotsVertical } from "tabler-icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../config/media-query";
import { useState } from "react";
const useStyles = createStyles(() => ({
  hidden: {
    display: "none",
  },
  visible: {
    // display: "block",
  },
}));
export default function Toolbar() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [hidden, setHidden] = useState(false);
  const isMobile = useMediaQuery(mediaQuery);
  console.log(hidden)
  return isMobile ? (
    <>
      <RefreshBalanceSheets />

      <Popover
        opened={opened}
        onChange={setOpened}
        position="bottom"
        shadow="md"
      >
        <Popover.Target>
          <ActionIcon size="lg" onClick={() => setOpened(true)}>
            <DotsVertical size={40} color={`${theme.colors.violet[9]}`} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown
          className={`${hidden ? `${classes.hidden}` : `${classes.visible}`}`}
          sx={{width: "20rem"}}
        >
          <Settings setOpened={setOpened} setHidden={setHidden} />
        </Popover.Dropdown>
      </Popover>
    </>
  ) : (
    <RefreshBalanceSheets />
  );
}
