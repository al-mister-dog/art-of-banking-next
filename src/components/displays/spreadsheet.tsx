import { useAppSelector } from "../../app/hooks";
import { Display } from "../../domain/analytics/display";
import { Bank } from "../../domain/structures";
import { selectBanks } from "../../features/banks/banksSlice";
import { CardInfo } from "../interactive-ui/types";
import SpreadsheetCard from "./spreadsheet-card";

export default function SpreadSheet() {
  const { banks } = useAppSelector(selectBanks);
  const colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "blue",
    clearinghouse: "blue",
  };

  function getCardInfo(bank: Bank): CardInfo {
    const cardInfo = { ...bank };
    const balanceSheet = Display.balanceSheet(cardInfo);
    const color = colors[`${bank.type}`];
    return { cardInfo, balanceSheet, color };
  }

  const banksArray: CardInfo[] = Object.keys(banks)
    .map((bank) => banks[bank])
    .map((bank) => getCardInfo(bank));
  return (
    <div style={{ display: "flex" }}>
      {banksArray.map((bank) => (
        <SpreadsheetCard key={bank.cardInfo.id} bank={bank} />
      ))}
    </div>
  );
}
