import { MutableRefObject } from "react";
import { HeaderButton } from "./HeaderButton";
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  StrikethroughButton,
  QuoteButton,
  TaskButton,
  UnorderedListButton,
  UpperCaseButton,
  LowerCaseButton,
  LinkButton,
  ImageButton,
} from "./ToolbarButton";
import { CodeBlockButton } from "./CodeBlockButton";
import { CapitalizeButton } from "./CapitalizeButton";
import { NumberListButton } from "./NumberListButton";
import { TableButton } from "./TableButton";
import { DividerButton } from "./DividerButton";
import { FullScreenButton } from "./FullScreenButton";

interface ToolbarProps {
  editorRef: MutableRefObject<HTMLTextAreaElement | null>;
  updateHistory: (newValue: string, isHistoryUpdating?: boolean) => void;
}

export function Toolbar({
  editorRef,
  updateHistory,
}: ToolbarProps): JSX.Element {
  const setCursorPosition = (pos: number) => {
    const textarea = editorRef.current;
    if (textarea) {
      textarea.setSelectionRange(pos, pos);
    }
  };

  return (
    <div
      className="flex w-[706px] h-9 bg-gray-100 border editor-toolbar"
      role="toolbar"
    >
      <HeaderButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <BoldButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <ItalicButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <UnderlineButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <StrikethroughButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <QuoteButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <DividerButton editorRef={editorRef} updateHistory={updateHistory} />
      <CodeBlockButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <LinkButton editorRef={editorRef} updateHistory={updateHistory} />
      <CapitalizeButton editorRef={editorRef} updateHistory={updateHistory} />
      <UpperCaseButton editorRef={editorRef} updateHistory={updateHistory} />
      <LowerCaseButton editorRef={editorRef} updateHistory={updateHistory} />
      <NumberListButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <UnorderedListButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <TaskButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <ImageButton editorRef={editorRef} updateHistory={updateHistory} />
      <TableButton
        editorRef={editorRef}
        setCursorPosition={setCursorPosition}
        updateHistory={updateHistory}
      />
      <FullScreenButton />
    </div>
  );
}
