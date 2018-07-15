import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import { white, black, gray, red } from '../utils/colors'
import { removeDeck } from '../utils/helper'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'


class IndividualDeckView extends Component {

    addCard = (id) => {
        this.props.navigation.navigate('NewQuestion', {
            id: id,
        })
    }

    startQuiz = (id) => {
        if(this.props.navigation.getParam('cards', 0) === 0) {
            Alert.alert(
                'There are no cards available in this deck',
                '',
                [{text: 'OK'}],
                {cancelable: false},
            )
        } else {
            this.props.navigation.navigate('Quiz', {
                id: id,
            })
        }
    }

    removeThisDeck = (id, title) => {
        Alert.alert(
            `Do you want to remove ${title} deck?`,
            'All cards will also be removed',
            [{ text: 'YES', onPress: () => {removeDeck(id, this.removeDeckCallback)}},
             { text: 'NO' },
            ],
            { cancelable: false },
        )
    }

    removeDeckCallback = (result) => {
        this.props.navigation.navigate('Home')
    }

    render() {

        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)
        const deckTitle = navigation.getParam('title', 'No Title')
        const cardNumbers = navigation.getParam('cards', 0)

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.deckDeleteBtn} onPress={() => this.removeThisDeck(deckId, deckTitle)}>
                    <Ionicons name="md-trash" size={20} color="black" />
                </TouchableOpacity>
                <View style={styles.deckMain}>
                    <Text style={[styles.listText, { fontSize: 25 }]}>{deckTitle}</Text>
                    <Text style={[styles.listText, { color: gray }]}>{cardNumbers} cards</Text>
                </View>
                <TextButton style={{ backgroundColor: white, color: black }} onPress={() => this.addCard(deckId)}>
                    Add Card
                </TextButton>
                <TextButton style={{ backgroundColor: black, color: white, marginTop: 10 }} onPress={() => this.startQuiz(deckId)}>
                    Start Quiz
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 20,
    }, 
    deckMain: {
        alignSelf: 'center',
        marginVertical: 65,
    },
    listText: {
        textAlign: 'center',
    },
    deckDeleteBtn: {
        alignSelf: 'flex-end',
        width: 25,
        marginRight: 20,
    }
})

export default IndividualDeckView