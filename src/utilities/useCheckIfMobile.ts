import { useEffect, useState } from "react";

export function useCheckIfMobile(minWidthPixels: number = 760): boolean {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const handleResize = (): void => {
    setInnerWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return innerWidth <= minWidthPixels;
}
