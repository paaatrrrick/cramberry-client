import Upload from '../components/Upload';
import Highlevel from '../components/Highlevel';
import "../styles/Dashboard.css";
import logo from '../images/logo.png';
import { Redirect, Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="Dashboard">
            <div className="logoDiv">
                <div className="logoDivLeft">
                    <img src={logo} alt="logo" />
                    <h4>cramberry</h4>
                </div>
                <Link className="buttonRight" to="/" id="login">Home</Link>
            </div>
            <div className="Dashboard-conent">
                <h1>Lets get started!</h1>
                <div className="Dashboard-leftandRight">
                    <Upload />
                    <Highlevel />
                </div>
            </div>
        </div>
    );
}


export default Dashboard;
