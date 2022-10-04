import { useMediaQuery } from "@mantine/hooks";
import ArticleMobile from "./mobile/article";
import ArticleDesktop from "./desktop/article";

export default function Article({ slug, title, text, assignment }) {
  const matches = useMediaQuery("(min-width: 768px)");
  
  return matches ? (
    <ArticleDesktop
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  ) : (
    <ArticleMobile
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  );
}
