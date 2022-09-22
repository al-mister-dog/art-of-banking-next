import { useMediaQuery } from "../../hooks/useMediaQuery";
import { createStyles } from "@mantine/core";
import Assignment from "./assignment";
import Main from "./main";
import Title from "./title";

const useStyles = createStyles((theme) => ({
  articleContainer: { padding: 16 },
  assignmentContainer: {
    marginTop: "200px",
  },
}));
export default function Article({ slug, title, text, assignment }) {
  const { classes } = useStyles();
  const isMobile = useMediaQuery();
  const sidePadding = `${isMobile ? "0px" : "200px"}`;
  return (
    <>
      <div
        style={{ padding: `0px ${sidePadding} 0px 16px`, marginTop: "50px" }}
      >
        <Title slug={slug} title={title} />
        <Main text={text} />
      </div>

      <div className={classes.assignmentContainer}>
        <Assignment assignment={assignment} />
      </div>
    </>
  );
}
