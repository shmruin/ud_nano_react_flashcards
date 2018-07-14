import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { white, black, gray } from '../utils/colors'
import TextButton from './TextButton'


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

    render() {

        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)
        const deckTitle = navigation.getParam('title', 'No Title')
        const cardNumbers = navigation.getParam('cards', 0)

        return (
            <View style={styles.container}>
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
    }
})

export default IndividualDeckView