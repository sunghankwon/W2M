import { RefObject, MutableRefObject } from "react";

const handleEditorScrollSync = (
  editorRef: RefObject<HTMLTextAreaElement>,
  previewRef: RefObject<HTMLDivElement>,
  isProgrammaticScroll: MutableRefObject<boolean>,
  newValue: string,
): void => {
  isProgrammaticScroll.current = true;
  const currentScrollTop = editorRef.current?.scrollTop ?? 0;

  setTimeout(() => {
    isProgrammaticScroll.current = false;
    if (!editorRef.current || !previewRef.current) return;

    editorRef.current.scrollTop = currentScrollTop;

    const { scrollTop, scrollHeight, clientHeight } = editorRef.current;
    const isWithinBottom10Percent =
      scrollTop + clientHeight >= scrollHeight * 0.9;

    if (isWithinBottom10Percent) {
      if (newValue.endsWith("\n")) {
        editorRef.current.scrollTop = editorRef.current.scrollTop + 20;
      }
      const previewScrollHeight =
        previewRef.current.scrollHeight - previewRef.current.clientHeight + 20;
      const scrollRatio = scrollTop / (scrollHeight - clientHeight);
      previewRef.current.scrollTop = previewScrollHeight * scrollRatio;
    }
  }, 10);
};

export default handleEditorScrollSync;
