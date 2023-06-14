// DATA

export const ACCOUNT_OBJECT = 'Account'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const INITIALIZE = 'INITIALIZE'
export const GET_ACCOUNTS = 'GET_ACCOUNTS'
export const UPDATE_ACCOUNTS = 'UPDATE_ACCOUNTS'
export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'

export const WITHOUT_TYPE = 'Without Type'
export const ADD = 'ADD'
export const EDIT = 'edit'
export const DELETE = 'delete'

const ACCOUNT_ACTIONS = [
    { label: 'Add', name: ADD },
    { label: 'Edit', name: EDIT },
    { label: 'Delete', name: DELETE }
]

export const ACCOUNT_COLUMNS = [
    { label: 'Name', fieldName: 'link', type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { type: 'action', typeAttributes: { rowActions: ACCOUNT_ACTIONS }},
]

// MODAL

export const IS_NEW = 'IS_NEW'
export const IS_EDIT = 'IS_EDIT'
export const IS_DELETE = 'IS_DELETE'

// OTHER

export const TOAST_THEME_SUCCESS = 'success'
export const TOAST_TITLE_SUCCESS = 'Success!'
export const TOAST_MESSAGE_CREATE = 'The record has been created succesfully!'
export const TOAST_MESSAGE_UPDATE = 'The record has been updated succesfully!'
export const TOAST_MESSAGE_DELETE = 'The record has been deleted succesfully!'

export const TOAST_THEME_ERROR = 'error'
export const TOAST_TITLE_ERROR = 'Error!'
export const TOAST_ERROR_MESSAGE = 'Something went wrong!'


export const CONFIRM_THEME = 'warning'
export const CONFIRM_LABEL = 'Do you want to delete this record?'
export const CONFIRM_MESSAGE = 'You could restore this record! The Recycle Bin link in the sidebar lets you view and restore recently deleted records for 15 days before they are permanently deleted.'

export const CIRCLE_STYLE = 'background: {#color}; border-radius: 50%; width: 70px; height: 70px; cursor: pointer;'