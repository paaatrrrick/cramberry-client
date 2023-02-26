import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// import * as ReactDOM from 'react-dom';
// import * as React from 'react';
// import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, Annotation, TextSearch, FormFields, FormDesigner, Inject } from '@syncfusion/ej2-react-pdfviewer';
// export function App() {
//   return (<div>
//     <div className='control-section'>
//       <PdfViewerComponent id="container" documentPath="PDF_Succinctly.pdf" serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer" style={{ 'height': '640px' }}>
//         <Inject services={[Toolbar, Magnification, Navigation, Annotation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, FormFields, FormDesigner]} />
//       </PdfViewerComponent>
//     </div>
//   </div>);
// }
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);