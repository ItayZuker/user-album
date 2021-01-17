import React, {useState} from 'react'
import {NewAlbum} from './NewAlbum/NewAlbum'
import {useSelector} from 'react-redux'
import { useEffect } from 'react/cjs/react.development'
import './add-album.scss'

export function AddAlbum() {


    let [user, setUser] = useState({})
    let [addUser, setAddUser] = useState(false)
    const selectedUser = useSelector(state => state.usersReducer.selectedUser)


    useEffect(() => {
        if (selectedUser === undefined) return
        setUser(selectedUser)
    }, [selectedUser])


    function addAlbum() {
        if (selectedUser.id === undefined) return
        setAddUser(true)
    }


    return <div className='add-album-container'>
        <h2>{user.name}</h2>
        <div
            className='add-album'
            onClick={addAlbum}
            >+</div>
        <NewAlbum
            addUser={addUser}
            setAddUser={setAddUser}
            ></NewAlbum>
    </div>
}