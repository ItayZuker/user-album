import React from 'react'
import {Photos} from './Photos/Photos'
import {Arrows} from './Arrows/Arrows'
import {useSelector} from 'react-redux'
import {DeleteAlbum} from './DeleteAlbum/DeleteAlbum'
import './gallery.scss'

export function Gallery() {


    const selectedAlbum = useSelector(state => state.albumsReducer.selectedAlbum)


    return <div className='gallery-container'>
        <div className='h2-container'>
            <DeleteAlbum></DeleteAlbum>
            <h2>{selectedAlbum === undefined ? 'No albums' : selectedAlbum.title}</h2>
        </div>
        <Photos></Photos>
        <Arrows></Arrows>
    </div>
}