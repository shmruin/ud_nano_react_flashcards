import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { white, green, red } from '../utils/colors'
import { getDecks, removeCard } from '../utils/helper'
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
                cardIdx: 0,
                isQuestion: true,
                rows: JSON.parse(value),
                score: 0,
            })
        })
    }

    onClickCorrect = (id) => {
        //End case test
        if(this.EndTest() === true) {
            this.props.navigation.navigate('QuizResult', {
                id: id,
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

    onClickIncorrect = (id) => {
        //End case test
        if(this.EndTest() === true) {
            this.props.navigation.navigate('QuizResult', {
                id: id,
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

    removeThisCard = (deckId, cardIdx) => {
        Alert.alert(
            `Do you want to remove this card?`,
            '',
            [{ text: 'YES', onPress: () => { removeCard(deckId, cardIdx, this.removeCardCallback)}},
            { text: 'NO' },
            ],
            { cancelable: false },
        )
    }

    removeCardCallback = (result) => {
        this.props.navigation.navigate('Home')
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
                                    <View style={styles.optionWrapper}>
                                        <View>
                                            <Text>{cardIdx + 1} / {rows[deckId]['questions'].length}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.cardDeleteBtn} onPress={() => this.removeThisCard(deckId, cardIdx)}>
                                            <Ionicons name="md-trash" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.title}>{rows[deckId]['questions'][cardIdx]['question']}</Text>
                                </Fragment>
                            )
                            : (
                                <Fragment>
                                    <View style={styles.optionWrapper}>
                                        <View>
                                            <Text>{cardIdx + 1} / {rows[deckId]['questions'].length}</Text>
                                        </View>
                                        <TouchableOpacity style={styles.cardDeleteBtn} onPress={() => this.removeThisCard(deckId, cardIdx)}>
                                            <Ionicons name="md-trash" size={20} color="black" />
                                        </TouchableOpacity>
                                    </View>
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
                <TextButton style={{ backgroundColor: green, color: white }} onPress={() => this.onClickCorrect(deckId)}>
                    Correct
                </TextButton>
                <TextButton style={{ backgroundColor: red, color: white, marginTop: 10 }} onPress={() => this.onClickIncorrect(deckId)}>
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
    cardDeleteBtn: {
        width: 25,
    },
    optionWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
    },
})

export default QuizView