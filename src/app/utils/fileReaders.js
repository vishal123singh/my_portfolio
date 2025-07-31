// fileReaders.js
import * as Papa from "papaparse";
//import * as pdfjsLib from "pdfjs-dist";
import * as mammoth from "mammoth";

// ✅ Use the PDF.js version to get the correct worker from CDN
//pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

/**
 * TXT Reader
 */
export const readTXT = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
};

/**
 * CSV Reader
 */
export const readCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => resolve(JSON.stringify(results.data, null, 2)),
      error: (error) =>
        reject(new Error(`CSV parsing error: ${error.message}`)),
    });
  });
};

/**
 * PDF Reader using pdfjs-dist
 */
export const readPDF = async (file) => {
  // const arrayBuffer = await file.arrayBuffer();
  // const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  // let content = "";
  // for (let i = 1; i <= pdf.numPages; i++) {
  //   const page = await pdf.getPage(i);
  //   const textContent = await page.getTextContent();
  //   const pageText = textContent.items.map((item) => item.str).join(" ");
  //   content += `\n\n[Page ${i}]\n${pageText}`;
  // }

  // return content.trim();
  return "";
};

/**
 * DOCX Reader using mammoth
 */
export const readDOCX = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
};

/**
 * General Dispatcher
 */
export const readFileContent = async (file) => {
  switch (file.type) {
    case "application/pdf":
      return await readPDF(file);
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return await readDOCX(file);
    case "text/plain":
      return await readTXT(file);
    case "text/csv":
    case "application/vnd.ms-excel":
      return await readCSV(file);
    default:
      throw new Error(`Unsupported file type: ${file.type}`);
  }
};
