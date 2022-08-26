import React from "react";
import { useNavigate } from "react-router-dom";
import { DContext } from "../DreamContext";
import './Dream.css';

function Dream(props) {

    const { title, description, _id, handleDelete } = props;

    const {setEditing, setEditForm} = React.useContext(DContext);

    const navigate = useNavigate();

    const toggleEditing = () => {
        setEditing(true);
        setEditForm({
            title : title,
            description : description,
            _id : _id
        })
        navigate('/createdream');
    }

    return (
        <div className="dream-container">
            <div className="dream-data">
                <div className="dream-title-container">
                    <h3>{title}</h3>
                </div>

                <div className="dream-description-container">
                    <p>{description}</p>
                </div>
            </div>


            <div className="dream-btn-container">
                <hr/>
                <button onClick={toggleEditing}>edit</button>
                <button onClick={()=>handleDelete(_id)}>delete</button>
            </div>
        </div>
    )
}

export default Dream;