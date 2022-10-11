import { Title } from "@mantine/core";
import CpiPrice from "../../../components/articles/inflation/cpi/cpi-price";
import CpiWeight from "../../../components/articles/inflation/cpi/cpi-weight";
import CpiPriceWeight from "../../../components/articles/inflation/cpi/cpi-price-weight";

export default function CPI() {
  return (
    <>
      <Title>Cpi Price</Title>
      <CpiPrice />
      <Title>Cpi Weight</Title>
      <CpiWeight />
      <Title>Cpi Price/Weight</Title>
      <CpiPriceWeight />
    </>
  );
}
