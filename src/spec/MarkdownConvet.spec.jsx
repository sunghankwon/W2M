import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import MarkdownConvert from "../components/MarkdownConvert";

import useDocxXmlStore from "../store/useDocxXml";
import useMarkdownTextStore from "../store/useMarkdownText";

const mockDocxXmlSetting = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document
  xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
  xmlns:w10="urn:schemas-microsoft-com:office:word"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
  xmlns:sl="http://schemas.openxmlformats.org/schemaLibrary/2006/main"
  xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"
  xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture"
  xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"
  xmlns:lc="http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas"
  xmlns:dgm="http://schemas.openxmlformats.org/drawingml/2006/diagram"
  xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
  xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
  xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
  xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml"
  ><w:background w:color="FFFFFF" /><w:body>`;
const mockDocxFilesData = {
  "word/_rels/document.xml.rels": "",
  "word/numbering.xml": "",
};

describe("MarkdownConvert component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MarkdownConvert />
      </MemoryRouter>,
    );
  });

  it("should convert headers to Markdown", async () => {
    await act(async () => {
      const mockDocxXmlData = `${mockDocxXmlSetting}
        <w:p>
          <w:pStyle w:val="Heading1"/>
          <w:t>Sample Heading 1</w:t>
        </w:p>
        <w:p>
          <w:pStyle w:val="Heading2"/>
          <w:t>Sample Heading 2</w:t>
        </w:p>
      </w:body
      ></w:document>`;

      const { setDocxXmlData, setDocxFilesData } = useDocxXmlStore.getState();

      setDocxXmlData(mockDocxXmlData);
      setDocxFilesData(mockDocxFilesData);
    });

    await waitFor(
      () => {
        const textareaElement = screen.getByRole("textbox");
        expect(textareaElement.value).toContain("# Sample Heading 1");
        expect(textareaElement.value).toContain("## Sample Heading 2");
      },
      { timeout: 1000 },
    );
  });

  it("should convert bold, italic to Markdown", async () => {
    await act(async () => {
      const mockDocxXmlData = `${mockDocxXmlSetting}
        <w:p>
          <w:r>
            <w:rPr>
              <w:b w:val="1" />
            </w:rPr>
            <w:t>Sample bold</w:t>
          </w:r>
        </w:p>
        <w:p>
        <w:r>
          <w:rPr>
            <w:i w:val="1" />
          </w:rPr>
          <w:t>Sample italic</w:t>
        </w:r>
      </w:p>
      </w:body
      ></w:document>`;

      const { setDocxXmlData, setDocxFilesData } = useDocxXmlStore.getState();

      setDocxXmlData(mockDocxXmlData);
      setDocxFilesData(mockDocxFilesData);
    });

    await waitFor(
      () => {
        const textareaElement = screen.getByRole("textbox");
        expect(textareaElement.value).toContain("**Sample bold**");
        expect(textareaElement.value).toContain("_Sample italic_");
      },
      { timeout: 1000 },
    );
  });

  it("should display provided text in the textarea", async () => {
    act(() => {
      const { setMarkdownText } = useMarkdownTextStore.getState();
      setMarkdownText("Markdown Text test");
    });

    await waitFor(
      () => {
        const textareaElement = screen.getByRole("textbox");
        expect(textareaElement.value).toContain("Markdown Text test");
      },
      { timeout: 1000 },
    );
  });
});
