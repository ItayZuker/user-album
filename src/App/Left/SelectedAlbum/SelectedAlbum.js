import React from 'react'
import {useSelector} from 'react-redux'
import './selected-album.scss'

export function SelectedAlbum() {


    const selectedAlbum = useSelector(state => state.albumsReducer.selectedAlbum)
    const selectedPhoto = useSelector(state => state.photosReducer.selectedPhoto)



    return <div className='selected-album-container'>
        <div className='album-data'>
            <div className='data-container'><p><span>Album id:</span> {selectedAlbum ? selectedAlbum.id : 'No albume...'}</p></div>
            <div className='data-container'><p><span>Album tittle:</span> {selectedAlbum ? selectedAlbum.title : 'No title...'}</p></div>
            <div className='data-container'><p><span>photo id:</span> {selectedPhoto ? selectedPhoto.id : 'No photo...'}</p></div>
            <div className='data-container'><p><span>photo tittle:</span> {selectedPhoto ? selectedPhoto.title : 'No photo...'}</p></div>
        </div> 
    </div>
}