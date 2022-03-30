import React, {ChangeEvent, useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeUserStatusAC, getLocalUsersAC, getUsersTC, UsersType} from "./state/users-reducer";
import {PostsType} from "./state/all-posts-reducer";
import {getFilteredPostsTC, removePostsAC} from "./state/filtered-posts-reducer";
import {CommentsType, getCommentsTC} from "./state/coments-reducer";
import {debounce} from "@mui/material";


function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (localStorage.getItem('localUsers') !== null) {
            getFromLocal()
        } else {
            dispatch(getUsersTC())
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('localUsers', JSON.stringify(users))
    })

    const users = useSelector<AppRootStateType, UsersType>(state => state.users)
    //const allPosts = useSelector<AppRootStateType, PostsType>(state => state.allPosts)
    const filteredPosts = useSelector<AppRootStateType, PostsType>(state => state.filteredPosts)
    const comments = useSelector<AppRootStateType, CommentsType>(state => state.comments)

    const getPostsByUser = debounce((id: number, isChecked: boolean) => {
        if (!isChecked) {
            dispatch(removePostsAC(id))
            dispatch(changeUserStatusAC(id, isChecked))
        }
        else {
            dispatch(getFilteredPostsTC(id))
            dispatch(changeUserStatusAC(id, isChecked))
        }
    }, 300)

    const showCommentsHandler = debounce((postId: number) => {
             dispatch(getCommentsTC(postId))
    }, 300)

    const getFromLocal = () => {
        const localUsersJSON = localStorage.getItem('localUsers')
        if (localUsersJSON) {
            const localUsers: UsersType = JSON.parse(localUsersJSON)
            dispatch(getLocalUsersAC(localUsers))
            localUsers.forEach(u => u.isChecked && dispatch(getFilteredPostsTC(u.id)))
        }
    }

    return (
        <div className="App">
            <div className={'mainBlock'}>
                <div className={'postsBlock'}>

                    {filteredPosts.map(post => {
                        const onClickHandler = () => showCommentsHandler(post.id)

                        return(
                            <div key={post.id}>
                                <li>{post.title}</li>
                                <div style={{background: 'lightblue'}}>
                                    {post.body}
                                </div>
                                <button onClick={onClickHandler}>expand</button>
                                    <div style={{background: 'lightgray'}}>
                                    {comments.map(c => c.postId === post.id ? <p key={c.id}> {c.id} {c.body}</p> : '')}
                                    </div>
                            </div>
                        )
                    })}
                </div>

                <div className={'selectBlock'} >
                    <div className={'selectTitle'} >Select users to view their posts</div>
                    <div className={'selectBody'} >
                        {users.map(u => {
                            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                let newIsChecked = e.currentTarget.checked
                                getPostsByUser(u.id, newIsChecked)
                            }

                            return (
                                <div key={u.id}>
                                    <input type="checkbox" onChange={onChangeHandler} checked={u.isChecked}/>
                                    {u.name}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
