import { LightningElement } from 'lwc'
import { Redux } from 'c/lwcRedux'

// CONSTANTS
import { 
    ACCOUNT_COLUMNS, ADD, EDIT, DELETE,
    TOAST_THEME_SUCCESS, TOAST_TITLE_SUCCESS, TOAST_MESSAGE_DELETE,
    TOAST_THEME_ERROR, TOAST_TITLE_ERROR
} from 'c/accountConstants'

// ACTIONS 
import { initialize, updateAccounts, selectAccount } from 'c/accountActions'
import { handleOpenIsNew, handleOpenIsEdit } from 'c/modalActions'

// HELPERS
import { toast, isComfirmDelete, deleteAccount } from 'c/accountHelper'

// EVENTS

import { fireEvent } from 'c/eventPubSub'


export default class Accounts extends Redux(LightningElement) {

    columns = ACCOUNT_COLUMNS

    connectedCallback(){
        super.connectedCallback()
        this.props.initialize()
    }

    mapStateToProps(state){
        return {
            // DATA VARIABLES
            isLoading: state.data.isLoading,
            accounts: state.data.accounts,
            groupedAccounts: state.data.groupedAccounts,
            // MODAL WINDOWS VARIABLES
            isOpenEditor: state.modal.isNew || state.modal.isEdit
        }
    }

    mapDispatchToProps(){
        return { 
            // DATA ACTIONS
            initialize, 
            updateAccounts,
            selectAccount,
            // MODAL WINDOWS ACTIONS
            handleOpenIsNew,
            handleOpenIsEdit
        }
    }

    // HANDLERS
    handleRowAction(event){
        switch (event.detail.action.name) {
            case ADD: fireEvent('addaccount', { account: event.detail.row })
                break
            case EDIT: this.handleIsEdit(event.detail.row)
                break
            case DELETE: this.handleIsDelete(event.detail.row)
                break
            default: console.log(event.detail.action.name)
        }
    }

    handleIsNew(){ 
        this.props.handleOpenIsNew(true) 
    }

    handleIsEdit(row){ 
        this.props.handleOpenIsEdit(true)
        this.props.selectAccount(row.Id)
    }

    handleIsDelete(row){ 
        isComfirmDelete().then(isConfirmed => 
            isConfirmed && deleteAccount(row.Id).then(isDeleted => {
                isDeleted && toast(this, TOAST_TITLE_SUCCESS, TOAST_THEME_SUCCESS, TOAST_MESSAGE_DELETE)
                isDeleted && this.props.updateAccounts(this.props.accounts.filter(account => ( account.Id != row.Id )))
            })
            .catch(error => {
                error.status == 500 && toast(this, TOAST_TITLE_ERROR, TOAST_THEME_ERROR, error?.body?.pageErrors[0].message)
            })
        )
    }

    isAsync = false

    handleOpenSubscriber(){
        this.isAsync = true
    }

    handleCloseSubscriber(){
        this.isAsync = false
    }
}