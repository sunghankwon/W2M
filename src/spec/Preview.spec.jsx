import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Preview from "../components/Preview";
import useMarkdownTextStore from "../store/useMarkdownText";

const previewRender = () => {
  render(
    <MemoryRouter>
      <Preview />
    </MemoryRouter>,
  );
};

describe("Preview Component tests", () => {
  beforeEach(async () => {
    act(() => {
      const { setMarkdownText } = useMarkdownTextStore.getState();
      setMarkdownText(
        `### Markdown Text test\n![Image](./word/media/image2.jpg)`,
      );
    });
  });

  it("should render markdown text as HTML correctly", async () => {
    previewRender();

    expect(await screen.findByRole("heading", { level: 3 })).toHaveTextContent(
      "Markdown Text test",
    );
  });

  it("should display a specific message for relative image paths", async () => {
    previewRender();

    expect(
      await screen.findByText("프리뷰를 위해 표시된 이미지입니다."),
    ).toBeInTheDocument();
  });
});
