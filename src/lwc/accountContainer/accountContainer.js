import { LightningElement, api } from 'lwc'
import {createStore, combineReducers, createLogger} from 'c/lwcRedux'
import reducers from 'c/accountReducers'

const ENABLE_LOGGING = true

export default class AccountContainer extends LightningElement {

    @api store

    initialize(){
        let logger
        
        // Check for the Logging
        if(ENABLE_LOGGING){
            logger = createLogger({
                duration: true,
                diff: true
            })
        }
        
        const combineReducersInstance = combineReducers(reducers)
        this.store = createStore(combineReducersInstance, logger)
    }
}