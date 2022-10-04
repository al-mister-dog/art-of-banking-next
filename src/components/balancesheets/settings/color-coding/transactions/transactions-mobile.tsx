import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import { useState } from "react";
import {
  selectSettings,
  setClaveroDisplay,
} from "../../../../../features/settings/settingsSlice";
import { Box, Button, Modal, Radio, Text } from "@mantine/core";
import Spreadsheet from "../../../../displays/spreadsheet";

import { useRadioSettings } from "../../../../../hooks/useRadioSettings";
import SpreadsheetAbout from "../../about/about-spreadsheet";

export default function SpreadsheetMenu({ setOpened }) {
  const dispatch = useAppDispatch();

  const { spreadsheetSettings } = useAppSelector(selectSettings);
  const transactionType = useRadioSettings(spreadsheetSettings);

  const [spreadSheetOpened, setSpreadSheetOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);

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
          label="Transactions Display"
        >
          <Radio
            color="violet"
            value="lastTwo"
            label={<Text size="xs">Each Transaction</Text>}
          />
          <Radio
            color="violet"
            value="all"
            label={<Text size="xs">All Transactions</Text>}
          />
        </Radio.Group>

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
      </Box>

      <Modal
        opened={aboutOpened}
        onClose={() => {
          setAboutOpened(false);
        }}
        title="Color-Coded Payment Notation"
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
