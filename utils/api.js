import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './helper'


export function fetchDecksResult() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function fetchDeckResult(id) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
}

export function submitDeck(title) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
            title: title,
            questions: [],
        }
    }))
}

export function submitCard({title, card}) {
    return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title] : card,
    }))
}

export function setDummyData() {
    let dummyData = {
        React: {
            title: 'React',
            questions: [
                {
                    question: 'What is React?',
                    answer: 'A library for managing user interfaces'
                },
                {
                    question: 'Where do you make Ajax requests in React?',
                    answer: 'The componentDidMount lifecycle event'
                }
            ]
        },
        JavaScript: {
            title: 'JavaScript',
            questions: [
                {
                    question: 'What is a closure?',
                    answer: 'The combination of a function and the lexical environment within which that function was declared.'
                }
            ]
        }
    }

    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(dummyData))

    return dummyData
}