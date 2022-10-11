import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  setColors,
  selectSettings,
} from "../../../features/settings/settingsSlice";
import { useState } from "react";
import { Box, Button, Modal, Radio, Text } from "@mantine/core";
import AboutColors from "./about/about-colors";
import { useRadioSettings } from "../../../hooks/useRadioSettings";
import { useMantineTheme } from "@mantine/core";

export default function ColorsMenu({ setOpened }) {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const { colorSettings } = useAppSelector(selectSettings);
  const [aboutOpened, setAboutOpened] = useState(false);
  const colorCoding = useRadioSettings(colorSettings);

  function handleOnChangeRadioColors(value: string) {
    dispatch(setColors({ key: value }));
    setOpened(false);
  }

  return (
    <Box>
      <Radio.Group
        value={colorCoding}
        orientation="vertical"
        onChange={(value) => handleOnChangeRadioColors(value)}
        name="Transactions"
        label="Balances Color Coding"
      >
        <Radio
          color="violet"
          value="static"
          label={<Text size="xs">Each Transaction</Text>}
        />
        <Radio
          color="violet"
          value="round"
          label={<Text size="xs">All Transactions</Text>}
        />
        <Radio
          color="violet"
          value="flash"
          label={<Text size="xs">Flash</Text>}
        />
        <Radio color="violet" value="off" label={<Text size="xs">Off</Text>} />
      </Radio.Group>

      <Button
        color="violet"
        mt="md"
        variant="light"
        onClick={() => setAboutOpened(true)}
      >
        About Credit-Notation
      </Button>

      <Modal
        opened={aboutOpened}
        onClose={() => setAboutOpened(false)}
        title="About Credit-Notation"
        styles={{
          modal: {
            backgroundColor: theme.colors.red[0],
          },
        }}
      >
        <AboutColors />
      </Modal>
    </Box>
  );
}
