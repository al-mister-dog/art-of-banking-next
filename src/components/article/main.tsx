import { Spoiler, Text } from "@mantine/core";
import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface IntroProps {
  text: string[];
}
export default function Main({ text }: IntroProps) {
  return (
    <Spoiler maxHeight={120} showLabel="Read More" hideLabel="Hide">
      {text.map((t) => (
        <Text
          key={t}
          size="xl"
          sx={{
            letterSpacing: "1px",
            marginBottom: "25px",
          }}
        >
          {t}
        </Text>
      ))}
    </Spoiler>
  );
}


