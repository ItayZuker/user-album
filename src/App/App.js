import React, {useEffect} from 'react'
import axios from 'axios'
import {Right} from './Right/Right'
import {Left} from './Left/Left'
import {useDispatch, useSelector} from 'react-redux'
import './app.scss'

export function App() {


    const dispatch = useDispatch()


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(res => dispatch({type: 'INIT_USERS', usersArray: res.data}))
    }, [])

    
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/albums')
            .then(res => dispatch({type: 'INIT_ALBUMS', albumsArray: res.data}))
    }, [])


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then(res => dispatch({type: 'INIT_PHOTOS', photosArray: res.data}))
    }, [])


    return <div className='app-container'>
        <Left></Left>
        <div className='center-line'></div>
        <Right></Right>
    </div>
}