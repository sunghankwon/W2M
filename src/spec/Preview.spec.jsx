import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Preview from "../components/Preview";
import useMarkdownTextStore from "../store/useMarkdownText";

describe("Preview Component", () => {
  beforeEach(() => {
    act(() => {
      const { setMarkdownText } = useMarkdownTextStore.getState();
      setMarkdownText("### Markdown Text test");
    });
  });

  it("should render markdown text as HTML correctly", async () => {
    render(
      <MemoryRouter>
        <Preview />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Markdown Text test",
    );
  });
});
