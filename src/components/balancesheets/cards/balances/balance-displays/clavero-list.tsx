import { useEffect, useRef } from "react";

import { Card, SimpleGrid } from "@mantine/core";

import Clavero from "./clavero";
import { ClassNames } from "@emotion/react";

export default function ClaveroList({ assets, liabilities }) {
  return (
    <Card.Section>
      <SimpleGrid
        cols={2}
        spacing={0}
        style={{ height: "110px", overflowX: "hidden" }}
      >
        <div>
          {assets.map((record: any, index) => {
            return <Clavero key={index} record={record} />;
          })}
        </div>
        <div>
          {liabilities.map((record: any, index) => {
            return <Clavero key={index} record={record} />;
          })}
        </div>
      </SimpleGrid>
    </Card.Section>
  );
}
