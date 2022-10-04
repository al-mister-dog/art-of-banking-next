import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { setClaveroDisplay } from "../../../features/settings/settingsSlice";
import { Button, Menu, Modal, Text, useMantineTheme } from "@mantine/core";
import Spreadsheet from "../../displays/spreadsheet";
import SpreadsheetAbout from "./about-spreadsheet";

export default function SpreadsheetMenu({ setOpened, setHidden, children }) {
  const dispatch = useAppDispatch();
  const [spreadSheetOpened, setSpreadSheetOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);

  function handleClickMenuItem(value: string) {
    dispatch(setClaveroDisplay({ key: value }));
    setOpened(false);
  }
  function doFunc() {
    setHidden(false);
    setOpened(false);
    console.log("do FUNC");
  }

  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>{children}</Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Display Transactions</Menu.Label>
          <Menu.Item onClick={() => handleClickMenuItem("lastTwo")}>
            Each Transaction
          </Menu.Item>
          <Menu.Item onClick={() => handleClickMenuItem("all")}>
            All Transactions
          </Menu.Item>

          <Menu.Divider />
          <Menu.Item
            onClick={() => {
              setHidden(true);
              setSpreadSheetOpened(true);
            }}
          >
            Full Page
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              setHidden(true);
              setAboutOpened(true);
            }}
          >
            <Text color="dimmed" weight="bold">
              About Color-Coding
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Modal
        opened={aboutOpened}
        onClose={() => {
          doFunc();

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
              console.log("WEE");
              setSpreadSheetOpened(false);
              setHidden(false);
              setOpened(false);
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
