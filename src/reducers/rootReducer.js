const initUsersState = {
    users: [],
    selectedUser: {name: 'No user...'}
}


export function usersReducer(state = initUsersState, action) {
    switch (action.type) {
        case 'INIT_USERS': return {
            ...state,
            users: state.users = action.usersArray
        }     
        case 'UPDATE_USER': return {
            ...state,
            selectedUser: state.selectedUser = state.users.find(user => user.id == action.userId)
        }
        default: return state;
    }
}


const initAlbumsState = {
    albums: [],
    userAlbums: [],
    selectedAlbum: {title: 'No album...'}
}


export function albumsReducer(state = initAlbumsState, action) {
    switch (action.type) {
        case 'INIT_ALBUMS': 
        return {
            ...state,
            albums: state.albums = action.albumsArray
        }     
        case 'SELECT_ALBUM':
        return {
            ...state,
            selectedAlbum: state.selectedAlbum = state.albums.find(album => album.id === action.albumId)
        }
        case 'ADD_ALBUM_TO_ALBUMS':
        return {
            ...state,
            albums: state.albums = action.newAlbums
        }
        case 'UPDATE_USER_ALBUMS':
        return {
            ...state,
            userAlbums: state.albums = state.albums.filter(album => album.userId === action.userId)
        }
        case 'DELETE_FROM_ALBUMS':
        return {
            ...state,
            albums: state.albums.filter(album => album.id !== action.albumId),
        }
        case 'DELETE_FROM_USER_ALBUMS':
        return {
            ...state,
            userAlbums: state.userAlbums.filter(albums => albums.id !== action.albumId),
        }
        case 'RESET_SELECTED_ALBUM': 
        return {
            ...state,
            selectedAlbum: state.selectedAlbum = {title: 'No album...'}
        }
        default: return state;
    }
}


const initPhotosState = {
    photos: [],
    albumPhotos: [],
    selectedPhoto: {title: 'No Picturs...'}
}


export function photosReducer(state = initPhotosState, action) {
    switch (action.type) {
        case 'INIT_PHOTOS': return {
            ...state,
            photos: state.photos = action.photosArray
        }     
        case 'ADD_PHOTO_TO_PHOTOS':
            return {
            ...state,
            photos: state.photos = action.newPhotos
        }
        case 'UPDATE_SELECTED_PHOTO': 
        return {
            ...state,
            selectedPhoto: state.albumPhotos[action.index]
        }
        case 'UPDATE_ALBUM_PHOTOS': 
        return {
            ...state,
            albumPhotos: state.photos.filter(photo => photo.albumId === action.albumId)
        }
        case 'RESET_PHOTOS':
            return {
            ...state,
            albumPhotos: state.albumPhotos = [],
            selectedPhoto: state.selectedPhoto = {title: 'No Picturs...'}
        }
        default: return state;
    }
}