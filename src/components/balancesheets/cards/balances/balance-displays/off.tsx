import React from "react";
import { Text, useMantineTheme } from "@mantine/core";

const Balance = ({ account, textColor }) => {
  const theme = useMantineTheme();

  return (
    <Text
      size="xs"
      weight="bold"
      align="left"
      color={`${theme.colors[textColor][8]}`}
    >
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
};

const MemoizedBalance = React.memo(Balance);
export default MemoizedBalance;
