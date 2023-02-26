import { useEffect, useState, useRef } from 'react';
import video from "../files/wortuneVid.mp4";
const Video = (props) => {

    const [file, setFile] = useState(null);
    const [location, setLocation] = useState(null);
    const videoRef = useRef(null);
    console.log(props.identifyer);

    useEffect(() => {
        setFile(props.file.file);
        setLocation(props.file.location);
    }, []);

    const videoLoaded = () => {
        videoRef.current.currentTime = location;
    }
    return (
        <video className="video" onLoadStart={() => { videoLoaded() }} ref={videoRef} controls>
            <source src={video} type="video/mp4" />
        </video>
    );
}

export default Video;