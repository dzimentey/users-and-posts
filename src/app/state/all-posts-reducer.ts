import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {AxiosError} from "axios";

export type Post = {
    userId: number
    id: number
    title: string
    body: string
    comments: string
}

export type PostsType = Array<Post>
type ActionsType = ReturnType<typeof getAllPostsAC>

export const allPostsReducer = (state: PostsType = [], action: ActionsType): PostsType => {
    switch (action.type) {
        case "ALL-POSTS/GET-POSTS":
            return [...action.posts]
        default:
            return state
    }
}

//AC creator

export const getAllPostsAC = (posts: PostsType) => ({type: 'ALL-POSTS/GET-POSTS', posts}) as const

//Thunk

export const getAllPostsTC = () => (dispatch: Dispatch) => {
    usersAPI.getAllPosts()
        .then((res) => {
            dispatch(getAllPostsAC(res.data))
        })
        .catch((error: AxiosError)=> {
                console.log(error.message)
            }
        )
}