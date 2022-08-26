import React from "react";
import { DContext } from "../DreamContext";
import './CreateDream.css';
import { useNavigate } from "react-router-dom";

function CreateDream() {

    const navigate = useNavigate();
    const { createDream, editing, setEditing, setEditForm, editForm, editPost } = React.useContext(DContext);

    //form data
    const [formData, setFormData] = React.useState({
        title: "",
        description: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCreate = (e) => {
        e.preventDefault();
        createDream(formData)
            .then(res => res.json())
            .then(() => {
                navigate('/home');
            })
    }

    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditForm(prev=>({
            ...prev,
            [name] : value
        }))
    }

    const handleEditPost = (e) => {
        e.preventDefault();
        editPost(editForm._id, editForm).then(()=>{
            setEditing(false);
            setEditForm({
                title : '',
                description : '',
                _id : null
            })
            navigate('/home');
        })
    }

    return (
        <div className="create-dream-container">

            {
                editing === false ?

                    <div className="create-wrapper">

                        <h2>What was your dream?</h2>

                        <form className="create-form" onSubmit={handleCreate}>
                            <input name="title" onChange={handleChange} value={formData.title} placeholder="Title" required />
                            <textarea name="description" onChange={handleChange} value={formData.description} placeholder="Description" required />
                            <button>post dream</button>
                        </form>
                    </div>

                    :

                    <div className="create-wrapper">

                        <h2>Edit</h2>

                        <form className="create-form" onSubmit={handleEditPost}>
                            <input name="title" onChange={handleEditChange} value={editForm.title} placeholder="Title" required />
                            <textarea name="description" onChange={handleEditChange} value={editForm.description} placeholder="Description" required />
                            <button>update dream</button>
                        </form>
                    </div>
            }



        </div>
    )
}

export default CreateDream;