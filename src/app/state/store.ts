import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import {usersReducer} from "./users-reducer";
import {allPostsReducer} from "./all-posts-reducer";
import {filteredPostsReducer} from "./filtered-posts-reducer";
import {commentsReducer} from "./coments-reducer";

const rootReducer = combineReducers({
    users: usersReducer,
    allPosts: allPostsReducer,
    filteredPosts: filteredPostsReducer,
    comments: commentsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

