import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, green, red } from '../utils/colors'
import { getDecks } from '../utils/helper'
import TextButton from './TextButton'


class QuizView extends Component {
    state = {
        rows: null,
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

    }

    onClickIncorrect = () => {

    }

    render() {

        const { rows } = this.state
        const { navigation } = this.props
        const deckId = navigation.getParam('id', null)

        return (
            <View style={styles.container}>
                <Text>2/2</Text>
                { rows !== null
                  ? <Text style={styles.title}>{rows[deckId]['questions'][0]['question']}</Text>
                  : <Text></Text>
                }
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
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 55,
    },
})

export default QuizView