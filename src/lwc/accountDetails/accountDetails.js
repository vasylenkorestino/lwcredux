import { LightningElement, api } from 'lwc'
import { Redux } from 'c/lwcRedux'

// CONSTANTS
import { WITHOUT_TYPE } from 'c/accountConstants'

// ACTIONS
import { handleOpenIsDetails } from 'c/modalActions'

export default class AccountDetails extends Redux(LightningElement) {

    type
    selectedRecords

    connectedCallback(){
        super.connectedCallback()
    }

    mapStateToProps(state){
        console.log('AccountDetails state : ', JSON.parse(JSON.stringify(state)))
        return {
            // DATA VARIABLES
            isLoading: state.data?.isLoading,
            accounts: state.data.accounts,
            groupedAccounts: state.data?.groupedAccounts
        }
    }

    mapDispatchToProps(){
        return {
            handleOpenIsDetails
        }
    }

    handlePopover(event){
        this.type = event.currentTarget.dataset.type
        if(this.selectedRecords?.length){
            this.selectedRecords = undefined
        } else {
            this.left = event.clientX
            this.top = event.clientY
            let type = this.type == WITHOUT_TYPE ? undefined : this.type
            this.selectedRecords = this.props.accounts.filter(account => ( account.Type == type ))
        }
    }

    handleClosePopover(){
        this.selectedRecords = undefined
    }
}