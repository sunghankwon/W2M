import { SurroundTextButton } from "./SurroundTextButton";
import { PrefixTextButton } from "./PrefixTextButton";
import { CaseButton } from "./CaseButton";
import { InsertButton } from "./InsertButton";
import boldIcon from "../../assets/Bold.png";
import italicIcon from "../../assets/italic.png";
import strikethroughIcon from "../../assets/strikethrough.png";
import underlineIcon from "../../assets/underline.png";
import taskIcon from "../../assets/task.png";
import unorderedIcon from "../../assets/unordered.png";
import quoteIcon from "../../assets/quote.png";
import uppercaseIcon from "../../assets/uppercase.png";
import lowercaseIcon from "../../assets/lowercase.png";
import imageIcon from "../../assets/image.png";
import linkIcon from "../../assets/link.png";

export function BoldButton({ editorRef, setCursorPosition, updateHistory }) {
  return (
    <SurroundTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={boldIcon}
      styleStart="**"
      styleEnd="**"
      shortcutKey="b"
      testId="boldButton"
    />
  );
}

export function ItalicButton({ editorRef, setCursorPosition, updateHistory }) {
  return (
    <SurroundTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={italicIcon}
      styleStart="_"
      styleEnd="_"
      shortcutKey="i"
      testId="italicButton"
    />
  );
}

export function StrikethroughButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  return (
    <SurroundTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={strikethroughIcon}
      styleStart="~~"
      styleEnd="~~"
      shortcutKey="d"
      testId="strikethroughButton"
    />
  );
}

export function UnderlineButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  return (
    <SurroundTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={underlineIcon}
      styleStart="<u>"
      styleEnd="</u>"
      shortcutKey="u"
      testId="underlineButton"
    />
  );
}

export function TaskButton({ editorRef, setCursorPosition, updateHistory }) {
  return (
    <PrefixTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={taskIcon}
      styleStart="- [ ] "
      shortcutKey="t"
      testId="taskButton"
    />
  );
}

export function UnorderedListButton({
  editorRef,
  setCursorPosition,
  updateHistory,
}) {
  return (
    <PrefixTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={unorderedIcon}
      styleStart="- "
      shortcutKey="u"
      testId="unorderedListButton"
    />
  );
}

export function QuoteButton({ editorRef, setCursorPosition, updateHistory }) {
  return (
    <PrefixTextButton
      editorRef={editorRef}
      setCursorPosition={setCursorPosition}
      updateHistory={updateHistory}
      icon={quoteIcon}
      styleStart="> "
      shortcutKey="q"
      testId="quoteButton"
    />
  );
}

export function UpperCaseButton({ editorRef, updateHistory }) {
  return (
    <CaseButton
      editorRef={editorRef}
      updateHistory={updateHistory}
      icon={uppercaseIcon}
      transformCase={(text) => text.toUpperCase()}
      altText="Uppercase"
    />
  );
}

export function LowerCaseButton({ editorRef, updateHistory }) {
  return (
    <CaseButton
      editorRef={editorRef}
      updateHistory={updateHistory}
      icon={lowercaseIcon}
      transformCase={(text) => text.toLowerCase()}
      altText="Lowercase"
    />
  );
}

export function ImageButton({ editorRef, updateHistory }) {
  return (
    <InsertButton
      editorRef={editorRef}
      updateHistory={updateHistory}
      icon={imageIcon}
      placeholder="Image"
      markdownSyntax={(url) => `![](${url})`}
    />
  );
}

export function LinkButton({ editorRef, updateHistory }) {
  return (
    <InsertButton
      editorRef={editorRef}
      updateHistory={updateHistory}
      icon={linkIcon}
      placeholder="Link"
      markdownSyntax={(url) => `[](${url})`}
    />
  );
}
