export const syncScroll = (sourceRef, targetRef, isProgrammaticScroll) => {
  const { scrollTop, scrollHeight, clientHeight } = sourceRef.current;
  const targetScrollHeight =
    targetRef.current.scrollHeight - targetRef.current.clientHeight;
  const scrollRatio = scrollTop / (scrollHeight - clientHeight);
  targetRef.current.scrollTop = targetScrollHeight * scrollRatio;

  setTimeout(() => {
    isProgrammaticScroll.current = false;
  }, 10);
};
