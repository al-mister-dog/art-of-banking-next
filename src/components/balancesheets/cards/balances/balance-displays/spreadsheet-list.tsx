import { useEffect, useRef } from "react";

import { Card, SimpleGrid } from "@mantine/core";

import Spreadsheet from "./spreadsheet";
import { ClassNames } from "@emotion/react";

export default function ClaveroList({ assets, liabilities }) {
  return (
    
      <SimpleGrid
        cols={2}
        spacing={0}
        style={{ overflowX: "hidden" }}
      >
        <div>
          {assets.map((record: any, index) => {
            return <Spreadsheet key={index} record={record} />;
          })}
        </div>
        <div>
          {liabilities.map((record: any, index) => {
            return <Spreadsheet key={index} record={record} />;
          })}
        </div>
      </SimpleGrid>
    
  );
}
