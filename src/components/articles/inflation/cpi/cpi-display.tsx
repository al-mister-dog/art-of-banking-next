import { Box, Text, Slider, Grid, useMantineTheme, Card } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../../../config/media-query";
export default function CpiDisplay({
  title,
  description,
  inflationIndex,
  inflationRate,
  setIndexPrice,
  setValuePrice,
  cpi,
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(mediaQuery);

  return (
    <>
      <Card
        style={{
          width: isMobile ? "100%" : "52%",
          margin: "auto",
          backgroundColor: theme.colors.violet[1],
        }}
      >
        <Card.Section p={5}>
          <Text
            size={isMobile ? "xs" : "md"}
            align="center"
            color="violet"
            weight="bold"
          >
            {description}
          </Text>
        </Card.Section>
        <Card.Section pb={10}>
          <Box style={{ display: "flex", justifyContent: "space-around" }}>
            <Text size={isMobile ? "xs" : "md"} color="dimmed">
              Inflation index:{" "}
              <span style={{ fontWeight: "bold" }}>%{inflationIndex}</span>
            </Text>
            <Text size={isMobile ? "xs" : "md"} color="dimmed">
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
          grow
        >
          <Grid.Col span={3}>
            <Text
              size={isMobile ? 8 : "xs"}
              weight="bold"
              color="violet"
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
              size={isMobile ? 8 : "xs"}
              weight="bold"
              color="violet"
              align="center"
            >
              Price Change
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <Text
              size={isMobile ? 8 : "xs"}
              weight="bold"
              color="violet"
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
                  <Text
                    size={isMobile ? 10 : "xs"}
                    color="dimmed"
                    weight="bold"
                  >
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
                  <Text
                    size={isMobile ? 10 : "xs"}
                    color="dimmed"
                    weight="bold"
                    align="center"
                  >
                    %{change}
                  </Text>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Grid grow>
                    <Grid.Col span={1} style={{ width: "10px" }}>
                      <Text
                        p={0}
                        size={isMobile ? 10 : "xs"}
                        color="dimmed"
                        weight="bold"
                      >
                        {parseFloat(weight.toFixed(2))}
                      </Text>
                    </Grid.Col>
                    <Grid.Col span={isMobile ? 7 : 9} style={{ width: "100%" }}>
                      <Slider
                        p={0}
                        mt={5}
                        color="violet"
                        size={isMobile ? "xs" : "sm"}
                        value={parseFloat(weight.toFixed(2))}
                        onChange={(value) => {
                          setIndexPrice(index);
                          setValuePrice(value);
                        }}
                        aria-labelledby="discrete-slider-custom"
                        min={0}
                        max={100}
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
              </Grid>
            </Box>
          );
        })}
      </Card>
    </>
  );
}
