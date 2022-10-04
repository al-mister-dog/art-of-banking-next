import { useAppDispatch } from "../../../../../app/hooks";
import { useState } from "react";
import { setColors } from "../../../../../features/settings/settingsSlice";
import { Menu, Modal, Text } from "@mantine/core";
import AboutColors from "../../about/about-colors";

export default function ColorsMenu({ setOpened }) {
  const dispatch = useAppDispatch();
  const [aboutOpened, setAboutOpened] = useState(false);

  function handleClickMenuItem(value: string) {
    dispatch(setColors({ key: value }));
    setOpened(false);
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Label>Balances Color Coding</Menu.Label>
      <Menu.Item onClick={() => handleClickMenuItem("static")}>
        Each Transaction
      </Menu.Item>
      <Menu.Item onClick={() => handleClickMenuItem("round")}>
        All Transactions
      </Menu.Item>
      <Menu.Item onClick={() => handleClickMenuItem("flash")}>Flash</Menu.Item>
      <Menu.Item onClick={() => handleClickMenuItem("off")}>Off</Menu.Item>

      <Menu.Divider />
      <Menu.Item onClick={() => setAboutOpened(true)}>
        <Text color="dimmed" weight="bold">
          About the Colors
        </Text>
      </Menu.Item>

      <Modal
        opened={aboutOpened}
        onClose={() => setAboutOpened(false)}
        title="Balance Colors"
      >
        <AboutColors />
      </Modal>
    </Menu>
  );
}
