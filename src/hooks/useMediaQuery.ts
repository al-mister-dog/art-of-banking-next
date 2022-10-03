import { useState, useCallback, useEffect } from "react";
// const width: number = 768;
// const useMediaQuery = () => {
//   const [targetReached, setTargetReached] = useState(false);

//   const updateTarget = useCallback((e: MediaQueryListEvent) => {
//     if (e.matches) {
//       setTargetReached(true);
//     } else {
//       setTargetReached(false);
//     }
//   }, []);

//   useEffect(() => {
//     const media = window.matchMedia(`(max-width: ${width}px)`);

//     try {
//       // Chrome & Firefox
//       media.addEventListener("change", updateTarget);
//     } catch {
//       // @deprecated method - Safari <= iOS12
//       media.addListener(updateTarget);
//     }

//     // Check on mount (callback is not called until a change occurs)
//     if (media.matches) {
//       setTargetReached(true);
//     }

//     return () => {
//       try {
//         // Chrome & Firefox
//         media.removeEventListener("change", updateTarget);
//       } catch {
//         // @deprecated method - Safari <= iOS12
//         media.removeListener(updateTarget);
//       }
//     };
//   }, [updateTarget, width]);

//   return targetReached;
// };

// const useIsMobile = () => {
//   return useMediaQuery();
// };

// export { useMediaQuery, useIsMobile };

export function useMediaQuery() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width < 800;
}
