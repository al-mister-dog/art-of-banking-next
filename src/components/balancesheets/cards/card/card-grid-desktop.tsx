import { Grid } from "@mantine/core";
import React from "react";
import Card from "./card-desktop";

function CardGrid({ group, handleSetBankDetail }) {
    function halveArray(a) {
      const half = a.length / 2;
      const halfAndRemainder = Math.round(half);
      return a.length % 2 === 0
        ? [a.slice(0, half), a.slice(half, a.length)]
        : [a.slice(0, halfAndRemainder), a.slice(halfAndRemainder, a.length)];
    }
  
    const [group1, group2] = halveArray(group);
  
    return (
      <Grid gutter="xl" grow>
        <Grid.Col span={1}>
          <div style={{ height: "450px", overflow: "auto" }}>
            {group1.map((bank) => (
              <div key={bank.cardInfo.id} style={{ marginBottom: "10px" }}>
                <Card bank={bank} handleSetBankDetail={handleSetBankDetail} />
              </div>
            ))}
          </div>
        </Grid.Col>
        <Grid.Col span={1}>
          <div style={{ height: "450px", overflow: "auto" }}>
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
  
  export default React.memo(CardGrid);
  // export default CardGrid
  