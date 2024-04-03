import React from "react";
import { describe, it, expect } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import DocxUploader from "../components/DocxUploader";

describe("DocxUploader component tests", () => {
  it("should disable the convert button if no file is selected", async () => {
    render(
      <MemoryRouter>
        <DocxUploader />
      </MemoryRouter>,
    );

    const convertButton = screen.getByRole("button", { name: /convert/i });
    expect(convertButton).toBeDisabled();
  });

  it("should enable the convert button when a .docx file is uploaded", async () => {
    render(
      <MemoryRouter>
        <DocxUploader />
      </MemoryRouter>,
    );

    const fileInput = screen.getByLabelText(/choose word file/i);
    const file = new File(["test"], "test.docx", {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const convertButton = screen.getByRole("button", { name: /convert/i });
    expect(convertButton).not.toBeDisabled();
  });
});
