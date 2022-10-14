import { useMediaQuery } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { mediaQuery } from "../config/media-query";

export function useLoadMobile() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) setLoaded(true);
  }, [loaded]);

  const isMobile = useMediaQuery(mediaQuery);
  return [loaded, isMobile];
}
