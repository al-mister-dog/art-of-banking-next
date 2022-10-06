import { useAppSelector } from "../../../../app/hooks";
import { selectSettings } from "../../../../features/settings/settingsSlice";
import BalanceEachRound from "./balance-displays/round";
import BalanceEachTurn from "./balance-displays/static";
import BalanceFlash from "./balance-displays/flash";
import BalanceOff from "./balance-displays/off";
import { Text, useMantineTheme } from "@mantine/core";
import { System } from "../../../../domain/system";
import { bankData } from "../../../../domain/structures";

export default function BalanceByInstrument({ side, id, textColor, bank }) {
  const { colorSettings, displaySettings } = useAppSelector(selectSettings);
  const theme = useMantineTheme();
  if (System.getSystem() === "centralbank" && side.instrument === "Reserves" && bank.cardInfo.type !== "customer") {
    return;
  }

  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text
        size="sm"
        weight="bold"
        align="left"
        color={theme.colors[textColor][9]}
      >
        {displaySettings.taccounts ? "" : `${side.instrument}`}
      </Text>
      {side.accounts.map((account, i) => {
        return (
          <div key={i}>
            {colorSettings.round && (
              <BalanceEachRound
                key={account.id}
                account={account}
                id={id}
                textColor={textColor}
              />
            )}
            {colorSettings.static && (
              <BalanceEachTurn
                key={account.id}
                account={account}
                id={id}
                textColor={textColor}
              />
            )}
            {colorSettings.flash && (
              <BalanceFlash
                key={account.id}
                account={account}
                id={id}
                textColor={textColor}
              />
            )}
            {colorSettings.off && (
              <BalanceOff
                key={account.id}
                account={account}
                textColor={textColor}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
