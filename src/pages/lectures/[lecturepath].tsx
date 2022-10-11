import { lectureRoutes } from "../../config/routes/lectureRoutes";
import { homeTexts } from "../../config/homeTexts";
import Intro from "../../components/lectures/article/intro";

export default function LecturePath({ id, title, nextPath }) {
  const { text } = homeTexts[id];

  return (
    <>
      <Intro title={title} text={text} nextPath={nextPath} />
    </>
  );
}

export async function getStaticProps(context) {
  const { lecturepath } = context.params;

  const data = lectureRoutes.routes
    .map((route) => {
      const { id, title, path, routes } = route;
      return { id, title, path, nextPath: routes[0].path };
    })
    .find((route) => route.path.split("/")[2] === lecturepath);

  const { id, title, path, nextPath } = data;
  return {
    props: {
      id,
      title,
      path,
      nextPath,
    },
  };
}

export async function getStaticPaths() {
  const paths = lectureRoutes.routes.flatMap((route) => {
    return {
      params: { lecturepath: route.path.split("/")[2] },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}
