import Upload from '../components/Upload';
import Highlevel from '../components/Highlevel';
const Dashboard = () => {
    console.log('at dashboard.js');
    return (
        <div className="Dashboard">
            <h1>Dashboard</h1>
            <Upload />
            <Highlevel />
        </div>
    );
}


export default Dashboard;
