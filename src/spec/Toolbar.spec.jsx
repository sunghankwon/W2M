import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Toolbar } from "../components/CustomTools/Toolbar";

describe("Toolbar Component tests", () => {
  const editorRef = { current: document.createElement("textarea") };
  const updateHistory = vi.fn();
  const setCursorPosition = vi.fn();

  beforeEach(() => {
    render(
      <Toolbar
        editorRef={editorRef}
        updateHistory={updateHistory}
        setCursorPosition={setCursorPosition}
      />,
    );
  });

  it("renders correctly", () => {
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("calls updateHistory when the Header button is clicked", () => {
    const headerButton = screen.getByTestId("headerButton");
    fireEvent.click(headerButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the bold button is clicked", () => {
    const boldButton = screen.getByTestId("boldButton");
    fireEvent.click(boldButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the italic button is clicked", () => {
    const italicButton = screen.getByTestId("italicButton");
    fireEvent.click(italicButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the underline button is clicked", () => {
    const underlineButton = screen.getByTestId("underlineButton");
    fireEvent.click(underlineButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the quote button is clicked", () => {
    const quoteButton = screen.getByTestId("quoteButton");
    fireEvent.click(quoteButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the number list button is clicked", () => {
    const numberListButton = screen.getByTestId("numberListButton");
    fireEvent.click(numberListButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the Unordered List button is clicked", () => {
    const unorderedListButton = screen.getByTestId("unorderedListButton");
    fireEvent.click(unorderedListButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the task button is clicked", () => {
    const taskButton = screen.getByTestId("taskButton");
    fireEvent.click(taskButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the Divider button is clicked", () => {
    const dividerButton = screen.getByTestId("dividerButton");
    fireEvent.click(dividerButton);

    expect(updateHistory).toHaveBeenCalled();
  });
});
