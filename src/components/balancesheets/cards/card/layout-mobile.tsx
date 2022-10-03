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
    <div>
      <Group style={{ height: "30rem", width: "100%", overflow: "auto" }}>
        {banksArray.map((bank) => (
          <Card key={bank.cardInfo.id} bank={bank} />
        ))}
      </Group>
    </div>
  );
}
