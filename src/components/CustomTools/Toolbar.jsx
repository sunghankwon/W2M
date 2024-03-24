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

export function Toolbar({ editorRef, markdownText, setMarkdownText }) {
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
      />
      <BoldButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <ItalicButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <UnderlineButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <StrikethroughButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <QuoteButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <DividerButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <CodeBlockButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <LinkButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <CapitalizeButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <UpperCaseButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <LowerCaseButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <NumberListButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <UnorderedListButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <TaskButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
        setCursorPosition={setCursorPosition}
      />
      <ImageButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
      <TableButton
        editorRef={editorRef}
        markdownText={markdownText}
        setMarkdownText={setMarkdownText}
      />
    </div>
  );
}
