import { Spoiler, Text } from "@mantine/core";

interface IntroProps {
  text: string[];
}
export default function IntroText({ text }: IntroProps) {
  return (
    <>
      <Spoiler maxHeight={120} showLabel="Read More" hideLabel="Hide">
        {text.map((t) => (
          <Text key={t} size="xl" sx={{letterSpacing: "1px", marginBottom: "25px"}}>
            {t}
          </Text>
        ))}
      </Spoiler>
    </>
  );
}
