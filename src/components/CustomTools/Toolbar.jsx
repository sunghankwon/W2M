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
import { FullScreenButton } from "./FullScreenButton";

export function Toolbar({ editorRef, updateHistory }) {
  const setCursorPosition = (pos) => {
    const textarea = editorRef.current;
    textarea.setSelectionRange(pos, pos);
  };

  return (
    <div className="flex w-[706px] h-9 bg-gray-100 border editor-toolbar">
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
      <UnderlineButton editorRef={editorRef} updateHistory={updateHistory} />
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
      <CodeBlockButton editorRef={editorRef} updateHistory={updateHistory} />
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
      <TableButton editorRef={editorRef} updateHistory={updateHistory} />
      <FullScreenButton />
    </div>
  );
}
