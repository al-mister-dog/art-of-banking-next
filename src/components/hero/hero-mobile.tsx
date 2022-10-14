import { SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import example1 from "../../../public/aob_example2_cropped.png";
import example2 from "../../../public/aob_example3.png";
import Divide from "./divide";
import LazyShow from "./transitions/lazy-show";
import Example from "./example";
import SlideIn from "./transitions/slide-in";
import Image from "next/image";

export default function HeroDesktop() {
  const theme = useMantineTheme();
  const backgroundViolet = theme.colors.violet[0];
  const backgroundRed = theme.colors.red[0];

  return (
    <>
      <div
        style={{
          background: `linear-gradient(to left bottom, ${backgroundRed} 50%, ${backgroundViolet} 50%)`,
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Title
            style={{
              color: "#312A45",
              letterSpacing: "3px",
            }}
            size={50}
            className="hero-headline"
          >
            Art of Banking
          </Title>
          <div style={{ marginRight: "10px" }}>
            <Text
              className="hero-text-1"
              size="md"
              weight="bold"
              style={{ color: "#312A45" }}
              align="right"
            >
              The world economy is made from the fabric
            </Text>
            <Text
              className="hero-text-2"
              size="md"
              style={{ color: "#312A45" }}
              align="right"
            >
              <span style={{ fontWeight: "bold" }}>of global finance.</span> The
              fabric of global
            </Text>
            <Text
              className="hero-text-3"
              size="md"
              style={{ color: "#312A45" }}
              align="right"
            >
              finance is an interlocking matrix
            </Text>
            <Text
              className="hero-text-4"
              size="md"
              style={{ color: "#312A45" }}
              align="right"
            >
              of corporate balance sheets.
            </Text>
          </div>
        </div>
      </div>
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
              size={25}
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
          <SlideIn direction="right">
            <div
              style={{
                boxShadow: `5px 5px 15px 5px ${theme.colors.violet[2]}`,
                height: "200px",
                width: "280px",
                margin: "auto",
              }}
            >
              <Image
                src={example2}
                height={200}
                width={280}
                style={{
                  borderRadius: "5px",
                }}
              ></Image>
            </div>
          </SlideIn>
          <div style={{ marginTop: "25px" }}>
            <SlideIn direction="left">
              <Title
                style={{
                  color: "#312A45",
                  letterSpacing: "3px",
                }}
                size={40}
                align="center"
              >
                BLOBBLOB
              </Title>
              <Text align="center">plsapdapldpsad</Text>
            </SlideIn>
          </div>
          <div style={{ marginTop: "150px" }} />
          <SlideIn direction="left">
            <div
              style={{
                boxShadow: `5px 5px 15px 5px ${theme.colors.violet[2]}`,
                height: "200px",
                width: "280px",
                margin: "auto",
              }}
            >
              <Image
                src={example1}
                height={200}
                width={280}
                style={{
                  borderRadius: "5px",
                }}
              ></Image>
            </div>
          </SlideIn>
          <div style={{ marginTop: "25px" }}>
            <SlideIn direction="right">
              <Title
                style={{
                  color: "#312A45",
                  letterSpacing: "3px",
                }}
                size={40}
                align="center"
              >
                BALBAL
              </Title>
              <Text align="center">plsapdapldpsad</Text>
            </SlideIn>
          </div>
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
