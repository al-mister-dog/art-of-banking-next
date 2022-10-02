import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Title, Text, createStyles } from "@mantine/core";
import Assignment from "./assignment";
import Main from "./main";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  articleContainer: { padding: 16 },
  assignmentContainer: {
    marginTop: "200px",
  },
}));
export default function Intro({ title, text, nextPath }) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery();
  const paddingRight = `${isMobile ? "0px" : "200px"}`;
  const paddingLeft = `${isMobile ? "10px" : "50px"}`;

  return (
    <>
      <div
        style={{
          padding: `0px ${paddingRight} 0px ${paddingLeft}`,
          marginTop: "200px",
        }}
      >
        <Title>{title}</Title>
        <div style={{ marginTop: "25px" }}>
          <Text
            size="xl"
            sx={{
              letterSpacing: "1px",
              marginBottom: "25px",
            }}
          >
            {text}
          </Text>
          <div style={{ marginTop: "25px" }}>
            <Text italic weight="bold" color="violet">
              <Link href={`/lectures${nextPath}`}>
                To the Next Lecture. . .
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </>
  );
}
