import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {Post} from "./all-posts-reducer";

export type PostsType = Array<Post>
type ActionsType = ReturnType<typeof getFilteredPostsAC> | ReturnType<typeof removePostsAC>

export const filteredPostsReducer = (state: PostsType = [], action: ActionsType): PostsType => {
    switch (action.type) {
        case "FILTERED-POSTS/GET-POSTS-BY-USER":
            return [...state, ...action.posts]
        case "FILTERED-POSTS/REMOVE-POSTS-BY-USER":
            return state.filter(post => post.userId !== action.userId)
        default:
            return state
    }
}

//AC creator

export const getFilteredPostsAC = (posts: PostsType) => ({type: 'FILTERED-POSTS/GET-POSTS-BY-USER', posts}) as const
export const removePostsAC = (userId: number) => ({type: 'FILTERED-POSTS/REMOVE-POSTS-BY-USER', userId}) as const

//Thunk

export const getFilteredPostsTC = (UserId :number ) => (dispatch: Dispatch) => {
    usersAPI.getPostsByUser(UserId)
        .then((res) => {
            dispatch(getFilteredPostsAC(res.data))
        })
        .catch(error => {
                console.log(error)
            }
        )
}