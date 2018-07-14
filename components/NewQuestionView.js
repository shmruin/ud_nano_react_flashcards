import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native'
import { addCardToDeck, getDecks } from '../utils/helper'
import { white, black } from '../utils/colors'
import TextButton from './TextButton'


class NewQuestionView extends Component {
    state = {
        textQuestion: '',
        textAnswer: '',
    }

    submitQuestion = (id, question, answer) => {
        addCardToDeck(
            id,
            {
                question: question,
                answer: answer,
            },
            this.submitCallback,
        )
    }

    submitCallback = (value) => {

        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)

        let rows = JSON.parse(value)

        this.setState({
            textQuestion: '',
            textAnswer: '',
        })

        Alert.alert(
            'The card is added correctly!',
            '',
            [{
                text: 'OK', onPress: () => {
                    this.props.navigation.navigate('DeckDetail', {
                        id: deckId,
                        title: rows[deckId].title,
                        cards: rows[deckId].questions.length,
                    })
                }
            }],
            { cancelable: false },
        )
    }

    render() {

        const { textQuestion, textAnswer } = this.state
        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)

        return (
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.questionInput}
                    onChangeText={(textQuestion) => this.setState({ textQuestion })}
                    value={this.state.textQuestion}
                    placeholder='A new Question of the card'
                />
                <TextInput
                    style={styles.answerInput}
                    onChangeText={(textAnswer) => this.setState({ textAnswer })}
                    value={this.state.textAnswer}
                    placeholder='The answer of the card'
                />
                <TextButton style={{ backgroundColor: black, color: white }} onPress={() => this.submitQuestion(deckId, textQuestion, textAnswer)}>
                    Submit
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    questionInput: {
        height: 25,
        borderColor: black,
        borderWidth: 1,
        marginBottom: 20,
    },
    answerInput: {
        height: 25,
        borderColor: black,
        borderWidth: 1,
        marginBottom: 20,
    },
})

export default NewQuestionView