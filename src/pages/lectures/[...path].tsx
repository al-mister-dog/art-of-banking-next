import { useAppDispatch } from "../../app/hooks";
import { selectActions, setActions } from "../../features/actions/actionsSlice";
import Article from "../../components/article/article";
import { partsTexts } from "../../config/parts";
import { getRouteObjectData } from "../../helpers/routeMethods";
import { lectureRoutes } from "../../sidebar-routes/lectureRoutes";
import { setup } from "../../features/banks/banksSlice";
import { refreshSettings } from "../../features/settings/settingsSlice";
import BalanceSheets from "../../components/balancesheets/cards/card-list";
import { useEffect, useState } from "react";

function useLectures(id) {
  const dispatch = useAppDispatch();
  dispatch(setup({ id }));
  dispatch(setActions({ id }));
  dispatch(refreshSettings());
}

export default function LecturePath({
  id,
  path,
  title,
  lectureId,
  keyTermsIds,
  introductoryTexts,
}) {
  const dispatch = useAppDispatch();

  const { paragraphs, assignment } = introductoryTexts;
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  useEffect(() => {
    dispatch(setup({ id }));
    dispatch(setActions({ id }));
    dispatch(refreshSettings());
    setIsLoading(false);
    // return () => {
    //   setIsLoading(true);
    // };
  }, [id]);

  if (isLoading) {
    return <></>;
  }
  return (
    <>
      <BalanceSheets />
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
