import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../config/media-query";
import ArticleMobile from "./mobile/article";
import ArticleDesktop from "./desktop/article";

export default function Article({ slug, title, text, assignment }) {
  const isMobile = useMediaQuery(mediaQuery);

  return isMobile ? (
    <ArticleMobile
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  ) : (
    <ArticleDesktop
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  );
}
