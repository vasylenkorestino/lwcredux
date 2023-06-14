import { LightningElement, api, track } from 'lwc'

import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi'

import runAsync from '@salesforce/apex/AccountSelector.runAsync'
 
export default class PlatformEventSubscriber extends LightningElement {

    isLoading = true
    @track results

    subscription = {};
    @api channelName = '/event/AsyncResponse__e';

    // Initializes the component
    connectedCallback() {       
        // Register error listener     
        this.registerErrorListener()
        this.handleSubscribe()

        runAsync()
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const self = this
        const messageCallback = function(response) {
            console.log('New message received 1: ', JSON.stringify(response))
            console.log('New message received 2: ', response)
            
            var obj = JSON.parse(JSON.stringify(response))
            console.log('New message received 4: ', obj.data.payload.Message__c)
            console.log('New message received 5: ', this.channelName)

            self.results = self.results ? [...self.results, obj.data.payload] : [obj.data.payload]
            self.isLoading = false
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe('/event/AsyncResponse__e', -1, messageCallback).then(response => {
            console.log('response : ', response)
            // Response contains the subscription information on subscribe call
            console.log('Subscription request sent to: ', JSON.stringify(response.channel))
            this.subscription = response
        })
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error))
            // Error contains the server-side error
        })
    }

    handleClose(){
        this.event('close')
    }

    event(event, detail){
        this.dispatchEvent(new CustomEvent(event, { detail: detail }))
    }
}