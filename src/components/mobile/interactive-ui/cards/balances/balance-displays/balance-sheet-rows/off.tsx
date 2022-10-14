import React from "react";
import {  useMantineTheme } from "@mantine/core";
import BalanceSheetRow from "./balance-sheet-row";

const Balance = ({ account, textColor }) => {
  const theme = useMantineTheme();

  return (
    <BalanceSheetRow className="" color={`${theme.colors[textColor][8]}`}>
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </BalanceSheetRow>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
