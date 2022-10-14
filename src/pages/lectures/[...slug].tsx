import { useAppDispatch } from "../../app/hooks";
import { setActions } from "../../features/actions/actionsSlice";
import { setup } from "../../features/banks/banksSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";
import { useEffect } from "react";
import { createStyles, LoadingOverlay } from "@mantine/core";
import { introductoryTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { lectureRoutes } from "../../config/routes/lectureRoutes";
import { useLoaded } from "../../hooks/useLoaded";
import { mediaQuery } from "../../config/media-query";
import { useMediaQuery } from "@mantine/hooks";
import LecturePageDesktop from "../../components/desktop/lecture-page";
import LecturePageMobile from "../../components/mobile/lecture-page";

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
  id,
  title,
  introductoryTexts,
  keyTermsIds,
}) {
  const { paragraphs, assignment } = introductoryTexts;
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
  }, []);

  const loaded = useLoaded();
  const isMobile = useMediaQuery(mediaQuery);

  if (loaded) {
    return isMobile ? (
      <LecturePageMobile
        slug={slug}
        title={title}
        text={paragraphs}
        assignment={assignment}
        keyTermsIds={keyTermsIds}
      />
    ) : (
      <LecturePageDesktop
        slug={slug}
        title={title}
        text={paragraphs}
        assignment={assignment}
        keyTermsIds={keyTermsIds}
      />
    );
  }

  return (
    <LoadingOverlay
      loaderProps={{ size: "xl", color: "violet", variant: "dots" }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
    />
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
