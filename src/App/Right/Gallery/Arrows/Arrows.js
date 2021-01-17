import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './arrows.scss'

export function Arrows() {


    let [selectedAlbum, setSelectedAlbum] = useState(0)
    const userAlbums = useSelector(state => state.albumsReducer.userAlbums)
    const selectedUser = useSelector(state => state.usersReducer.selectedUser)
    const dispatch = useDispatch()
    

    useEffect(() => {
        if (userAlbums.length === 0) return
        setSelectedAlbum(selectedAlbum = 0)
    }, [selectedUser])


    function rightArrowClick() {
        if (userAlbums.length <= 1) return
        if (selectedAlbum === userAlbums.length - 1) {
            setSelectedAlbum(selectedAlbum = 0)
            dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[0].id})
        } else {
            setSelectedAlbum(selectedAlbum += 1)
            dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[selectedAlbum].id})
        }
    }


    function leftArrowClick() {
        if (userAlbums.length <= 1) return
        if (selectedAlbum === 0) {
            setSelectedAlbum(selectedAlbum = userAlbums.length - 1)
            dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[userAlbums.length - 1].id})
        } else {
            setSelectedAlbum(selectedAlbum -= 1)
            dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[selectedAlbum].id})
        }
    }


    return <div className='arrows-container'>
        <div
            className="left"
            onClick={leftArrowClick}    
            ></div>
        <div
            className="right"
            onClick={rightArrowClick}
            ></div>
    </div>
}