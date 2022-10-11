import { Group } from "@mantine/core";
import { CardInfo } from "../../types";
import Card from "./card-mobile";

export default function LayoutMobile({
  banksArray,
}: {
  banksArray: CardInfo[];
}) {
  return (
    <Group style={{ height: "26rem", width: "100%", overflow: "auto" }}>
      {banksArray.map((bank) => (
        <Card key={bank.cardInfo.id} bank={bank} />
      ))}
    </Group>
  );
}
