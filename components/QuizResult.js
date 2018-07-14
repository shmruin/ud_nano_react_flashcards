import React, { Component, Fragment } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { white, black } from '../utils/colors'
import TextButton from './TextButton'


class QuizResult extends Component {

    goHome = () => {
        this.props.navigation.navigate('Home')
    }

    render() {

        const { navigation } = this.props
        const score = navigation.getParam('score', -1)
        const total = navigation.getParam('total', -1)

        return (
            <View style={styles.container}>
                <Text style={styles.title}>You've got {score} of {total} !</Text>
                <TextButton style={{ backgroundColor: black, color: white }} onPress={this.goHome}>
                    OK
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