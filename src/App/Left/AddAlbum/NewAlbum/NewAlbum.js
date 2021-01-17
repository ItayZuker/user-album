import React from 'react'
import {useDropzone} from 'react-dropzone';
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import uniqid from 'uniqid'
import './new-album.scss'

export function NewAlbum(props) {

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
    const selectedUser = useSelector(state => state.usersReducer.selectedUser)
    const photos = useSelector(state => state.photosReducer.photos)
    const albums = useSelector(state => state.albumsReducer.albums)
    const dispatch = useDispatch()


      let files = acceptedFiles.map(file => (
        <li key={file.name}>
          {file.name}
        </li>
      ));


    function initAlbum(e) {
        e.preventDefault()
        createAlbum(e)
        e.target.title.value = ''
        props.setAddUser(false)
    }


    function createAlbum(e) {
        let albumItem = {}
        albumItem.id = uniqid()
        albumItem.userId = selectedUser.id
        e.target.title.value === '' ? albumItem.title = 'No title...' : albumItem.title = e.target.title.value
        updateAlbumData(albumItem)
        createPhotos(albumItem.id)
    }


    function updateAlbumData(albumItem) {
        axios.post('https://jsonplaceholder.typicode.com/albums', {albumItem})
        .then(res => {
            albums.push(res.data.albumItem)
            dispatch({type: 'ADD_ALBUM_TO_ALBUMS', newAlbums: albums})
        })
        .then(() => dispatch({type: 'UPDATE_USER_ALBUMS', userId: albumItem.userId}))
        .then(() => {
            setTimeout(() => {
                dispatch({type: 'SELECT_ALBUM', albumId: albumItem.id})
            }, 1)
        })
    }


    function createPhotos(albumId) {
        acceptedFiles.map(pictur => {
            let photoItem = {}
            photoItem.id = uniqid()
            photoItem.albumId = albumId
            photoItem.url = pictur.path
            photoItem.title = pictur.name
            updatePhotoData(photoItem)
        })
    }


    function updatePhotoData(photoItem) {
        axios.post('https://jsonplaceholder.typicode.com/photos', {photoItem})
        .then(res => {
            photos.push(res.data.photoItem)
            dispatch({type: 'ADD_PHOTO_TO_PHOTOS', newPhotos: photos})
        })
    }


    return <div className={'new-album-container ' + (props.addUser ? '' : 'hide')}>

        <div className='form-container'>
            <form onSubmit={initAlbum}>
                <input className='input' name='title' placeholder='Enter album title'></input>
                <input className='submit' type='submit'></input>
            </form>
            <div {...getRootProps({className: 'dropzone disabled'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop the album picturs, or click to select them</p>
                {files}
            </div>
        </div>
    </div>
}