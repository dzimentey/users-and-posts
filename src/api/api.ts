import axios from 'axios'
import {UsersType} from "../app/state/users-reducer";
import {PostsType} from "../app/state/filtered-posts-reducer";
import {CommentsType} from "../app/state/coments-reducer";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
})

// api
export const usersAPI = {
    getAllPosts() {
        return instance.get<PostsType>('posts')
    },
    getUsersForFilter() {
        return instance.get<UsersType>('users')
    },
    getPostsByUser(UserId :number) {
        return instance.get<PostsType>(`posts?userId=${UserId}`)
    },
    getComments(postId: number){
        return instance.get<CommentsType>(`posts/${postId}/comments`)
    },
}

