import React, {useEffect, useState, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {OnePhoto} from './OnePhoto/OnePhoto'
import './photos.scss'

export function Photos() {


    let [relativePicSize, setRelativePicSize] = useState(window.innerHeight*0.35)
    let [picNum, setPicNum] = useState(1)
    let [intervalId, setIntervalId] = useState(0)
    let [fadeIn, setFadeIn] = useState(false)
    const dispatch = useDispatch()
    let gallery_ref = useRef()


    const albumPhotos = useSelector(state => state.photosReducer.albumPhotos)
    const selectedAlbum = useSelector(state => state.albumsReducer.selectedAlbum)
    const userAlbums = useSelector(state => state.albumsReducer.userAlbums)
    let relativePicSize_ref = useRef()
    relativePicSize_ref.current = relativePicSize


    useEffect(() => {
        window.addEventListener('resize', () => {
            setRelativePicSize(relativePicSize = window.innerHeight*0.35)
            clearInterval(intervalId)
            setPicNum(1)
        })
    }, [])


    useEffect(() => {
        if (selectedAlbum === undefined) return
        dispatch({type: 'UPDATE_ALBUM_PHOTOS', albumId: selectedAlbum.id})
    }, [selectedAlbum])


    useEffect(() => {
        dispatch({type: 'UPDATE_SELECTED_PHOTO', index: picNum - 1})
    }, [albumPhotos])


    useEffect(() => {
        if (albumPhotos.length > 0) {
            clearInterval(intervalId)
            setPicNum(picNum = 1)
            dispatch({type: 'UPDATE_SELECTED_PHOTO', index: picNum - 1})
            gallery_ref.current.style.top = `0px`
            moveGallery()
        }
    }, [albumPhotos])


    useEffect(() => {
        if (userAlbums.length === 0) {
            dispatch({type: 'RESET_PHOTOS'})
        }
    }, [userAlbums])


    function moveGallery() {
        setFadeIn(true)
        setIntervalId(intervalId = setInterval(() => {
            gallery_ref.current.style.top = `-${picNum*relativePicSize_ref.current}px`
            if (picNum === albumPhotos.length) {
                setFadeIn(false)
                setPicNum(picNum = 1)
                dispatch({type: 'UPDATE_SELECTED_PHOTO', index: picNum - 1})
            } else {
                setFadeIn(true)
                setPicNum(picNum += 1)
                dispatch({type: 'UPDATE_SELECTED_PHOTO', index: picNum - 1})
            }
        }, 2000))
    }


    return <div className='photos-container'>
        <div className={'gallery-place-holder ' + (albumPhotos.length > 0 ? 'hide' : '')}>
            <p>No photos...</p>
        </div>
        <div
            className={'gallery ' + (fadeIn ? 'fade-in' : 'fade-Out')}
            ref={gallery_ref}
            >
            {albumPhotos.map(photo => <OnePhoto
            key={photo.id}
            url={photo.url}
            ></OnePhoto>)}
        </div>
    </div>
}