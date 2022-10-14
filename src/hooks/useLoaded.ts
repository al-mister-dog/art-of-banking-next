import { useState, useEffect } from "react";

export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!loaded) setLoaded(true);
  }, [loaded]);
  return loaded
}
