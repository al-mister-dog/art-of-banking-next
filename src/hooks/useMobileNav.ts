import { useState } from "react";

export function useMobileNav() {
  const [mobOpen, setMobOpen] = useState(true);
  return [mobOpen, setMobOpen];
}
