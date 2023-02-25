import React, { useState, useRef } from "react";
import "../styles/upload.css"
import CONSTANTS from "../constants";

const endIndSuffixs = ["mov", "mp4", "pdf", "MOV", "MP4", "PDF"];


function Upload() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [title, setTitle] = useState("");
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
                    if (fileExt === "PDF") {
                        fileExt = "pdf";
                    } else if (fileExt === "MOV") {
                        fileExt = "mov";
                    } else if (fileExt === "MP4") {
                        fileExt = "mp4";
                    }
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
        let newSelectedFiles = [...selectedFiles];
        newSelectedFiles = newSelectedFiles.filter((f) => {
            return f.name !== file.name;
        });
        setSelectedFiles(newSelectedFiles);
    };

    const handleSubmit = async () => {
        console.log('handleSubmit');
        let formData = new FormData();
        const data = []
        selectedFiles.forEach((file) => {
            const message = {
                "type": file.ext,
                "file": file
            }
            data.push(message);
        });
        formData.append("title", title);
        formData.append("files", data);
        const response = await fetch(CONSTANTS.API_ENDPOINT + CONSTANTS.SEND_DATA, {
            method: 'POST',
            headers: {
                "x-access'cramberry-auth-token": window.localStorage.getItem(CONSTANTS.TOKEN)
            },
            body: formData
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <h1>Upload</h1>
            <input type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <input type="file" id="selectedFile" ref={inputFileRef} onChange={handleFileInputChange} multiple />
            <input type="button" value="Browse..." onClick={() => { inputFileRef.current.click() }} />
            {selectedFiles.map((file, i) => {
                return (
                    <div key={`${i}-${file.name}`} className="file">
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





