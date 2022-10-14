import {
  Box,
  Text,
  Slider,
  Grid,
  useMantineTheme,
  Card,
  TextInput,
  Button,
  Stack,
} from "@mantine/core";
import { Percentage } from "tabler-icons-react";

interface Props {
  description: string;
  inflationIndex: number;
  inflationRate: number;
  cpi: any[];
  priceSelected: boolean;
  weightSelected: boolean;
  setIndexPrice?: (v: any) => void;
  setValuePrice?: (v: any) => void;
  setIndexWeight?: (v: any) => void;
  setValueWeight?: (v: any) => void;
  setNewCpi?: (v: any) => void;
  width: string;
}
export default function CpiDisplay({
  description,
  inflationIndex,
  inflationRate,
  cpi,
  priceSelected,
  weightSelected,
  setIndexPrice,
  setValuePrice,
  setIndexWeight,
  setValueWeight,
  setNewCpi,
  width,
}: Props) {
  const theme = useMantineTheme();
  const monotone = "#312A45";
  return (
    <>
      <Card
        style={{
          width: width,
          margin: "auto",
          backgroundColor: theme.colors.violet[1],
        }}
      >
        <Card.Section>
          <Text
            pl={10}
            pt={10}
            size={"md"}
            weight="bold"
            align={"left"}
            style={{ color: monotone }}
          >
            {description}
          </Text>
        </Card.Section>
        <Card.Section pb={10}>
          <Box p={10}>
            <Text size={"md"} style={{ color: monotone }}>
              Inflation index:{" "}
              <span style={{ fontWeight: "bold" }}>%{inflationIndex}</span>
            </Text>
            <Text size={"md"} style={{ color: monotone }}>
              Inflation rate:{" "}
              <span style={{ fontWeight: "bold" }}>%{inflationRate}</span>
            </Text>
          </Box>
        </Card.Section>

        <Grid
          style={{
            borderTop: `1px solid ${theme.colors.violet[2]}`,
            borderBottom: `1px solid ${theme.colors.violet[2]}`,
          }}
          mb={5}
          grow
        >
          <Grid.Col span={3}>
            <Text
              size={"xs"}
              weight="bold"
              style={{ color: monotone }}
              align="center"
            >
              Category
            </Text>
          </Grid.Col>
          <Grid.Col
            span={1}
            style={{
              borderLeft: `1px solid ${theme.colors.violet[2]}`,
              borderRight: `1px solid ${theme.colors.violet[2]}`,
            }}
          >
            <Text
              size={"xs"}
              weight="bold"
              style={{ color: monotone }}
              align="center"
            >
              Price Change
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text
              size={"xs"}
              weight="bold"
              style={{ color: monotone }}
              align="center"
            >
              Weight (% of 100)
            </Text>
          </Grid.Col>
        </Grid>
        {cpi.map((object, index) => {
          const { category, weight, change } = object;
          return (
            <Box key={index}>
              <Grid grow>
                <Grid.Col span={3}>
                  <Text size={"xs"} style={{ color: "#927ECE" }} weight="bold">
                    {category}
                  </Text>
                </Grid.Col>
                <Grid.Col
                  span={1}
                  style={{
                    borderLeft: `1px solid ${theme.colors.violet[2]}`,
                    borderRight: `1px solid ${theme.colors.violet[2]}`,
                  }}
                >
                  {priceSelected ? (
                    <TextInput
                      size="xs"
                      type="number"
                      icon={<Percentage size={18} />}
                      placeholder={`%${parseFloat(change.toFixed(2))}`}
                      defaultValue={change}
                      onChange={(value) => {
                        let parsedValue = parseFloat(value.target.value);
                        setIndexPrice(index);
                        isNaN(parsedValue)
                          ? setValuePrice(0)
                          : setValuePrice(parsedValue);
                      }}
                    />
                  ) : (
                    <Text
                      size={"xs"}
                      style={{ color: "#927ECE" }}
                      weight="bold"
                      align="center"
                    >
                      %{change}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={4}>
                  <Grid grow>
                    <Grid.Col span={1} style={{ width: "10px" }}>
                      <Text
                        p={0}
                        size={"xs"}
                        style={{ color: "#927ECE" }}
                        weight="bold"
                      >
                        {parseFloat(weight.toFixed(2))}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={9} style={{ width: "100%" }}>
                      <Slider
                        p={0}
                        mt={5}
                        color="violet"
                        size={"sm"}
                        value={parseFloat(weight.toFixed(2))}
                        onChange={(value) => {
                          setIndexWeight(index);
                          setValueWeight(value);
                        }}
                        aria-labelledby="discrete-slider-custom"
                        min={0}
                        max={100}
                        disabled={!weightSelected}
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Box>
          );
        })}
        {setNewCpi && (
          <Stack mt={10}>
            <Button color="violet" onClick={() => setNewCpi(cpi)}>
              Submit New CPI
            </Button>
          </Stack>
        )}
      </Card>
    </>
  );
}
