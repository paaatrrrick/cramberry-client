import pdfjs from "pdfjs-dist";


const pdfToText = (file) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
        const typedArray = new Uint8Array(event.target.result);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        const page = await pdf.getPage(1);
        const textContent = await page.getTextContent();
        const text = textContent.items.map((item) => item.str).join("");
        console.log(text);
    };
    reader.readAsArrayBuffer(file);
};

const docxToText = () => {

};

const movToAudio = () => {

};
export { pdfToText, docxToText, movToAudio };