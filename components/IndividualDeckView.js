import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, black, gray } from '../utils/colors'
import TextButton from './TextButton'


class IndividualDeckView extends Component {

    addCard = () => {

    }

    startQuiz = (id) => {
        this.props.navigation.navigate('Quiz', {
            id: id,
        })
        console.log(id)
    }

    render() {

        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)
        const deckTitle = navigation.getParam('title', 'No Title')
        const cardNumbers = navigation.getParam('cards', '-')

        return (
            <View style={styles.container}>
                <View style={styles.deckMain}>
                    <Text style={[styles.listText, { fontSize: 25 }]}>{deckTitle}</Text>
                    <Text style={[styles.listText, { color: gray }]}>{cardNumbers} cards</Text>
                </View>
                <TextButton style={{ backgroundColor: white, color: black }} onPress={() => this.addCard()}>
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