import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useState } from "react";
import { useRadioSettings } from "../../../../../hooks/useRadioSettings";
import {
  selectSettings,
  setClaveroDisplay,
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
import Spreadsheet from "../../../../displays/spreadsheet";
import SpreadsheetAbout from "../../about/about-spreadsheet";

export default function SpreadsheetMenu() {
  const dispatch = useAppDispatch();
  const { spreadsheetSettings } = useAppSelector(selectSettings);

  const [spreadSheetOpened, setSpreadSheetOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);

  const theme = useMantineTheme();

  const transactionType = useRadioSettings(spreadsheetSettings);

  function handleOnChangeTransaction(value: string) {
    dispatch(setClaveroDisplay({ key: value }));
  }

  return (
    <>
      <Box>
        <Text size="sm" weight="bold" color="violet">
          Spreadsheet Colors
        </Text>
        <Radio.Group
          value={transactionType}
          orientation="vertical"
          onChange={(value) => handleOnChangeTransaction(value)}
          name="ColorCoding"
        >
          <Radio
            color="violet"
            value="each"
            label={<Text size="xs">Each Transaction</Text>}
          />
          <Radio
            color="violet"
            value="all"
            label={<Text size="xs">All Transactions</Text>}
          />
        </Radio.Group>
        <Stack>
          <Button
            color="violet"
            size="xs"
            mt="md"
            variant="filled"
            onClick={() => {
              setSpreadSheetOpened(true);
            }}
          >
            Full Page
          </Button>
          <Button
            color="violet"
            size="xs"
            mt="md"
            variant="filled"
            onClick={() => {
              setAboutOpened(true);
            }}
          >
            About Payment-Notation
          </Button>
        </Stack>
      </Box>

      <Modal
        opened={aboutOpened}
        onClose={() => {
          setAboutOpened(false);
        }}
        title="Color-Coded Payment Notation"
        styles={{ modal: { backgroundColor: theme.colors.red[0] } }}
      >
        <SpreadsheetAbout />
      </Modal>
      <Modal
        opened={spreadSheetOpened}
        onClose={() => {
          setSpreadSheetOpened(false);
        }}
        withCloseButton={false}
        styles={{
          modal: {
            backgroundColor: theme.colors.red[0],
          },
        }}
        fullScreen
      >
        <div style={{ height: "60px" }}>
          <Button
            color="violet"
            style={{ position: "fixed", margin: "5px" }}
            onClick={() => {
              setSpreadSheetOpened(false);
            }}
          >
            Close
          </Button>
        </div>
        <Spreadsheet />
      </Modal>
    </>
  );
}
