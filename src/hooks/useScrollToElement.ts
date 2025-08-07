import { useCallback } from "react";

export const useScrollToElement = () => {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return scrollTo;
};
