import React, {useEffect, useRef} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import './select.scss'


function Select() {

    const users = useSelector(state => state.usersReducer.users)
    const selectedUser = useSelector(state => state.usersReducer.selectedUser)
    const userAlbums = useSelector(state => state.albumsReducer.userAlbums)
    const select_ref = useRef()
    const dispatch = useDispatch()


    function selectUser() {
        dispatch({type: 'UPDATE_USER', userId: select_ref.current.value})
        if (select_ref.current.value === 'DEFAULT') return
    }


    useEffect(() => {
        if (selectedUser === undefined) return
        dispatch({type: 'UPDATE_USER_ALBUMS', userId: selectedUser.id})
    }, [selectedUser])


    useEffect(() => {
        if (userAlbums.length === 0) return
        dispatch({type: 'SELECT_ALBUM', albumId: userAlbums[0].id})
    }, [userAlbums])

    
    return <div className='select-container'>
        <select
            name="users"
            ref={select_ref}
            className='users-selection'
            defaultValue={'DEFAULT'}
            onClick={selectUser}
            >
            <option value='DEFAULT' disabled>Select User</option>
            {users.map(user => {
                return <option key={user.id} value={user.id}>{user.name}</option>
            })}
        </select>
    </div>
}


export default Select;