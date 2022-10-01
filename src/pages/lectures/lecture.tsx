import { useRouter } from "next/router";

import { createStyles } from "@mantine/core";
import Link from "next/link";
import { useState, useEffect } from "react";
import Article from "../../components/article/article";
import { useAppDispatch } from "../../app/hooks";
import KeyTerms from "../../components/article/lecture-index/key-terms";
import BalanceSheets from "../../components/balancesheets/cards/card-list";
import { setActions } from "../../features/actions/actionsSlice";
import { setup } from "../../features/banks/banksSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";

import ChartsAndSettings from "../../components/charts-and-settings/desktop";
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

      {/* {title !== "Introduction" && ( */}
      <div className={classes.assignmentContainer}>
        <div className={classes.balanceSheets}>
          <BalanceSheets />
          <div style={{ height: "25px" }} />
          <ChartsAndSettings />
        </div>
      </div>
      {/* )} */}

      <div className={classes.keyTermsContainer}>
        {/* <KeyTerms ids={keyTermsIds} /> */}
      </div>
      <Link href="/lectures/fundamentals/deposit-transfers">Next</Link>
    </>
  );
}
