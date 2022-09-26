import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import BalanceTAccounts from "./t-accounts/round";
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
        {/* {side.instrument} */}
      </Text>
      {side.accounts.map((account) => {
        if (colorSettings.round) {
          return (
            <BalanceEachRound key={account.id} account={account} id={id} />
          );
        }
        if (colorSettings.static) {
          return <BalanceEachTurn key={account.id} account={account} />;
        }
        if (colorSettings.flash) {
          return <BalanceFlash key={account.id} account={account} />;
        }
        if (colorSettings.off) {
          return <BalanceOff key={account.id} account={account} />;
        }
      })}
    </div>
  );
}
