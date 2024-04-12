import { render, fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Toolbar } from "../components/CustomTools/Toolbar";

describe("Toolbar Component tests", () => {
  it("renders correctly", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    expect(screen.getByRole("toolbar")).toBeInTheDocument();
  });

  it("calls updateHistory when the bold button is clicked", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    const boldButton = screen.getByTestId("boldButton");
    fireEvent.click(boldButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the italic button is clicked", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    const italicButton = screen.getByTestId("italicButton");
    fireEvent.click(italicButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the underline button is clicked", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    const underlineButton = screen.getByTestId("underlineButton");
    fireEvent.click(underlineButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the quote button is clicked", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    const quoteButton = screen.getByTestId("quoteButton");
    fireEvent.click(quoteButton);

    expect(updateHistory).toHaveBeenCalled();
  });

  it("calls updateHistory when the number list button is clicked", () => {
    const editorRef = { current: document.createElement("textarea") };
    const updateHistory = vi.fn();

    render(<Toolbar editorRef={editorRef} updateHistory={updateHistory} />);
    const numberListButton = screen.getByTestId("numberListButton");
    fireEvent.click(numberListButton);

    expect(updateHistory).toHaveBeenCalled();
  });
});
