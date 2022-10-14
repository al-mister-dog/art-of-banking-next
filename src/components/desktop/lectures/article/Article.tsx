import ArticleDesktop from "./desktop/article";

export default function Article({ slug, title, text, assignment }) {
  return (
    <ArticleDesktop
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  );
}
