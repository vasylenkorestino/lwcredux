import { 
    SET_IS_LOADING,
    IS_NEW,
    IS_EDIT,
    IS_DETAILS,
} from 'c/modalConstants';

const initialState = {
    isLoading: false,
    isNew: false,
    isEdit: false,
    isDetails: false
}

const modal = (state = initialState, action) => {
    switch (action.type) {

        case SET_IS_LOADING: {
            const payload = action.payload
            return {
                ...state,
                isLoading: payload.isLoading
            }
        }

        case IS_NEW: {
            const payload = action.payload
            return {
                ...state,
                isNew: payload.isOpen
            }
        }

        case IS_EDIT: {
            const payload = action.payload
            return {
                ...state,
                isEdit: payload.isOpen
            }
        }

        case IS_DETAILS: {
            const payload = action.payload
            return {
                ...state,
                isDetails: payload.isOpen
            }
        }

        default: return state
    }
}

export default modal