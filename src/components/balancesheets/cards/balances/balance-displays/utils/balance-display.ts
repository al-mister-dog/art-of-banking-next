import useSymbolSettings from "../../../../../../hooks/useSymbolSettings";

export function setAsTAccount(account: any, id: number) {
  let info = "";
  const symbol = useSymbolSettings(account.balance);
  if (account.category === "Reserves") {
    info = `${symbol}${account.balance} ${account.category}`;
  }
  if (account.subordinateId === id) {
    info = `${symbol}${account.balance} ${account.type} at ${account.thirdPartyDetail.name}`;
  }
  if (account.superiorId === id) {
    info = `${symbol}${account.balance} ${account.type} from ${account.thirdPartyDetail.name}`;
  }
  return info;
}

export function setAsSpreadSheet(account: any) {
  let info = `${
    account.thirdPartyDetail?.name ? `${account.thirdPartyDetail.name}: ` : ""
  }$${account.balance}`;
  return info;
}
