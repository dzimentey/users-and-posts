import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";

export type Comment = {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export type CommentsType = Array<Comment>
type ActionsType = ReturnType<typeof getCommentsAC>

export const commentsReducer = (state: CommentsType = [], action: ActionsType): CommentsType => {
    switch (action.type) {
        case "COMMENTS/GET-COMMENTS" :
            return [ ...action.comments]
        default:
            return state
    }
}

//AC creator

export const getCommentsAC = (comments: CommentsType) => ({type: 'COMMENTS/GET-COMMENTS', comments}) as const

//Thunk

export const getCommentsTC = (postId: number) => (dispatch: Dispatch) => {
    usersAPI.getComments(postId)
        .then((res) => {
            dispatch(getCommentsAC(res.data))
        })
        .catch((error) => {
                console.log(error)
            }
        )
}