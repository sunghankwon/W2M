import { MutableRefObject, RefObject } from "react";

export const syncScroll = (
  sourceRef: RefObject<HTMLDivElement>,
  targetRef: RefObject<HTMLDivElement>,
  isProgrammaticScroll: MutableRefObject<boolean>,
): void => {
  if (sourceRef.current && targetRef.current) {
    const { scrollTop, scrollHeight, clientHeight } = sourceRef.current;
    const targetScrollHeight =
      targetRef.current.scrollHeight - targetRef.current.clientHeight;
    const scrollRatio = scrollTop / (scrollHeight - clientHeight);
    targetRef.current.scrollTop = targetScrollHeight * scrollRatio;

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 10);
  }
};
