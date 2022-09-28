import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import BalanceEachRound from "./balance-displays/round";
import BalanceEachTurn from "./balance-displays/static";
import BalanceFlash from "./balance-displays/flash";
import BalanceOff from "./balance-displays/off";
import { Text } from "@mantine/core";

export default function SideUI({ side, id }) {
  const { colorSettings, displaySettings } = useAppSelector(selectSettings);

  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="xs" weight="bold" align="left">
        {displaySettings.taccounts ? "" : `${side.instrument}`}
      </Text>
      {side.accounts.map((account) => {
        return (
          <div key={account.id}>
            {colorSettings.round && (
              <BalanceEachRound key={account.id} account={account} id={id} />
            )}
            {colorSettings.static && (
              <BalanceEachTurn key={account.id} account={account} id={id} />
            )}
            {colorSettings.flash && (
              <BalanceFlash key={account.id} account={account} id={id} />
            )}
            {colorSettings.off && (
              <BalanceOff key={account.id} account={account} />
            )}
          </div>
        );
      })}
    </div>
  );
}
