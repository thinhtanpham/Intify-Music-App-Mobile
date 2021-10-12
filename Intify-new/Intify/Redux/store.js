import {combineReducers, createStore} from 'redux'
import isPlayingReducer from './Reducer/isPlayingReducer'

const store = combineReducers({
    isPlayingReducer
})

const rootStore= createStore(store)

export default rootStore