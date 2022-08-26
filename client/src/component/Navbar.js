import React from "react";
import {Link} from "react-router-dom";
import { DContext } from "../DreamContext";
import './Navbar.css';

function Navbar(){

    const {logout, resetEditing} = React.useContext(DContext);



    return (
        <div className="navbar-container">

            <div className="navbar-wrapper">

               

                <div className="links">
                    <Link to='/home' onClick={resetEditing} className="title"><h2>Dream Journal</h2></Link> 
                    <Link to="/home" onClick={resetEditing}>Home</Link>
                    <Link to="/createdream">Create Dream</Link>
                </div>

                <div className="logout-btn-container">
                    <button onClick={logout}>logout</button>
                </div>
            </div>

        </div>
    )
}

export default Navbar;