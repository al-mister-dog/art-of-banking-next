import Assignment from "./assignment";
import Main from "./main";
import Title from "./title";

export default function Article({ slug, title, text, assignment }) {
  return (
    <>
      <div
        style={{
          padding: `0px 200px 0px 50px`,
          marginTop: "200px",
        }}
      >
        <Title slug={slug} title={title} />
        <div style={{ marginTop: "25px" }}>
          <Main text={text} />
        </div>
      </div>

      <div style={{ marginTop: "200px" }}>
        <Assignment assignment={assignment} />
      </div>
    </>
  );
}
