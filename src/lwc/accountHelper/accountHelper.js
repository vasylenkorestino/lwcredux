import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import LightningConfirm from 'lightning/confirm'

import { CONFIRM_THEME, CONFIRM_LABEL, CONFIRM_MESSAGE, WITHOUT_TYPE, CIRCLE_STYLE } from 'c/accountConstants'

import deleteAccountById from '@salesforce/apex/AccountSelector.deleteAccount'

export const isComfirmDelete = () => {
    return new Promise( async (resolve, reject) => 
        resolve(await LightningConfirm.open({ theme: CONFIRM_THEME, label: CONFIRM_LABEL, message: CONFIRM_MESSAGE }))
    )
}

export const deleteAccount = (accountId) => {
    return new Promise((resolve, reject) => {
        deleteAccountById({ accountId })
        .then(isDeleted => resolve(isDeleted))
        .catch(error => reject(error))
    })
}

export const toast = (self, title, variant, message) => {
    self.dispatchEvent(new ShowToastEvent({ title: title, variant: variant, message: message }))
}

export const prepareData = (data) => {
    let clonedData = deepCopy(data)
    console.log('clonedData : ', clonedData)

    if(clonedData?.groupedByTypeResult && clonedData.groupedByTypeResult.length){
        clonedData = prepareGroupedAccounts(clonedData)
    }

    if(clonedData?.accounts && clonedData.accounts.length){
        clonedData = prepareAccounts(clonedData)
    }

    console.log('clonedData : ', clonedData)
    return deepCopy(clonedData)
}

const prepareGroupedAccounts = (data) => {
    console.log(1)
    let groupedAccounts = []
    data?.groupedByTypeResult.forEach(element => {
        let color = getRandomColor()
        element['style'] = CIRCLE_STYLE.replace('{#color}', color)
        element.Type = element?.Type ? element.Type : WITHOUT_TYPE
        groupedAccounts.push(element)
    })
    data.groupedByTypeResult = [...groupedAccounts]
    return data
}

const prepareAccounts = (data) => {
    console.log(1)
    let accounts = []
    data?.accounts.forEach(account => {
        account.link = '/' + account.Id
        accounts.push(account)
    })
    data.accounts = [...accounts]
    return data
}

export const getRandomColor = () => {
    return ('#' + Math.floor(Math.random()*16777215).toString(16))
}

export const deepCopy = (object) => {
    return JSON.parse(JSON.stringify(object))
}