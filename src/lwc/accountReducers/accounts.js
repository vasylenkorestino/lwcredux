import { 
    SET_IS_LOADING,
    INITIALIZE,
    GET_ACCOUNTS, 
    UPDATE_ACCOUNTS, 
    SELECT_ACCOUNT 
} from 'c/accountConstants'

import {
    prepareData
} from 'c/accountHelper'

const initialState = {
    isLoading: true,
    accounts: [],
    selectedAccount: undefined,

    groupedAccounts: []
}

const accounts = (state = initialState, action) => {
    switch (action.type) {

        case SET_IS_LOADING: {
            const payload = action.payload
            return {
                ...state,
                isLoading: payload.isLoading
            }
        }

        case INITIALIZE: {
            const payload = action.payload
            console.log('payload : ', payload)
            let data = prepareData(payload)
            console.log('data : ', data)
            return {
                ...state,
                isLoading: false,
                accounts: data.accounts,
                groupedAccounts: data.groupedByTypeResult
            }
        }

        case GET_ACCOUNTS: {
            const payload = action.payload
            let data = prepareData(payload)
            return {
                ...state,
                isLoading: false,
                accounts: data.accounts
            }
        }

        case UPDATE_ACCOUNTS: {
            const payload = action.payload
            return {
                ...state,
                isLoading: false,
                accounts: payload.accounts
            }
        }

        case SELECT_ACCOUNT: {
            const payload = action.payload
            return {
                ...state,
                selectedAccount: state.accounts.find(account => ( account.Id == payload.accountId ))
            }
        }

        default: return state
    }
}

export default accounts