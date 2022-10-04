import { SimpleGrid } from "@mantine/core";
import Spreadsheet from "./spreadsheet";


export default function SpreadsheetList({ assets, liabilities }) {
  return (
    <SimpleGrid
      cols={2}
      spacing={0}
      style={{ height: "10rem", overflowX: "hidden" }}
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
