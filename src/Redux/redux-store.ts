import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import { save, load } from "redux-localstorage-simple"
import appReducer from './appReducer'
import thunkMiddleware from 'redux-thunk'

let reducers = combineReducers({
    app: appReducer
})

type ReducersType = typeof reducers
export type AppStateType = ReturnType<ReducersType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers,
        load({ states: ['app.favoriteJokeList'] }),
        composeEnhancers(applyMiddleware(thunkMiddleware,
        save({ states: ['app.favoriteJokeList'] })
    ))
)

// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
//@ts-ignore
window.store = store

export default store

