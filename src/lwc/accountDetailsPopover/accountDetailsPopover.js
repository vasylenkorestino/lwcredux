import { LightningElement, api } from 'lwc'

// CONSTANTS
import { 
    ACCOUNT_COLUMNS
} from 'c/accountConstants'

 
export default class AccountDetailsPopover extends LightningElement {

    show = false
    @api top
    @api left

    @api sectionName
    _records

    @api 
    get records(){
        return _records
    }

    set records(value){
        console.log('value : ', JSON.parse(JSON.stringify(value)))
        if(value && value.length){
            this.show = true
            this._records = [...value]
        } else {
            this.show = false
            this._records = []
        }
    }

    columns = ACCOUNT_COLUMNS.filter(column => ( column.type != 'action'))

    get boxClass() { return `z-index:9999; background-color:white; position: absolute; top:${this.top - 380 }px; left:${this.left}px` }

    handleCloseClick(){
        this.dispatchEvent(new CustomEvent('close'))
    }

}