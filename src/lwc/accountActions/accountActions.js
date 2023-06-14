import { 
    SET_IS_LOADING,
    INITIALIZE,
    GET_ACCOUNTS,
    UPDATE_ACCOUNTS, 
    SELECT_ACCOUNT 
} from 'c/accountConstants'

import initialization from '@salesforce/apex/AccountSelector.initialization'
import getAllAccounts from '@salesforce/apex/AccountSelector.getAllAccounts'


export const setIsLoading = (isLoading) => {
    return dispatch => dispatch({
        type: SET_IS_LOADING,
        payload: { isLoading }
    })
}

export const initialize = () => {
    return dispatch => {
        setIsLoading(true)
        initialization().then(data => 
            dispatch({
                type: INITIALIZE,
                payload: data
            })
        ).catch(error => console.error(JSON.stringify(error)) 
        ).finally(() => setIsLoading(false))
    }
}
 
export const getAccounts = () => {
    return dispatch => {
        setIsLoading(true)
        getAllAccounts()
        .then(accounts => 
            dispatch({
                type: GET_ACCOUNTS,
                payload: { accounts }
            })
        ).catch(error => console.error(JSON.stringify(error))
        ).finally(() => setIsLoading(false))
    }
}

export const updateAccounts = (accounts) => {
    return dispatch => {
        dispatch({
            type: UPDATE_ACCOUNTS,
            payload: { accounts }
        })
    }
}

export const selectAccount = (accountId) => {
    return dispatch => {
        dispatch({
            type: SELECT_ACCOUNT,
            payload: { accountId }
        })
    }
}