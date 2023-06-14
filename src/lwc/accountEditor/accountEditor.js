import { LightningElement } from 'lwc'
import { Redux } from 'c/lwcRedux'

// CONSTANTS
import { ACCOUNT_OBJECT, TOAST_THEME_SUCCESS, TOAST_TITLE_SUCCESS, 
    TOAST_MESSAGE_CREATE, TOAST_MESSAGE_UPDATE } from 'c/accountConstants'

// ACTIONS 
import { setIsLoading, handleOpenIsNew, handleOpenIsEdit } from 'c/modalActions'
import { getAccounts, selectAccount } from 'c/accountActions'

// HELPERS
import { toast } from 'c/accountHelper'


export default class AccountEditor extends Redux(LightningElement) {

    modalLabel
    buttonLabel

    mapStateToProps(state){

        this.modalLabel = state.modal.isNew ? 'Create New Account' : ( 'Edit ' + state.data.selectedAccount?.Name )
        this.buttonLabel = state.modal.isNew ? 'Create' : 'Update'

        return {
            // DATA VARIABLES
            objectApiName: ACCOUNT_OBJECT,
            selectedAccountId: state.data.selectedAccount?.Id,
            // MODAL WINDOWS VARIABLES
            isLoading: state.modal.isLoading,
            isNew: state.modal.isNew,
            isEdit: state.modal.isEdit
        }
    }

    mapDispatchToProps(){
        return { 
            // DATA ACTIONS
            getAccounts,
            selectAccount,
            // MODAL WINDOWS ACTIONS
            setIsLoading,
            handleOpenIsNew,
            handleOpenIsEdit
        }
    }

    handleClose(){
        this.props.selectAccount(undefined)
        this.props.isNew ? this.props.handleOpenIsNew(false) : this.props.handleOpenIsEdit(false)
    }

    handleSubmit(event){
        event.preventDefault();
        const fields = event.detail.fields
        this.template.querySelector('lightning-record-edit-form').submit(fields)
        this.props.setIsLoading(true)
    }

    handleSuccess(event){
        toast(this, TOAST_TITLE_SUCCESS, TOAST_THEME_SUCCESS, ( this.props.isNew ? TOAST_MESSAGE_CREATE : TOAST_MESSAGE_UPDATE ))
        this.props.getAccounts()
        this.handleClose()
    }
}