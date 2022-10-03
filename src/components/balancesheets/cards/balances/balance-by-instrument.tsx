import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import BalanceEachRound from "./balance-displays/round";
import BalanceEachTurn from "./balance-displays/static";
import BalanceFlash from "./balance-displays/flash";
import BalanceOff from "./balance-displays/off";
import { Text } from "@mantine/core";
import { System } from "../../../../domain/system";

export default function BalanceByInstrument({ side, id }) {
  const { colorSettings, displaySettings } = useAppSelector(selectSettings);
  if (System.getSystem() === "centralbank" && side.instrument === "reserves") {
    return;
  }
  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="sm" weight="bold" align="left">
        {displaySettings.taccounts ? "" : `${side.instrument}`}
      </Text>
      {side.accounts.map((account, i) => {
        return (
          <div key={i}>
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
