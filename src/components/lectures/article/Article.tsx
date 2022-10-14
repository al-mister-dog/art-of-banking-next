import ArticleMobile from "./mobile/article";
import ArticleDesktop from "./desktop/article";
import { useLoaded } from "../../../hooks/useLoaded";
import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../../config/media-query";
import { LoadingOverlay } from "@mantine/core";

export default function Article({ slug, title, text, assignment }) {
  const loaded = useLoaded();
  const isMobile = useMediaQuery(mediaQuery);
  if (loaded) {
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
  return (
    <LoadingOverlay
      loaderProps={{ size: "sm", color: "pink", variant: "bars" }}
      overlayOpacity={0.3}
      overlayColor="#c5c5c5"
      visible
    />
  );
}
