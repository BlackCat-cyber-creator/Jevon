import { useEffect, useState, RefObject } from "react";

export function useIntersectionObserver(
  ref: RefObject<Element>,
  initialState: boolean = false,
  options: IntersectionObserverInit = { threshold: 0.05 }
) {
  const [isIntersecting, setIsIntersecting] = useState(initialState);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return isIntersecting;
}
