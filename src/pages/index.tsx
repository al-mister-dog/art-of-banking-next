import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../config/media-query";
import type { NextPage } from "next";
import HeroDesktop from "../components/hero/hero-desktop";
import HeroMobile from "../components/hero/hero-mobile";

const IndexPage: NextPage = () => {
  const isMobile = useMediaQuery(mediaQuery);
  return isMobile ? <HeroMobile /> : <HeroDesktop />;
};

export default IndexPage;
