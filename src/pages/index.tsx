import LazyShow from "../components/widgets/lazy-show";
import { SimpleGrid, Text, Title, useMantineTheme } from "@mantine/core";
import type { NextPage } from "next";
import example1 from "../../public/aob_example2_cropped.png";
import Image from "next/image";

const IndexPage: NextPage = () => {
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
          height: "100vh",
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
      <div
        style={{
          height: "100vh",

          background: `linear-gradient(to right bottom, ${backgroundViolet} 50%, ${backgroundRed} 50%)`,
        }}
      >
        <SimpleGrid
          cols={2}
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
              Bla bla bla
            </Title>
            <Text align="center">Blablablabla</Text>
          </LazyShow>
          <div>
            <LazyShow>
              <div
                style={{
                  boxShadow: `5px 5px 15px 5px ${theme.colors.violet[2]}`,
                  height: "350px",
                  width: "500px",
                  marginRight: "50px",
                }}
              >
                <Image
                  src={example1}
                  height={350}
                  width={500}
                  style={{
                    borderRadius: "5px",
                  }}
                ></Image>
              </div>
            </LazyShow>
          </div>
        </SimpleGrid>
      </div>
    </>
  );
};

export default IndexPage;
