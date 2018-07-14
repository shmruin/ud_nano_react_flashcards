import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { white, green, red } from '../utils/colors'
import { getDecks } from '../utils/helper'
import TextButton from './TextButton'


class QuizView extends Component {
    state = {
        cardIdx: 0,
        isQuestion: true,
        rows: null,
        score: 0,
    }

    componentDidMount = () => {
        this.deckCreator()

        this.props.navigation.addListener('willFocus', (route) => {
            this.deckCreator()
        })
    }

    deckCreator = () => {
        getDecks().then((value) => {
            this.setState({
                rows: JSON.parse(value),
            })
        })
    }

    onClickCorrect = () => {
        //End case test
        if(this.EndTest() === true) {
            this.props.navigation.navigate('QuizResult', {
                score: this.state.score + 1,
                total: this.state.cardIdx + 1,
            })
        } else {
            this.setState({
                cardIdx: this.state.cardIdx + 1,
                isQuestion: true,
                score: this.state.score + 1
            })
        }
    }

    onClickIncorrect = () => {
        //End case test
        if(this.EndTest() === true) {
            this.props.navigation.navigate('QuizResult', {
                score: this.state.score,
                total: this.state.cardIdx + 1,
            })
        } else {
            this.setState({
                cardIdx: this.state.cardIdx + 1,
                isQuestion: true,
            })
        }
    }

    EndTest = () => {
        const { cardIdx, rows } = this.state
        const deckId = this.props.navigation.getParam('id', null)
        
        return (cardIdx === rows[deckId]['questions'].length - 1) ? true : false
    }

    showAnswer = () => {
        this.setState({
            isQuestion: !this.state.isQuestion,
        })
    }

    render() {

        const { cardIdx, isQuestion, rows } = this.state
        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)

        return (
            <View style={styles.container}>
                { rows !== null
                    ? isQuestion === true
                            ? (
                                <Fragment>
                                    <Text>{cardIdx + 1} / {rows[deckId]['questions'].length}</Text>
                                    <Text style={styles.title}>{rows[deckId]['questions'][cardIdx]['question']}</Text>
                                </Fragment>
                            )
                            : (
                                <Fragment>
                                    <Text>{cardIdx + 1} / {rows[deckId]['questions'].length}</Text>
                                    <Text style={styles.title}>{rows[deckId]['questions'][cardIdx]['answer']}</Text>
                                </Fragment>
                            )
                    : (
                        <Fragment>
                            <Text>0 / 0</Text>
                            <Text></Text>
                        </Fragment>
                    )
                }
                <TouchableOpacity onPress={this.showAnswer}>
                    <Text style={styles.answerBtn}>{isQuestion === true ? 'Answer' : 'Question'}</Text>
                </TouchableOpacity>
                <TextButton style={{ backgroundColor: green, color: white }} onPress={this.onClickCorrect}>
                    Correct
                </TextButton>
                <TextButton style={{ backgroundColor: red, color: white, marginTop: 10 }} onPress={this.onClickIncorrect}>
                    Incorrect
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
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10,
    },
    answerBtn: {
        fontSize: 15,
        color: red,
        textAlign: 'center',
        marginBottom: 55,
    },
})

export default QuizView