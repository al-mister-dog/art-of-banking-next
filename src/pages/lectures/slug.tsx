import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../app/hooks";
import { setup } from "../../features/banks/banksSlice";
import { setActions } from "../../features/actions/actionsSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";
import { partsTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { createStyles } from "@mantine/core";
import Article from "../../components/article/article";
import BalanceSheets from "../../components/balancesheets/cards/card-list";

import ChartsAndSettings from "../../components/charts-and-settings/desktop";
import KeyTerms from "../../components/article/lecture-index/key-terms";
import { useEffect, useState } from "react";
import { lectureRoutes } from "../../config/sidebar-routes/lectureRoutes";

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

export default function LecturesPart({ routeData }) {
  // const { introductoryTexts, title, keyTermsIds, slug } = routeData;
  const router = useRouter();
  const id = router.query.id;
  // const { paragraphs, assignment } = introductoryTexts;
  const dispatch = useAppDispatch();
  const { classes } = useStyles();
  const [renderedId, setRenderedId] = useState(id);

  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
    setRenderedId(id);
  }, [id]);
  if (renderedId !== id) {
    return <></>;
  }

  return (
    <>
      {/* <Article
        slug={slug}
        title={title}
        text={paragraphs}
        assignment={assignment}
      /> */}

      { (
        <div className={classes.assignmentContainer}>
          <div className={classes.balanceSheets}>
            <BalanceSheets />
            <div style={{ height: "25px" }} />
            <ChartsAndSettings />
          </div>
        </div>
      )}

      <div className={classes.keyTermsContainer}>
        {/* <KeyTerms ids={keyTermsIds} /> */}
      </div>
      <Link href="/lectures/fundamentals/deposit-transfers">Next</Link>
    </>
  );
}

export async function getServerSideProps(context: { query: { slug: any } }) {
  const { slug } = context.query;

  try {
    let data = getRouteObjectData(slug);
    const { id, title, path, lectureId, keyTermsIds } = data;
    const introductoryTexts = partsTexts[id];

    return {
      props: {
        routeData: {
          introductoryTexts,
          id,
          title,
          path,
          lectureId,
          keyTermsIds,
          slug,
        },
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
//253
