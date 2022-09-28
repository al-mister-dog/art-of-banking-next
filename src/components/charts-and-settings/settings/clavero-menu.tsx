import { useAppDispatch } from "../../../app/hooks";
import { useState } from "react";
import { setClaveroDisplay } from "../../../features/settings/settingsSlice";
import { Button, Menu, Modal, Text, useMantineTheme } from "@mantine/core";
import ClaveroSpreadSheet from "../../displays/clavero";
import Link from "next/link";

export default function ClaveroMenu({ children }) {
  const dispatch = useAppDispatch();
  const theme = useMantineTheme();
  const [spreadSheetOpened, setSpreadSheetOpened] = useState(false);
  const [aboutOpened, setAboutOpened] = useState(false);

  function handleClickMenuItem(value: string) {
    dispatch(setClaveroDisplay({ key: value }));
  }
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>{children}</Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Display Transactions</Menu.Label>
          <Menu.Item onClick={() => handleClickMenuItem("latest")}>
            Latest
          </Menu.Item>
          <Menu.Item onClick={() => handleClickMenuItem("lastTwo")}>
            Last Two
          </Menu.Item>
          <Menu.Item onClick={() => handleClickMenuItem("all")}>All</Menu.Item>
          <Menu.Item onClick={() => setSpreadSheetOpened(true)}>
            As Spread Sheet
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={() => setAboutOpened(true)}>About</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={spreadSheetOpened}
        onClose={() => setSpreadSheetOpened(false)}
        withCloseButton={false}
        fullScreen
      >
        <div style={{ height: "60px" }}>
          <Button
            style={{ position: "fixed", margin: "5px" }}
            onClick={() => setSpreadSheetOpened(false)}
          >
            Close
          </Button>
        </div>
        <ClaveroSpreadSheet />
      </Modal>
      <Modal
        opened={aboutOpened}
        onClose={() => setAboutOpened(false)}
        title="Color-Coded Payment Notation"
      >
        <Text>
          There is more than one type of funds transfer. Hierarchical
          arrangements between Payor and Payee multiply the ways a payment can
          be made. For example transfering gold from bank to customer is a
          different type of payment than paying back a loan via bank transfer.
        </Text>
        <Text>
          Clavero Borja introduces four new words to the vocabulary of
          accounting that describe how payments are settled.
        </Text>
        <br></br>
        <Text>
          <span style={{ color: theme.colors.yellow[7] }}>Yellow</span> —
          Payment by assignment (Passing an asset to another balance sheet)
        </Text>
        <Text>
          <span style={{ color: theme.colors.green[7] }}>Green</span> — Payment
          by issuance (Issuing a new liability)
        </Text>
        <Text>
          <span style={{ color: theme.colors.red[7] }}>Red</span> — Payment by
          set off (Repaying a liability that is owed)
        </Text>
        <Text>
          <span style={{ color: theme.colors.blue[7] }}>Blue</span> — Payment by
          novation (Receiving a liability from another balance sheet)
        </Text>
        <br></br>

        <Text color={theme.colors.violet[7]}>
          <a
            target="_blank"
            href="https://www.youtube.com/watch?v=pMC4joNiiPo&t=991s"
            rel="noopener noreferrer"
          >
            For more information see this video
          </a>
        </Text>
      </Modal>
    </>
  );
}

/**
- Yellow — Payment by assignment (Passing an asset to another balance sheet)
- Green — Payment by issuance (Issuing a new liability)
- Red — Payment by set off (Repaying a liability that is owed)
- Blue — Payment by novation (Receiving a liability from another balance sheet)
 */
