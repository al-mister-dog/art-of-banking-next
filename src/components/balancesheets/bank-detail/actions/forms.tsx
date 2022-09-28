import TransferToCustomer from "./list/transferToCustomer";
import WithdrawFromBank from "./list/withdrawFromBank";
import DepositIntoBank from "./list/depositIntoBank";
import TakeOutLoan from "./list/takeOutLoan";
import RepayLoan from "./list/repayLoan";
import NetDues from "./list/netDues";
import PayDues from "./list/payDues";
import SettleDues from "./list/settleDues";
import { CardInfo } from "../../types";

import { useValidator } from "../../../../hooks/useValidator/useValidator";
import TransferToBank from "./list/transferToBank";

export default function ActionForms({
  action,
  bank,
}: {
  action: string | null;
  bank: CardInfo;
}) {
  const reserves = bank.balanceSheet.assets.find(
    (asset) => asset.instrument === reserves
  );
  if (action === null) {
    return <></>;
  }

  if (action === "transfer") {
    return <TransferToCustomer bank={bank} />;
  }

  if (action === "bankTransfer") {
    return <TransferToBank bank={bank} />;
  }

  if (action === "withdraw") {
    return <WithdrawFromBank bank={bank} />;
  }

  if (action === "deposit") {
    return <DepositIntoBank bank={bank} />;
  }

  if (action === "loan") {
    return <TakeOutLoan bank={bank} />;
  }

  if (action === "repayLoan") {
    return <RepayLoan bank={bank} />;
  }

  if (action === "payDues") {
    return <PayDues bank={bank} />;
  }

  if (action === "netDues") {
    return <NetDues bank={bank} />;
  }

  if (action === "settleDues") {
    return <SettleDues bank={bank} />;
  }
}
