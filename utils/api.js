import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { DECKS_STORAGE_KEY, NOTIFICATION_KEY } from './helper'


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

export function submitCard(id, card, callback) {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        var exQuestions = JSON.parse(result)[id].questions
        exQuestions.push(card)

        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
            [id]: {
                questions: exQuestions,
            }
        }), () => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
                callback(result)
            })
        })
    })
}

export function fetchRemoveDeck(id, callback) {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        var alternative = JSON.parse(result)
        delete alternative[id]

        AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(
            alternative
        ), () => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
                callback(result)
            })
        })
    })
}

export function fetchRemoveCard(id, cardIdx, callback) {

    return AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
        var exQuestions = JSON.parse(result)[id].questions
        exQuestions.splice(cardIdx, 1)

        AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
            [id]: {
                questions: exQuestions,
            }
        }), () => {
            AsyncStorage.getItem(DECKS_STORAGE_KEY, (err, result) => {
                console.log(result)
                callback(result)
            })
        })
    })
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

export function fetchClearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function fetchSetCreateNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if(data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                .then(({ status }) => {
                    if(status === 'granted') {
                        Notifications.cancelAllScheduledNotificationsAsync()

                        let tomorrow = new Date()
                        tomorrow.setDate(tomorrow.getDate() + 1)
                        tomorrow.setHours(20)
                        tomorrow.setMinutes(0)

                        Notifications.scheduleLocalNotificationAsync(
                            fetchCreateNotification(),
                            {
                                time: tomorrow,
                                repeat: 'day',
                            }
                        )

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                    }
                })
            }
        })
}

function fetchCreateNotification() {
    return {
        title: 'Flash Card Alarm',
        body: 'Keep study everyday!',
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
        }
    }
}