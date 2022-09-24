import Link from "next/link";
import { useAppDispatch } from "../../app/hooks";
import { setup } from "../../features/banks/banksSlice";
import { setActions } from "../../features/lectures/lecturesSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";
import { partsTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { createStyles } from "@mantine/core";
import Article from "../../components/article/article";
import BalanceSheets from "../../components/balancesheets/cards/card-list";
import Charts from "../../components/charts/tabs";
import ChartsAndSettings from "../../components/charts-and-settings/desktop";
import KeyTerms from "../../components/article/lecture-index/key-terms";
import { useEffect } from "react";
import { setupFunctions } from "../../config/setup-functions/setupFunctions";

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
  const { introductoryTexts, title, keyTermsIds, slug, id } = routeData;
  const { paragraphs, assignment } = introductoryTexts;
  const dispatch = useAppDispatch();
  const { classes } = useStyles();

  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
  }, [id]);

  return (
    <>
      <Article
        slug={slug}
        title={title}
        text={paragraphs}
        assignment={assignment}
      />

      {title !== "Introduction" && (
        <div className={classes.assignmentContainer}>
          <div className={classes.balanceSheets}>
            <BalanceSheets />
            <div style={{ height: "25px" }} />
            <ChartsAndSettings />
          </div>
        </div>
      )}

      <div className={classes.keyTermsContainer}>
        <KeyTerms ids={keyTermsIds} />
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
