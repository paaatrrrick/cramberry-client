import React, { useState, useRef, useEffect } from "react";
import "../styles/upload.css"
import CONSTANTS from "../constants";
import uploadImage from "../images/upload.svg";

const endIndSuffixs = ["mov", "mp4", "pdf", "MOV", "MP4", "PDF"];


function Upload() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFiles2, setSelectedFiles2] = useState([]);
    const [title, setTitle] = useState("");
    const [badUpload, setBadUpload] = useState(false);
    const inputFileRef = useRef(null);





    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    const helper = () => {
        console.log('creating helper');
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
            {
                cloudName: "dlk3ezbal",
                uploadPreset: "cramberry",
                sources: ["local", "url", "image_search"],
            }, function (error, result) {
                if (result) {
                    if (result.info) {
                        if (result.info.files) {
                            result.info.files.map((file) => {
                                if (file.uploadInfo) {
                                    const type = ((file.uploadInfo.format === "pdf") ? "pdf" : "video");
                                    const data = [{ file: file.uploadInfo.secure_url, type: type, id: selectedFiles2.length + 1 }];
                                    console.log('adding!!');
                                    console.log(data);
                                    const tempSelectedFiles2 = [...selectedFiles2];
                                    tempSelectedFiles2.push(data);
                                    setSelectedFiles2(tempSelectedFiles2);
                                }
                            });
                        }
                    }
                }
                console.log(selectedFiles2);
            });
    }

    helper();

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
        console.log(selectedFiles2);
        const data = {
            title: title,
            files: selectedFiles2
        }
        console.log('handling submit!!');
        console.log(data);
        const response = await fetch(CONSTANTS.API_ENDPOINT + CONSTANTS.SEND_DATA, {
            method: 'POST',
            headers: {
                "x-access'cramberry-auth-token": window.localStorage.getItem(CONSTANTS.TOKEN),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
                {selectedFiles.map((file, i) => {
                    return (
                        <div key={`${i}-${file.name}`} className="file">
                            <span>{((file.name.length < 21) ? file.name : `${file.name.substr(0, 20)} ...`)}</span>
                            <button onClick={() => { handleDelete(file) }}>x</button>
                        </div>
                    );
                })}
                {badUpload && <div className="file">Unsupported File Type</div>}
                <div className="upload-div" onClick={() => { widgetRef.current.open() }} >
                    <img src={uploadImage} alt="Upload Image" />
                </div >
            </div>
            <button className="submitButton" value="Submit" onClick={handleSubmit} >Submit</button>
        </div>
    );
}

export default Upload;





