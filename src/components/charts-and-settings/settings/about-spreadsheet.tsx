import { Text, useMantineTheme } from "@mantine/core";

export default function SpreadsheetAbout() {
  const theme = useMantineTheme();
  return (
    <>
      <Text>
        There is more than one type of funds transfer. Hierarchical arrangements
        between Payor and Payee multiply the ways a payment can be made. For
        example transfering gold from bank to customer is a different type of
        payment than paying back a loan via bank transfer.
      </Text>
      <Text>
        Clavero Borja introduces four new words to the vocabulary of accounting
        that describe how payments are settled.
      </Text>
      <br></br>
      <Text weight="bold">
        <span style={{ color: theme.colors.yellow[7] }}>Yellow</span> — Payment
        by assignment (Passing an asset to another balance sheet)
      </Text>
      <Text weight="bold">
        <span style={{ color: theme.colors.green[7] }}>Green</span> — Payment by
        issuance (Issuing a new liability)
      </Text>
      <Text weight="bold">
        <span style={{ color: theme.colors.red[7] }}>Red</span> — Payment by set
        off (Repaying a liability that is owed)
      </Text>
      <Text weight="bold">
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
    </>
  );
}
