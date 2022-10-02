import Article from "../../components/article/article";
import { partsTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { lectureRoutes } from "../../config/sidebar-routes/lectureRoutes";

import BalanceSheets from "../../components/balancesheets/cards/card-list";
import ChartsAndSettings from "../../components/charts-and-settings/desktop";
import { createStyles } from "@mantine/core";
import KeyTerms from "../../components/article/lecture-index/key-terms";
import Link from "next/link";
import { useLectureContent } from "../../hooks/useLectureContent";
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

export default function LecturePath(props) {
  console.log(props);
  // const { paragraphs, assignment } = introductoryTexts;
  // const { classes } = useStyles();
  // useLectureContent(id);

  return (
    <>
      {/* <Article
        slug={path}
        title={title}
        text={paragraphs}
        assignment={assignment}
      /> */}
    </>
  );
}

export async function getStaticProps(context) {
  const { lecturePath } = context.params;

  // const data = getRouteObjectData(path);
  let foundRoute;
  let found = lectureRoutes.routes.find(
    (rt) => rt.path === `/lectures/${lecturePath}}`
  );
  if (found) {
    foundRoute = found;
  }

  //   const { id,
  //     title, keyTermsIds
  // } = data;
  //   const introductoryTexts = partsTexts[id];
  return {
    props: {
      foundRoute,
    },
  };
}

export async function getStaticPaths() {
  const paths = lectureRoutes.routes.flatMap((route) => {
    return {
      params: { lecturepath: route.path.split("/")[2] },
      // params: { lecturepath: route.path },
    };
  });
  console.log(paths);

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
