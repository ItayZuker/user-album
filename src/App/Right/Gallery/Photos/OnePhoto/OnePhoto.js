import React from 'react'
import './one-photo.scss'

export function OnePhoto(props) {


    return <div className='one-photo-container'>
        <img src={props.url}></img>
    </div>
}