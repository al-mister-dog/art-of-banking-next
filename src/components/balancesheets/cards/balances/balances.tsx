import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";

import { Text } from "@mantine/core";

export default function Balances({ side }) {
  const { colorSettings } = useAppSelector(selectSettings);
  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="xs" weight="bold" align="left">
        {side.instrument}
      </Text>
      {side.accounts.map((account) => {
        return <Balance key={account.id} account={account} />;
      })}
    </div>
  );
}
