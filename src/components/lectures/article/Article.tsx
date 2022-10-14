import ArticleMobile from "./mobile/article";

export default function Article({ slug, title, text, assignment }) {
  return (
    <ArticleMobile
      slug={slug}
      title={title}
      text={text}
      assignment={assignment}
    />
  );
}
