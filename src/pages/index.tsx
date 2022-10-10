import { Title } from "@mantine/core";
import type { NextPage } from "next";

const IndexPage: NextPage = () => {
  return (
    <div style={{ padding: 16, marginTop: "200px" }}>
      <Title order={1}>Art of Banking</Title>
      <p>The world economy is made from the fabric of global finance.</p>
      <p>
        The fabric of global finance is an interlocking matrix of corporate
        balance sheets
      </p>
    </div>
  );
};

export default IndexPage;
