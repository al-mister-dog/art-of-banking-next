import { Text, useMantineTheme } from "@mantine/core";

export default function AboutColors() {
  const theme = useMantineTheme();
  return (
    <>
      <Text>
        Any action performed by a bank produces a corresponding action from
        another bank. If a customer increases its deposit assets, the bank
        increases its deposit liabilities. An increase on both sides of the
        balancesheet is known as
        <span style={{ fontWeight: "bold" }}> expansion</span> and a decrease on
        both sides of the balancesheet is known as
        <span style={{ fontWeight: "bold" }}> contraction</span>. Any increased
        balance will turn green and any decreased balance will turn red. When a
        customer goes into their overdraft this is often seen as a decrease of
        their balance but it is in fact an increase of their liabilities and an
        increase in the bank's assets. An increased overdraft will be therefore
        shown as green instead of red.
      </Text>
      <br></br>
      <Text weight="bold">
        <span style={{ color: theme.colors.green[7] }}>Green</span> - An
        expansion of the balancesheet.
      </Text>
      <Text weight="bold">
        <span style={{ color: theme.colors.red[7] }}>Red</span> — A contraction
        of the balancesheet.
      </Text>
    </>
  );
}
