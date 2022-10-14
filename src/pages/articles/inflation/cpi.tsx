import { useMediaQuery } from "@mantine/hooks";
import { mediaQuery } from "../../../config/media-query";
import { useLoaded } from "../../../hooks/useLoaded";
import CpiPageMobile from "../../../components/mobile/articles/inflation/cpi/page";
import CpiPageDesktop from "../../../components/desktop/articles/inflation/cpi/page";

export default function CPI() {
  const loaded = useLoaded;
  const isMobile = useMediaQuery(mediaQuery);

  if (loaded) {
    return isMobile ? <CpiPageMobile /> : <CpiPageDesktop />;
  }
  return null;
}
