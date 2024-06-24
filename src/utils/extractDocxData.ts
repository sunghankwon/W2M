import JSZip from "jszip";

interface DocxFileData {
  [key: string]: string | Blob;
}

interface ExtractedDocxData {
  xmlData: string;
  docxFilesData: DocxFileData;
}

const extractDocxData = async (file: Blob): Promise<ExtractedDocxData> => {
  const zip = await JSZip.loadAsync(file);
  const xmlData = await zip.file("word/document.xml")!.async("string");

  const docxFilesDataPromises: Promise<{
    key: string;
    value: string | Blob;
  }>[] = [];

  zip.forEach((relativePath, file) => {
    if (!file.dir) {
      let asyncType: "string" | "blob" = "string";
      if (relativePath.startsWith("word/media/")) {
        asyncType = "blob";
      }
      docxFilesDataPromises.push(
        file.async(asyncType).then((content) => {
          return { key: relativePath, value: content };
        }),
      );
    }
  });

  const results = await Promise.all(docxFilesDataPromises);
  const docxFilesData: DocxFileData = {};
  results.forEach(({ key, value }) => {
    docxFilesData[key] = value;
  });

  return { xmlData, docxFilesData };
};

export default extractDocxData;
