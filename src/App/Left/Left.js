import React from 'react'
import Select from './Select/Select'
import {AddAlbum} from './AddAlbum/AddAlbum'
import {SelectedAlbum} from './SelectedAlbum/SelectedAlbum'
import './left.scss'

export function Left() {


    return <div className='left-container'>
        <div className='container'>
            <Select></Select>
            <AddAlbum></AddAlbum>
            <SelectedAlbum></SelectedAlbum>
        </div>
    </div>
}