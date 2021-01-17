import React from 'react'
import ReactDOM from 'react-dom'
import {App} from './App/App'
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {usersReducer, albumsReducer, photosReducer} from './reducers/rootReducer'


const store = createStore(combineReducers({
    usersReducer: usersReducer,
    albumsReducer: albumsReducer,
    photosReducer: photosReducer,
}))


ReactDOM.render(
    <Provider store={store}>
       <App></App>
    </Provider>,
    document.querySelector('#root')
)