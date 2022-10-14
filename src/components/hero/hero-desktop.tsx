import { SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import example1 from "../../../public/aob_example2_cropped.png";
import example2 from "../../../public/aob_example3.png";
import Divide from "./divide";
import LazyShow from "./transitions/lazy-show";
import Example from "./example";

export default function HeroDesktop() {
  const theme = useMantineTheme();
  const backgroundViolet = theme.colors.violet[0];
  const backgroundRed = theme.colors.red[0];

  return (
    <>
      <SimpleGrid cols={2} spacing={0}>
        <div
          style={{
            background: `linear-gradient(to left bottom, ${backgroundRed} 50%, ${backgroundViolet} 50%)`,
            height: "50vh",
          }}
        ></div>
        <div
          style={{
            background: backgroundRed,
            height: "50vh",
            position: "relative",
          }}
        >
          <Title
            style={{
              color: "#312A45",
              letterSpacing: "3px",
              position: "absolute",
              bottom: 0,
              left: 0,
              paddingRight: "50px",
            }}
            size={50}
            align="right"
            className="hero-headline"
          >
            Art of Banking
          </Title>
        </div>
      </SimpleGrid>
      <SimpleGrid cols={2} spacing={0}>
        <div
          style={{
            background: backgroundViolet,
            height: "50vh",
            position: "relative",
          }}
        ></div>
        <div
          style={{
            background: `linear-gradient(to left bottom, ${backgroundRed} 50%, ${backgroundViolet} 50%)`,
            height: "50vh",
            paddingRight: "50px",
          }}
        >
          <Text
            className="hero-text-1"
            size="lg"
            weight="bold"
            style={{ color: "#312A45" }}
            align="right"
          >
            The world economy is made from the fabric of global
          </Text>
          <Text
            className="hero-text-2"
            size="lg"
            style={{ color: "#312A45" }}
            align="right"
          >
            <span style={{ fontWeight: "bold" }}>finance.</span> The fabric of
            global finance is an
          </Text>
          <Text
            className="hero-text-3"
            size="lg"
            style={{ color: "#312A45" }}
            align="right"
          >
            interlocking matrix of corporate
          </Text>
          <Text
            className="hero-text-4"
            size="lg"
            style={{ color: "#312A45" }}
            align="right"
          >
            balance sheets.
          </Text>
        </div>
      </SimpleGrid>
      <div
        style={{
          height: "50vh",
          backgroundColor: backgroundViolet,
        }}
      >
        <div
          style={{
            position: "relative",
            top: "50%",
            // -ms-transform: translateY(-50%);
            transform: "translateY(-50%)",
          }}
        >
          <LazyShow>
            <Title
              style={{
                color: "#312A45",
                letterSpacing: "3px",
              }}
              size={50}
              align="center"
            >
              Always and Everywhere, Money is Hierarchical.
            </Title>
          </LazyShow>
        </div>
      </div>
      <div style={{ background: backgroundRed, height: "130vh" }}>
        <Divide
          direction="right bottom"
          colorOne={backgroundViolet}
          colorTwo={backgroundRed}
        >
          <Example
            title="Bla bla bla"
            body="poasdpopasd"
            image={example2}
            direction="right"
          />
          <div style={{ height: "100px" }} />
          <Example
            title="Bla bla bla"
            body="poasdpopasd"
            image={example1}
            direction="left"
          />
        </Divide>
      </div>
      <div
        style={{
          height: "100vh",
          backgroundColor: backgroundRed,
        }}
      ></div>
    </>
  );
}
