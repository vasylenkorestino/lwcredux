import { LightningElement } from 'lwc'

const events = {}

export const registerListener = (eventName, callback, thisArg) => {
    if (!events[eventName]) {
        events[eventName] = new Set()
    }
    events[eventName].add({ callback, thisArg })
}

export const unregisterListener = (eventName, callback, thisArg) => {
    if (events[eventName]) {
        events[eventName].delete({ callback, thisArg })
    }
}

export const unregisterAllListeners = (thisArg) => {
    Object.keys(events).forEach((eventName) => {
        events[eventName].forEach((listener) => {
            if (listener.thisArg === thisArg) {
                events[eventName].delete(listener)
            }
        })
    })
}

export const fireEvent = (eventName, eventData) => {
    if (events[eventName]) {
        events[eventName].forEach((listener) => {
            listener.callback.call(listener.thisArg, eventData)
        })
    }
}

export default class EventPubSub extends LightningElement {}