import { Group } from "@mantine/core";
import { CardInfo } from "../../types";
import Card from "../card/card-mobile";

export default function LayoutMobile({
  banksArray,
}: {
  banksArray: CardInfo[];
}) {
  function halveArray(array: any[]) {
    const half = array.length / 2;
    const halfAndRemainder = Math.round(half);
    return array.length % 2 === 0
      ? [array.slice(0, half), array.slice(half, array.length)]
      : [
          array.slice(0, halfAndRemainder),
          array.slice(halfAndRemainder, array.length),
        ];
  }

  const [group1, group2] = halveArray(banksArray);
  return (
    <Group style={{ height: "65vh", width: "100%", overflow: "auto" }}>
      {banksArray.map((bank) => (
        <Card key={bank.cardInfo.id} bank={bank} />
      ))}
    </Group>
  );
}
