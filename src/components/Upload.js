import React, { useState, useRef } from "react";
import "../styles/upload.css"
import CONSTANTS from "../constants";
import uploadImage from "../images/upload.svg";

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
        let formData = new FormData();
        console.log(selectedFiles);
        selectedFiles.forEach((file, i) => {
            formData.append(`file`, file);
        });
        formData.append(`title`, title);
        setTitle("");
        setSelectedFiles([]);
        setBadUpload(false);
        console.log(formData);
        const response = await fetch(CONSTANTS.API_ENDPOINT + CONSTANTS.SEND_DATA, {
            method: 'POST',
            headers: {
                "x-access'cramberry-auth-token": window.localStorage.getItem(CONSTANTS.TOKEN),
                // "Content-Type": "multipart/form-data",
            },
            body: formData
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <div className="Upload">
            <div className="upload-top">
                <h1>Upload PDFs and Videos</h1>
                <input id="upload-text" type="text" placeholder="Name your summary" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                <input type="file" id="selectedFile" ref={inputFileRef} onChange={handleFileInputChange} multiple />
                <div className="upload-div" onClick={() => { inputFileRef.current.click() }} >
                    <img src={uploadImage} alt="Upload Image" />
                </div>
                {selectedFiles.map((file, i) => {
                    return (
                        <div key={`${i}-${file.name}`} className="file">
                            <span>{((file.name.length < 21) ? file.name : `${file.name.substr(0, 20)} ...`)}</span>
                            <button onClick={() => { handleDelete(file) }}>x</button>
                        </div>
                    );
                })}
                {badUpload && <div className="file">Unsupported File Type</div>}
            </div>
            <button className="submitButton" value="Submit" onClick={handleSubmit} >Submit</button>
        </div>
    );
}

export default Upload;





