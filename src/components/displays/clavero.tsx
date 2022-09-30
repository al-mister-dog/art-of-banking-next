import { useAppSelector } from "../../app/hooks";
import { Display } from "../../domain/display";
import { Bank } from "../../domain/structures";
import { selectBanks } from "../../features/banks/banksSlice";
import { CardInfo } from "../balancesheets/types";
import ClaveroCard from "./clavero-card";

export default function ClaveroSpreadSheet() {
  const { banks } = useAppSelector(selectBanks);
  const colors = {
    customer: "grape",
    bank: "violet",
    centralbank: "indigo",
    clearinghouse: "pink",
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
        <SpreadsheetCard bank={bank} />
      ))}
    </div>
  );
}
