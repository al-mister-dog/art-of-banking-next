import { Breadcrumbs, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function LectureTitle({ slug, title }) {
  return (
    <>
      <Breadcrumbs style={{marginBottom: "25px", fontWeight: "bold"}}>
        {[
          <Link href="/lectures" key={1}>
            <Text>Lectures</Text>
          </Link>,
          <Link href={`/lectures/${slug[0]}`} key={2}>
            <Text transform="capitalize">{slug[0].split("-").join(" ")}</Text>
          </Link>,
        ]}
      </Breadcrumbs>
      <Title>{title}</Title>
    </>
  );
}
