import {
  Card,
  Center,
  Grid,
  Title,
  Text,
  useMantineTheme,
  ActionIcon,
  Box,
  Slider,
  Accordion,
  Radio,
} from "@mantine/core";
import { Refresh } from "tabler-icons-react";
import { useState } from "react";

export default function Desktop() {
  const theme = useMantineTheme();
  const [value, setValue] = useState(40);
  const [display, setDisplay] = useState("accounts");
  const [colorCoding, setColorCoding] = useState("flash");

  return (
    <Card style={{ backgroundColor: theme.colors.violet[1] }}>
      <Center>
        <Title order={4}>Settings</Title>
      </Center>
      <Box style={{ display: "flex" }}>
        <ActionIcon>
          <Refresh color={`${theme.colors.violet[9]}`} />
        </ActionIcon>
        <Text>Refresh</Text>
      </Box>
      <Box>
        <Text>Overdraft Limit</Text>
        <Slider color="violet" value={value} onChange={setValue} />
      </Box>
      <Box>
        <Text>Reserve Requirement</Text>
        <Slider color="violet" value={value} onChange={setValue} />
      </Box>
      <Box>
        <Text>Interest Rate</Text>
        <Slider color="violet" value={value} onChange={setValue} />
      </Box>

      <Box mt="lg">
        <Radio.Group
          value={display}
          onChange={setDisplay}
          name="Display"
          label="Balance Sheet Display"
        >
          <Radio color="violet" value="balances" label="Balances" />
          <Radio color="violet" value="taccounts" label="T-Accounts" />
          <Radio color="violet" value="clavero" label="Clavero" />
        </Radio.Group>
      </Box>
      <Box mt="lg">
        <Radio.Group
          value={colorCoding}
          onChange={setColorCoding}
          name="ColorCoding"
          label="Color Coding"
        >
          <Radio color="violet" value="flash" label="Flash" />
          <Radio color="violet" value="static" label="Static" />
          <Radio color="violet" value="off" label="Off" />
        </Radio.Group>
      </Box>
    </Card>
  );
}
