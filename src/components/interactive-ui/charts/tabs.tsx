import { useState } from "react";
import { Tabs, useMantineTheme } from "@mantine/core";
import LineChart from "./linechart-private-credit";
import VerticalBarChart from "./verticalbarcharts";
import MultiAxisLineChart from "./multiaxislinechart";

const tabs = {
  one: false,
  two: false,
  three: false,
};
export default function TabsUI() {
  const [tabColors, setTabColors] = useState({
    ...tabs,
    one: true,
  });
  const theme = useMantineTheme();

  return (
    <Tabs variant="outline" defaultValue="credit" keepMounted={false}>
      <Tabs.List>
        <Tabs.Tab
          style={{
            fontSize: "1.2rem",
            fontFamily: `"Poppins"`,
            fontWeight: "bold",
            background: `${tabColors.one ? "white" : theme.colors.violet[0]}`,
          }}
          value="credit"
          onClick={() => setTabColors({ ...tabs, one: true })}
        >
          credit
        </Tabs.Tab>
        <Tabs.Tab
          style={{
            fontSize: "1.2rem",
            fontFamily: `"Poppins"`,
            fontWeight: "bold",
            background: `${tabColors.two ? "white" : theme.colors.violet[0]}`,
          }}
          value="bank"
          onClick={() => setTabColors({ ...tabs, two: true })}
        >
          bank
        </Tabs.Tab>
        <Tabs.Tab
          style={{
            fontSize: "1.2rem",
            fontFamily: `"Poppins"`,
            fontWeight: "bold",
            background: `${tabColors.three ? "white" : theme.colors.violet[0]}`,
          }}
          value="monthly"
          onClick={() => setTabColors({ ...tabs, three: true })}
        >
          monthly
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel
        style={{
          border: "1px solid #dee2e6",
          borderTop: 0,
          backgroundColor: "white",
        }}
        value="credit"
        pt="xs"
      >
        <LineChart />
      </Tabs.Panel>

      <Tabs.Panel
        style={{
          border: "1px solid #dee2e6",
          borderTop: 0,
          backgroundColor: "white",
        }}
        value="bank"
        pt="xs"
      >
        <VerticalBarChart />
      </Tabs.Panel>

      <Tabs.Panel
        style={{
          border: "1px solid #dee2e6",
          borderTop: 0,
          backgroundColor: "white",
        }}
        value="monthly"
        pt="xs"
      >
        <MultiAxisLineChart />
      </Tabs.Panel>
    </Tabs>
  );
}
