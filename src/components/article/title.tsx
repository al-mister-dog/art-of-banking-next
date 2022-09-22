import { Breadcrumbs, Text } from "@mantine/core";
import Link from "next/link";

export default function Title({ slug, title }) {
  return (
    <>
      <Breadcrumbs>
        {[
          <Link href="/lectures" key={1}>
            <Text>Lectures</Text>
          </Link>,
          <Link href={`/lectures/${slug[0]}`} key={2}>
            <Text transform="capitalize">{slug[0].split("-").join(" ")}</Text>
          </Link>,
        ]}
      </Breadcrumbs>
      <h1>{title}</h1>
    </>
  );
}
