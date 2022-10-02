import { createStyles } from "@mantine/core";
import { useLectureContent } from "../../hooks/useLectureContent";
import { partsTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { lectureRoutes } from "../../config/sidebar-routes/lectureRoutes";
import Article from "../../components/article/article";
import BalanceSheets from "../../components/balancesheets/cards/card-list";
import ChartsAndSettings from "../../components/charts-and-settings/desktop";
import KeyTerms from "../../components/article/lecture-index/key-terms";

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
    paddingTop: "50px",
  },
}));

export default function LecturePath({
  id,
  path,
  title,
  keyTermsIds,
  introductoryTexts,
}) {
  const { paragraphs, assignment } = introductoryTexts;
  const { classes } = useStyles();
  useLectureContent(id);

  return (
    <>
      <Article
        slug={path}
        title={title}
        text={paragraphs}
        assignment={assignment}
      />
      {title !== "Introduction" && (
        <>
          <div className={classes.assignmentContainer}>
            <div className={classes.balanceSheets}>
              <BalanceSheets />
              <div style={{ height: "25px" }} />
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

export async function getStaticProps(context) {
  const { path } = context.params;
  const data = getRouteObjectData(path);
  const { id, title, keyTermsIds } = data;
  const introductoryTexts = partsTexts[id];
  return {
    props: { id, title, keyTermsIds, introductoryTexts, path },
  };
}

export async function getStaticPaths() {
  const paths = lectureRoutes.routes.flatMap((route) => {
    return route.routes.map((r) => ({
      params: { path: r.path.split("/").slice(1, 3) },
    }));
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
