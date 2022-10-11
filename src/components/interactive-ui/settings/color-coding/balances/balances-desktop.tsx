import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useState } from "react";
import { useRadioSettings } from "../../../../../hooks/useRadioSettings";
import {
  setColors,
  selectSettings,
} from "../../../../../features/settings/settingsSlice";
import {
  Box,
  Button,
  Modal,
  Radio,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import AboutColors from "../../about/about-colors";

export default function ColorsMenu() {
  const dispatch = useAppDispatch();
  const { colorSettings } = useAppSelector(selectSettings);
  const [aboutOpened, setAboutOpened] = useState(false);
  const colorCoding = useRadioSettings(colorSettings);
  const theme = useMantineTheme();

  function handleOnChangeRadioColors(value: string) {
    dispatch(setColors({ key: value }));
  }

  return (
    <Box>
      <Text size="sm" weight="bold" color="violet">
        Balancesheet Colors
      </Text>
      <Radio.Group
        value={colorCoding}
        orientation="vertical"
        onChange={(value) => handleOnChangeRadioColors(value)}
        name="Transactions"
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
      <Stack>
        <Button
          size="xs"
          color="violet"
          mt="md"
          variant="filled"
          onClick={() => setAboutOpened(true)}
        >
          About Credit-Notation
        </Button>
      </Stack>

      <Modal
        opened={aboutOpened}
        onClose={() => setAboutOpened(false)}
        title="Credit-Notation"
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
