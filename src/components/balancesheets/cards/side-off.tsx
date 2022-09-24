import { createStyles, Text } from "@mantine/core";

const useStyles = createStyles(() => ({
  text: {
    color: "black",
    padding: "0px 3px",
  },
}));

export default function SideUI({ side }) {
  return (
    <div style={{ marginBottom: "1.5px" }}>
      <Text size="xs" weight="bold" align="left">
        {side.instrument}
      </Text>
      {side.accounts.map((account) => {
        return <Balance key={account.id} account={account} />;
      })}
    </div>
  );
}

const Balance = ({ account }) => {
  const { classes } = useStyles();

  return (
    <Text size="xs" weight="bold" align="left" className={classes.text}>
      {account.thirdPartyDetail?.name
        ? `${account.thirdPartyDetail.name}: `
        : ""}
      ${account.balance}
    </Text>
  );
};
