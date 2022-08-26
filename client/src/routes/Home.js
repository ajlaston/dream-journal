import React from "react";
import DreamContainer from "../component/DreamContainer";
import { DContext } from "../DreamContext";
import './Home.css';

function Home(props) {

    const {user} = props;

    React.useState(()=>{
        //clears edit state
        
    }, [])

    return (
        <div className="home-container">
            <h2>hi @{user.username}</h2>
            <div className="dreams">
                <DreamContainer />
            </div>
        </div>
    )
}

export default Home;