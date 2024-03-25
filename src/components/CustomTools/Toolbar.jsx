import { HeaderButton } from "./HeaderButton";
import { BoldButton } from "./BoldButton";
import { ItalicButton } from "./ItalicButton";
import { UnderlineButton } from "./UnderlineButton";
import { StrikethroughButton } from "./StrikethroughButton";
import { QuoteButton } from "./QuoteButton";
import { CodeBlockButton } from "./CodeBlockButton";
import { LinkButton } from "./LinkButton";
import { CapitalizeButton } from "./CapitalizeButton";
import { UpperCaseButton } from "./UpperCaseButton";
import { LowerCaseButton } from "./LowerCaseButton";
import { NumberListButton } from "./NumberListButton";
import { UnorderedListButton } from "./UnorderedListButton";
import { TaskButton } from "./TaskButton";
import { ImageButton } from "./ImageButton";
import { TableButton } from "./TableButton";
import { DividerButton } from "./DividerButton";

export function Toolbar({
  editorRef,
  markdownText,
  setMarkdownText,
  updateHistory,
}) {
  const setCursorPosition = (pos) => {
    const textarea = editorRef.current;
    textarea.setSelectionRange(pos, pos);
  };

  return (
    <div className="flex w-[706px] h-9 bg-gray-100 border">
      <HeaderButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <BoldButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <ItalicButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <UnderlineButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <StrikethroughButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <QuoteButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <DividerButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <CodeBlockButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <LinkButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <CapitalizeButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <UpperCaseButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <LowerCaseButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <NumberListButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <UnorderedListButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <TaskButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <ImageButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
      <TableButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        updateHistory={updateHistory}
      />
    </div>
  );
}
