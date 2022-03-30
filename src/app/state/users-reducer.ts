import {Dispatch} from "redux";
import {usersAPI} from "../../api/api";
import {AxiosError} from "axios";

type User = {
    id: number
    name: string
    username: string
    email: string
    isChecked: boolean
}

export type UsersType = Array<User>
export type getUsersACType = ReturnType<typeof getUsersAC> | ReturnType<typeof changeUserStatusAC> | ReturnType<typeof getLocalUsersAC>
type ActionsType = getUsersACType

export const usersReducer = (state: UsersType = [], action: ActionsType): UsersType => {
    switch (action.type) {
        case "USERS/GET-USERS":
            return action.users.map(u => ({...u, isChecked: false}))
        case "USERS/CHANGE-USER-STATUS":
            return state.map(u => u.id === action.id ? {...u,  isChecked: action.isChecked} : u)
        case "USERS/GET-LOCAL-USERS":
            return [...action.users]
        default:
            return state
    }
}

//Action Creator

export const getUsersAC = (users: UsersType) => ({type: 'USERS/GET-USERS', users}) as const
export const changeUserStatusAC = (id: number, isChecked: boolean) => ({type: 'USERS/CHANGE-USER-STATUS', id, isChecked}) as const
export const getLocalUsersAC = (users: UsersType) => ({type: 'USERS/GET-LOCAL-USERS', users}) as const
//Thunk

export const getUsersTC = () => (dispatch: Dispatch) => {
    usersAPI.getUsersForFilter()
        .then((res)  => {
            dispatch(getUsersAC(res.data))
        })
        .catch((error: AxiosError) => {
                console.log(error.message)
            }
        )
}