import React, { useState, useEffect } from "react";
import "../styles/highlevel.css"
import CONSTANTS from "../constants";
import { highLevelSummaries } from "../fakedata";
import { Redirect, Link } from 'react-router-dom';


const HighLevel = () => {

    const [summary, setSummary] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        setSummary(highLevelSummaries);
        fetch(`${CONSTANTS.API_ENDPOINT}${CONSTANTS.SUMMARY}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            //read the response and set the token
            .then(async (response) => {
                const data = await response.json();
                if (response.ok) {
                    console.log('ok response');
                    setSummary(data);
                }
            })
    }, []);

    return (
        <div className="Highlevel">
            <h1>Previous Learning Journeys</h1>
            {summary.map((item, i) => {
                return (
                    <Link className="loginRight" to={`summary/${item.id}`} id="login" key={`${i}-${item.title}`}>{item.title}</Link>
                )
            })
            }
        </div>
    );
}

export default HighLevel;