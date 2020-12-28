import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'
import { JokeAPI } from '../api/api'

const TOGGLE_FAVORITE_JOKE_LIST_MODE = 'TOGGLE_FAVORITE_JOKE_LIST_MODE'
const SET_CURRENT_JOKE = 'SET_CURRENT_JOKE'
const ADD_JOKE_IN_FAVORITE_JOKE_LIST = 'ADD_JOKE_IN_FAVORITE_JOKE_LIST'
const REMOVE_JOKE_IN_FAVORITE_JOKE_LIST = 'REMOVE_JOKE_IN_FAVORITE_JOKE_LIST'
const CLEAR_FAVORITE_JOKE_LIST = 'CLEAR_FAVORITE_JOKE_LIST'

export type CurrentJokeType = {
    id: string,
    value: string
} | null

type InitialStateType = {
    isFavoriteJokeListOpen: boolean
    currentJoke: CurrentJokeType
    favoriteJokeList: Array<CurrentJokeType> | []
}

const initialState: InitialStateType = {
    isFavoriteJokeListOpen: false,
    currentJoke: null,
    favoriteJokeList: []
}

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case TOGGLE_FAVORITE_JOKE_LIST_MODE:
            return {
                ...state,
                isFavoriteJokeListOpen: !state.isFavoriteJokeListOpen
            }
        case SET_CURRENT_JOKE:
            return {
                ...state,
                currentJoke: { id: action.id, value: action.value }
            }
        case ADD_JOKE_IN_FAVORITE_JOKE_LIST:
            let arr = [...state.favoriteJokeList]
            if (arr.length >= 10) {
                arr.unshift(state.currentJoke)
                arr.pop()
            } else {
                arr = [state.currentJoke, ...state.favoriteJokeList]
            }
            return {
                ...state,
                favoriteJokeList: [...arr]
            }
        case REMOVE_JOKE_IN_FAVORITE_JOKE_LIST:
            return {
                ...state,
                favoriteJokeList: state.favoriteJokeList.filter(elem => elem?.id !== action.joke?.id)
            }
        case CLEAR_FAVORITE_JOKE_LIST:
            return {
                ...state,
                favoriteJokeList: []
            }
        default:
            return state
    }
}

// --------------------------------
type ActionsTypes = ToggleFavoriteJokeListActionType | SetCurrentJokeActionType |
    AddJokeInFavoriteListActionType | RemoveJokeInFavoriteListActionType | ClearFavoriteJokeListActionType
// -----------ACTION---------------
type ToggleFavoriteJokeListActionType = {
    type: typeof TOGGLE_FAVORITE_JOKE_LIST_MODE,
}
export const toggleFavoriteJokeList = (): ToggleFavoriteJokeListActionType => ({ type: TOGGLE_FAVORITE_JOKE_LIST_MODE })

type SetCurrentJokeActionType = {
    type: typeof SET_CURRENT_JOKE,
    value: string,
    id: string
}
export const setCurrentJoke = (value: string, id: string): SetCurrentJokeActionType => ({ type: SET_CURRENT_JOKE, value, id })

type AddJokeInFavoriteListActionType = {
    type: typeof ADD_JOKE_IN_FAVORITE_JOKE_LIST,
}
export const addJokeInFavoriteList = (): AddJokeInFavoriteListActionType => ({ type: ADD_JOKE_IN_FAVORITE_JOKE_LIST })

type ClearFavoriteJokeListActionType = {
    type: typeof CLEAR_FAVORITE_JOKE_LIST,
}
export const clearFavoriteJokeList = (): ClearFavoriteJokeListActionType => ({ type: CLEAR_FAVORITE_JOKE_LIST })

type RemoveJokeInFavoriteListActionType = {
    type: typeof REMOVE_JOKE_IN_FAVORITE_JOKE_LIST,
    joke: CurrentJokeType
}
export const removeJokeInFavoriteList = (joke: CurrentJokeType): RemoveJokeInFavoriteListActionType => ({ type: REMOVE_JOKE_IN_FAVORITE_JOKE_LIST, joke })
// --------------------------------
// Thunk creater
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
// --------------------------------
export const giveJokeTC = (): ThunkType => async (dispatch: any) => {
    let data = await JokeAPI.giveMeJoke()
    if (data.resultCode === 0) {
        alert('thunk api')
    } else {
        dispatch(setCurrentJoke(data.value, data.id))
    }
}
// export const RemoveOrAddJokeInFavoriteJokeListTC = (): ThunkType => async (dispatch: any, getState) => {
//     let state = getState()
//     if (state.app.favoriteJokeList.length === 0 || state.app.favoriteJokeList.some(elem =>
//         elem?.id != state.app.currentJoke?.id)) {
//         dispatch(addJokeInFavoriteList())
//     } else {
//         dispatch(removeJokeInFavoriteList())
//     }
// }

export default appReducer