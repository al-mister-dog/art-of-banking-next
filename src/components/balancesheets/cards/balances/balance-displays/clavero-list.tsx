import { useEffect, useRef } from "react";
import {
  Card,
  Center,
  SimpleGrid,
  Text,
  Title,
  createStyles,
} from "@mantine/core";

import Clavero from "./clavero";
import { flushSync } from "react-dom";

export default function ClaveroList({ assets, liabilities }) {
  const assetsRef = useRef(null);
  const liabilitiesRef = useRef(null);

  useEffect(() => {
    flushSync(() => {});
    assetsRef.current.lastChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
    liabilitiesRef.current.lastChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  }, []);

  return (
    <Card.Section>
      <SimpleGrid
        cols={2}
        spacing={0}
        style={{ height: "110px", overflowX: "hidden" }}
      >
        <div ref={assetsRef}>
          {assets.map((record: any, index) => {
            return <Clavero key={index} record={record} />;
          })}
        </div>
        <div ref={liabilitiesRef}>
          {liabilities.map((record: any, index) => {
            return <Clavero key={index} record={record} />;
          })}
        </div>
      </SimpleGrid>
    </Card.Section>
  );
}
