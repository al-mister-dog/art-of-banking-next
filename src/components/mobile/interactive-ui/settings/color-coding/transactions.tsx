import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useState } from "react";
import {
  selectSettings,
  setClaveroDisplay,
} from "../../../../../features/settings/settingsSlice";
import { useRadioSettings } from "../../../../../hooks/useRadioSettings";
import {
  Box,
  Button,
  Modal,
  Radio,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import SpreadsheetAbout from "../about/about-spreadsheet";
import Spreadsheet from "../../../../displays/spreadsheet";

export default function SpreadsheetMenu({ setOpened }) {
  const dispatch = useAppDispatch();
  const { spreadsheetSettings } = useAppSelector(selectSettings);
  
  const [spreadSheetOpened, setSpreadSheetOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);

  const theme = useMantineTheme();

  const transactionType = useRadioSettings(spreadsheetSettings);

  function handleOnChangeTransaction(value: string) {
    dispatch(setClaveroDisplay({ key: value }));
    setOpened(false);
  }

  return (
    <>
      <Box>
        <Radio.Group
          value={transactionType}
          orientation="vertical"
          onChange={(value) => handleOnChangeTransaction(value)}
          name="ColorCoding"
          label="Spreadsheet Colors"
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
            mt="md"
            variant="light"
            onClick={() => {
              setSpreadSheetOpened(true);
            }}
          >
            Full Page
          </Button>
          <Button
            color="violet"
            mt="md"
            variant="light"
            onClick={() => {
              setAboutOpened(true);
            }}
          >
            About Color-Coding
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
        fullScreen
        styles={{ modal: { backgroundColor: theme.colors.red[0] } }}
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
