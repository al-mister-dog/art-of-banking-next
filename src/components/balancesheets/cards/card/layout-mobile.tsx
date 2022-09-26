import { Group } from "@mantine/core";
import { splitArray } from "../../../helpers";
import { CardInfo } from "../../types";
import Card from "../card/card-mobile";

export default function LayoutMobile({
  banksArray,
}: {
  banksArray: CardInfo[];
}) {
  const [group1, group2] = splitArray(banksArray);
  
  return (
    <Group style={{ height: "65vh", width: "100%", overflow: "auto" }}>
      {banksArray.map((bank) => (
        <Card key={bank.cardInfo.id} bank={bank} />
      ))}
    </Group>
  );
}
