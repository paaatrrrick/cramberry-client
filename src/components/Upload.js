import React, { useState, useRef } from "react";
import "../styles/upload.css"
import { pdfToText } from "../methods/dataSwitch.js"

const endIndSuffixs = ["mov", "mp4", "pdf", "docx"];


function Upload() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [badUpload, setBadUpload] = useState(false);
    const inputFileRef = useRef(null);

    const handleFileInputChange = (event) => {
        setBadUpload(false);
        let files = event.target.files;
        let newSelectedFiles = [...selectedFiles];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            try {
                let fileExt = file.name.split('.').pop();
                if (endIndSuffixs.includes(fileExt)) {
                    file["ext"] = fileExt;
                    newSelectedFiles.push(file);
                } else {
                    setBadUpload(true);
                }
            }
            catch (e) {
                setBadUpload(true);
            }
        }
        setSelectedFiles(newSelectedFiles);
        inputFileRef.current.value = "";
    };

    const handleDelete = (file) => {
        const newSelectedFiles = selectedFiles.filter((f) => f.name !== file.name);
        setSelectedFiles(newSelectedFiles);
    };

    const handleSubmit = () => {
        console.log('handleSubmit');
        const data = new FormData();
        selectedFiles.forEach((file) => {
            console.log(file)
            let type;
            let value;
            if (file.ext === "pdf") {
                console.log('here');
                console.log(file);
                type = "text";
                value = pdfToText(file);
            }
            data.append("file", file);
        });

    };

    return (
        <div>
            <input type="file" id="selectedFile" ref={inputFileRef} onChange={handleFileInputChange} multiple />
            <input type="button" value="Browse..." onClick={() => { inputFileRef.current.click() }} />
            {selectedFiles.map((file, i) => {
                return (
                    <div key={i} className="file">
                        <span>{((file.name.length < 21) ? file.name : `${file.name.substr(0, 20)} ...`)}</span>
                        <button onClick={() => { handleDelete(file) }}>Delete</button>
                    </div>
                );
            })}
            {badUpload && <div className="error">Unsupported File Type</div>}
            <input type="button" value="Submit" onClick={handleSubmit} />
        </div>
    );
}

export default Upload;