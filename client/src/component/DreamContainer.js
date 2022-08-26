import React from "react";
import { DContext } from "../DreamContext";
import Dream from './Dream';
import './DreamContainer.css';

function DreamContainer() {

    const { getPosts, user, deletePost } = React.useContext(DContext);
    const [dreamArr, setDreamArr] = React.useState([]);

    const handleGetPosts = () => {
        getPosts(user._id)
            .then(res => res.json())
            .then(res => {
                setDreamArr(res);
            })

    }

    const handleDelete = (id) => {
        deletePost(id)
            .then(res=>res.json())
                .then(res=>{
                    setDreamArr(prev=>{
                        const filteredArr = prev.filter(item=>item._id !== res._id);
                        return filteredArr;
                    })
                })
    }

    React.useEffect(() => {
        handleGetPosts()
    }, [])

    return (
        <div className="dream-post-container">
            <div className="dream-post-wrapper">

               
                    <h1>Dreams</h1>
                    <div>
                        {
                            dreamArr.map(dream => {
                                return <Dream
                                    key={dream._id}
                                    {...dream}
                                    handleDelete={handleDelete}
                                />
                            })
                        }
                    </div>
                

            </div>

        </div>
    )
}

export default DreamContainer;