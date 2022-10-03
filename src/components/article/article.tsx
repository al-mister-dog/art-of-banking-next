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
        <Title slug={slug} title={title} />
        <div style={{ marginTop: "25px" }}>
          <Main text={text} />
        </div>
      </div>

      <div className={classes.assignmentContainer}>
        <Assignment assignment={assignment} />
      </div>
    </>
  );
}
