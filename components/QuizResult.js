import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { clearNotification, setNotification } from '../utils/helper'
import { white, black } from '../utils/colors'
import TextButton from './TextButton'


class QuizResult extends Component {

    componentDidMount = () => {
        clearNotification()
            .then(setNotification)
    }

    goHome = () => {
        this.props.navigation.navigate('Home')
    }

    goRestart = (id) => {
        this.props.navigation.navigate('Quiz', {
            id: id,
        })
    }

    render() {

        const { navigation } = this.props
        const deckId = navigation.getParam('id', -1) 
        const score = navigation.getParam('score', -1)
        const total = navigation.getParam('total', -1)

        return (
            <View style={styles.container}>
                <Text style={styles.title}>You've got {score} of {total} !</Text>
                <TextButton style={{ backgroundColor: white, color: black }} onPress={this.goHome}>
                    Home
                </TextButton>
                <TextButton style={{ backgroundColor: black, color: white, marginTop: 10 }} onPress={() => this.goRestart(deckId)}>
                    Restart
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
        marginBottom: 55,
    },
})

export default QuizResult