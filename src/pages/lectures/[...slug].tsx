import { useAppDispatch } from "../../app/hooks";
import { setActions } from "../../features/actions/actionsSlice";
import { setup } from "../../features/banks/banksSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";
import { useEffect } from "react";
import {
  ActionIcon,
  createStyles,
  Popover,
  useMantineTheme,
} from "@mantine/core";
import { introductoryTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { lectureRoutes } from "../../config/sidebar-routes/lectureRoutes";
import Article from "../../components/article/article";
import BalanceSheets from "../../components/balancesheets/cards/card-list";
import ChartsAndSettings from "../../components/charts-and-settings/desktop";
import KeyTerms from "../../components/article/lecture-index/key-terms";
import RefreshBalanceSheets from "../../components/charts-and-settings/settings/refresh";
import Settings from "../../components/charts-and-settings/mobile";
import { Dots, DotsVertical } from "tabler-icons-react";
import Toolbar from "../../components/charts-and-settings/toolbar";

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
    // paddingTop: "50px",
  },
}));

export default function LecturePath({
  slug,
  id,
  title,
  introductoryTexts,
  keyTermsIds,
}) {
  const theme = useMantineTheme();
  const { paragraphs, assignment } = introductoryTexts;
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
  }, []);

  return (
    <>
      <Article
        slug={slug}
        title={title}
        text={paragraphs}
        assignment={assignment}
      />
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

export async function getStaticProps(context) {
  const { slug } = context.params;
  const data = getRouteObjectData(slug);
  const { id, title, keyTermsIds } = data;

  return {
    props: {
      slug,
      id,
      title,
      introductoryTexts: introductoryTexts[id],
      keyTermsIds,
      key: slug,
    },
  };
}

export async function getStaticPaths() {
  const paths = lectureRoutes.routes.flatMap((route) => {
    return route.routes.map((r) => ({
      params: { slug: r.path.split("/").slice(1, 3) },
    }));
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
