import { intros } from "../../config/intros";

export default function LecturePage(props) {
  const { title, paragraphs, assignment } = props.data;
  return (
    <>
      <h1>{title}</h1>
      {paragraphs.map((para) => (
        <p key={para}>{para}</p>
      ))}
      <br />
      <p>{assignment}</p>
    </>
  );
}

export async function getServerSideProps(context) {
  const lectureId = context.query.id;
  const introData = intros[lectureId];
  return {
    props: {
      data: introData,
    },
  };
}
