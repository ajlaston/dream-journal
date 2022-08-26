import React from "react";
import axios from 'axios';

const DContext = React.createContext();

const userAxios = axios.create();
userAxios.interceptors.request.use(config => {
    const {token} = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

function DreamContext(props) {

    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || "",
        errMsg: ""
    }

    const [userState, setUserState] = React.useState(initState);
    const [editing, setEditing] = React.useState(false);

    const [editForm, setEditForm] = React.useState({
        title : "",
        description : "",
        _id : null
    })

    const handleFetch = ({path,method, body}) => {
        return fetch(path, {
            method : method,

            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`,
                'Content-Type' : 'application/json'
            },

            body : body
        })
    }

    //signup function 
    const signup = (credentials) => {
        return axios.post('/auth/signup', credentials)
            .then(res => {
                const { user, token } = res.data;
                //set signup data to local storage 
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);

                setUserState(prev => ({
                    ...prev,
                    token,
                    user
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    const login = (credentials) => {
        return axios.post('/auth/login', credentials)
            .then(res => {
                const { user, token } = res.data;

                //set signup data to local storage 
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token);

                setUserState(prev => ({
                    ...prev,
                    token,
                    user
                }))
            })
            .catch(err => handleAuthError(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({
            user: {},
            token: "",
            errMsg: ""
        });
    }

    //create dream and post to db
    const createDream = (dreamForm) => {
        return handleFetch({
            path :'/api/post',
            method : 'post',
            body : JSON.stringify(dreamForm)
        })
    }

    //get all posts for the current user from db
    const getPosts = (userId) => {
        return handleFetch({
            path : `/api/post/all/${userId}`,
            method : 'get'
        })
    }

    const deletePost = (postId) => {
        return handleFetch({
            path : `/api/post/${postId}`,
            method : 'delete'
        })
    }

    const editPost = (postId, data) => {
        return handleFetch({
            path : `/api/post/${postId}`,
            method : 'put',
            body : JSON.stringify(data)
        })
    }

    const resetEditing = () => {
        setEditing(false);
        setEditForm({
            title : '',
            description : '',
            _id : null
        })
    }

    function handleAuthError(errMsg) {
        setUserState(prev => ({
            ...prev,
            errMsg
        }))
    }

    function resetAuthError() {
        setUserState(prev => ({
            ...prev,
            errMsg: ""
        }))
    }

    const app = {
        ...userState,
        signup,
        login,
        logout,
        getPosts,
        deletePost,
        createDream,
        resetAuthError,

        editing,
        setEditing,

        editForm,
        setEditForm,
        editPost,

        resetEditing
    }

    return (
        <DContext.Provider value={app}>
            {props.children}
        </DContext.Provider>
    )
}

export { DreamContext as DreamProvider, DContext}