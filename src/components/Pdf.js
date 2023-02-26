import React from 'react';
import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import offer from '../files/offer.pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function Pdf(props) {
    console.log(props.file.locat);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(props.file.location);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function nextPage() {
        setPageNumber(pageNumber + 1);
    }
    function prevPage() {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }
    return (
        <div className='pdf-view'>
            <button className='moveBtn moveBtnLeft' onClick={prevPage}>back</button>
            <button className='moveBtn moveBtnRight' onClick={nextPage}>Next</button>
            <Document
                file={offer}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={console.error}
                className="pdf-document"
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p></p>
        </div>
    );
}