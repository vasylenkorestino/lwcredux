import { LightningElement } from 'lwc'

import { registerListener, unregisterAllListeners } from 'c/eventPubSub'
 
export default class AccountSelectorUtility extends LightningElement {
    
    accounts = []

    connectedCallback(){
        registerListener('addaccount', this.handleAddAccount, this)
    }

    disconnectedCallback() {
        unregisterAllListeners(this)
    }

    handleAddAccount(data) {
        console.log('data ; ', data)
        if(data.account){
            this.accounts = this.accounts.length ? [...this.accounts, data.account] : [ data.account ]
        } else {
            this.accounts = []
        }
    }
}