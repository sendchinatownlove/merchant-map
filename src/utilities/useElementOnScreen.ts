import { useState, useEffect, RefObject } from "react";

export function useElementOnScreen(ref: RefObject<HTMLDivElement>) {
  const [scrollTop, setScrollTop] = useState(0);
  const [isOnScreen, setIsOnScreen] = useState(false);

  const handleScroll = (e: any) => {
    const currentScrollTop = e?.target?.documentElement?.scrollTop;
    setScrollTop(currentScrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const isDivOnScreen = checkIfDivOnScreen(ref);

    if (isDivOnScreen) {
      setIsOnScreen(true);
    } else {
      setIsOnScreen(false);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollTop]);

  return isOnScreen;
}

/**
 * Checks if a div is on the screen. A div is considered on the screen if it is
 * passing a boundary on the screen. `boundary = percOfScreenHeight * screenHeightInPixels`.
 * Think of this like a horizontal line that passes the y-axis at `y = boundary`.
 *
 * For example, if `screenHeightInPixels` is `1000` and the `percOfScreenHeight` is `0.5`,
 * then the `boundary` is at 500 pixels. If any part of a div is within the `boundary`,
 * it is considered part of the screen.
 *
 * @param ref Ref object from the React hook `useRef.`
 * @param percOfScreenHeight Sets where on the screen the boundary for determining whether a div is on the screen
 * should be set. Default is 0.5 (half the screen).
 * @returns {boolean}
 */
function checkIfDivOnScreen(
  ref: RefObject<HTMLDivElement>,
  percOfScreenHeight: number = 0.5
) {
  const screenHeightInPixels = window.innerHeight;
  const boundary = screenHeightInPixels * percOfScreenHeight;

  const divPosition = ref?.current?.getBoundingClientRect();

  return (
    divPosition && boundary > divPosition.top && boundary < divPosition.bottom
  );
}
