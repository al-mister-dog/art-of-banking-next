import { createStyles } from "@mantine/core";
import BalanceSheets from "../interactive-ui/cards/card-list";
import ChartsAndSettings from "./charts-and-settings";
import Toolbar from "../interactive-ui/settings/toolbar";
import KeyTerms from "../lectures/article/lecture-index/key-terms";
import Article from "../lectures/article/Article";

const useStyles = createStyles((theme) => ({
  assignmentContainer: {
    backgroundColor: theme.colors.violet[0],
    paddingBottom: "200px",
    marginBottom: -25,
  },
  keyTermsContainer: {
    backgroundColor: theme.colors.red[0],
    paddingBottom: "50px",
  },
  balanceSheets: {
    padding: 16,
  },
}));

export default function LecturePath({
  slug,
  title,
  text,
  assignment,
  keyTermsIds,
}) {
  const { classes } = useStyles();
  return (
    <>
      <Article slug={slug} title={title} text={text} assignment={assignment} />
      {title !== "Introduction" && (
        <>
          <div className={classes.assignmentContainer}>
            <div className={classes.balanceSheets}>
              <div
                style={{
                  marginBottom: "25px",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Toolbar />
              </div>

              <BalanceSheets />
              <ChartsAndSettings />
            </div>
          </div>
          <div className={classes.keyTermsContainer}>
            <KeyTerms ids={keyTermsIds} />
          </div>
        </>
      )}
    </>
  );
}
