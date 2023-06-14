import { 
    SET_IS_LOADING,
    IS_NEW,
    IS_EDIT,
    IS_DETAILS
} from 'c/accountConstants'


export const setIsLoading = (isLoading) => {
    return dispatch => dispatch({
        type: SET_IS_LOADING,
        payload: { isLoading }
    })
}

export const handleOpenIsNew = (isOpen) => {
    return dispatch => dispatch({
        type: IS_NEW,
        payload: { isOpen }
    })
}

export const handleOpenIsEdit = (isOpen) => {
    return dispatch => dispatch({
        type: IS_EDIT,
        payload: { isOpen }
    })
}

export const handleOpenIsDetails = (isOpen) => {
    return dispatch => dispatch({
        type: IS_DETAILS,
        payload: { isOpen }
    })
}