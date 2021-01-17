import React from 'react'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import './delete-album.scss'

export function DeleteAlbum() {


    const selectedAlbum = useSelector(state => state.albumsReducer.selectedAlbum)
    const userAlbums = useSelector(state => state.albumsReducer.userAlbums)
    const dispatch = useDispatch()


    function deleteAlbum() {
        if (userAlbums.length === 0) return
        let albumId = selectedAlbum.id
        deleteFromAlbums(albumId)
        deleteFromUserAlbums(albumId)
        updateSelectedAlbum()
    }


    function deleteFromAlbums(albumId) {
        axios.delete(`https://jsonplaceholder.typicode.com/albums/${selectedAlbum.id}`)
        .then(res => {
            console.log(res.data)
            if (userAlbums.length === 1) dispatch({type: 'RESET_SELECTED_ALBUM'})
            dispatch({type: 'DELETE_FROM_ALBUMS', albumId: albumId})
        })
    }


    function deleteFromUserAlbums(albumId) {
        dispatch({type: 'DELETE_FROM_USER_ALBUMS', albumId: albumId})
    }


    function updateSelectedAlbum() {
            dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[0].id})
    }


    return <div className='delete-album-container'>
        <div
            className={'delete-album ' + (selectedAlbum && userAlbums.length > 0 ? 'active' : '')}
            onClick={deleteAlbum}
        >+</div>
    </div>
}