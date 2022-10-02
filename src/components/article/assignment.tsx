import { createStyles } from "@mantine/core";
import { Card, Text, Title } from "@mantine/core";
import { useMediaQuery } from "../../hooks/useMediaQuery";

const useStyles = createStyles((theme) => ({
  title: {
    padding: 16,

    marginBottom: 0,
    display: "inline-block",
    background: theme.colors.violet[0],
    borderTop: `1px solid ${theme.colors.violet[1]}`,
    borderRight: `1px solid ${theme.colors.violet[1]}`,
    borderTopRightRadius: 5,
  },
  card: {
    paddingTop: 16,
    background: theme.colors.violet[0],
  },
  desktopWidth: {
    width: "65%",
    paddingLeft: "50px",
  },
}));
export default function Assignment({ assignment }) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery();
  return (
    <div>
      <Title
        className={classes.title}
        order={2}
        style={{
          paddingLeft: isMobile ? "" : "50px",
          paddingRight: isMobile ? "" : "50px",
        }}
      >
        Assignment
      </Title>
      <div className={`${classes.card}`}>
        <div
          className={`${!isMobile && classes.desktopWidth}`}
          style={{ paddingLeft: isMobile ? 16 : "50px" }}
        >
          <Text size="xl" weight="bold" italic>
            {assignment}
          </Text>
        </div>
      </div>
    </div>
  );
}
