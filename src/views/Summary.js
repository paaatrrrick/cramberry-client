import { useState, useEffect } from "react";
import { summairesAndFiles } from "../fakedata";
import CONSTANTS from "../constants";
import Pdf from "../components/Pdf";
import Video from "../components/Video";
import "../styles/Summary.css"
import logo from '../images/logo.png';
import { Redirect, Link } from 'react-router-dom';



const activated = "activated";

const Summary = (props) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [summary, setSummary] = useState([]);
    const [activeFile, setActiveFile] = useState(null);
    const [activeFileType, setActiveFileType] = useState(null);
    const [fileId, setFileId] = useState(null);


    const getSummary = async () => {
        const response = await fetch(CONSTANTS.API_ENDPOINT + CONSTANTS.SUMMARY_BY_ID + props.match.params.id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-access'cramberry-auth-token": window.localStorage.getItem(CONSTANTS.TOKEN)
            },
        });
        const data = await response.json();
    }

    useEffect(() => {
        console.log(props);
        console.log(props.match.params.id);

        // const data = getSummary();

        try {
            const data = summairesAndFiles[props.match.params.id]
            const summary = data.summary;
            const title = data.title;
            setTitle(title);
            setSummary(summary);
            setLoading(false);
        } catch {
            console.log('error');
        }
    }, []);

    const learnMoreClicked = (e, item, id) => {
        const activatedElements = document.getElementsByClassName(activated);
        for (let i = 0; i < activatedElements.length; i++) {
            activatedElements[i].classList.remove(activated);
        }
        e.target.classList.add(activated);
        setActiveFileType(item.type);
        setActiveFile(item);
        setFileId(id);
    }


    return (
        <div className="Summary">
            <div className="logoDiv">
                <div className="logoDivLeft">
                    <img src={logo} alt="logo" />
                    <h4>cramberry</h4>
                </div>
                <Link className="buttonRight" to="/dashboard" id="login">Back</Link>
            </div>
            <div className="left-side">
                {(loading) ?
                    <h1>Loading...</h1> :
                    <div>
                        <h1>{title}</h1>
                        <div className="summary-text">
                            {summary.map((item, index) => {
                                return (
                                    <span key={index} onClick={(e) => learnMoreClicked(e, item, index)}>{item.text}</span>
                                )
                            })
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="right-side">
                {(activeFile) ?
                    <div className="right-side-filler">
                        {(activeFileType === 'pdf') ?
                            <Pdf identifyer={fileId} file={activeFile} />
                            :
                            <Video identifyer={fileId} file={activeFile} />
                        }
                    </div>
                    :
                    <div>No File Selected</div>
                }
            </div>
        </div>
    )
}

export default Summary;