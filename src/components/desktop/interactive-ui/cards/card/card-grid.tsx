import { Grid } from "@mantine/core";
import React from "react";
import { splitArray } from "../../../helpers";
import Card from "./card-desktop";

function CardGrid({ group, handleSetBankDetail }) {
  const [group1, group2] = splitArray(group);

  return (
    <Grid gutter="sm" grow>
      <Grid.Col span={1}>
        <div style={{ height: "26rem", overflow: "auto" }}>
          {group1.map((bank) => (
            <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
              <Card bank={bank} handleSetBankDetail={handleSetBankDetail} />
            </div>
          ))}
        </div>
      </Grid.Col>
      <Grid.Col span={1}>
        <div style={{ height: "26rem", overflow: "auto" }}>
          {group2.map((bank) => (
            <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
              <Card bank={bank} handleSetBankDetail={handleSetBankDetail} />
            </div>
          ))}
        </div>
      </Grid.Col>
    </Grid>
  );
}

export default React.memo(CardGrid); //may not be needed thanks to useCallback
