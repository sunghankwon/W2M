import { render, fireEvent, screen } from "@testing-library/react";
import MarkdownEditor from "../components/MarkdownEditor";
import { describe, expect, it, vi } from "vitest";

describe("MarkdownEditor Component tests", () => {
  it("renders the component correctly", () => {
    const refMock = { current: document.createElement("textarea") };
    render(
      <MarkdownEditor
        editorRef={refMock}
        handleEditorScroll={vi.fn()}
        previewRef={refMock}
        isProgrammaticScroll={refMock}
      />,
    );
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("updates text area on change", () => {
    const refMock = { current: document.createElement("textarea") };
    render(
      <MarkdownEditor
        editorRef={refMock}
        handleEditorScroll={vi.fn()}
        previewRef={refMock}
        isProgrammaticScroll={refMock}
      />,
    );
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "new text" } });
    expect(textarea.value).toBe("new text");
  });
});
