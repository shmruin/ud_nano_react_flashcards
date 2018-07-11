import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, TextInput } from 'react-native'
import { black, white } from '../utils/colors'
import { saveDeckTitle, getDecks } from '../utils/helper'
import TextButton from './TextButton'


class NewDeckView extends Component {
    state = {
        text: '',
    }

    submitDeck = () => {
        saveDeckTitle(this.state.text).then((value) => {
            this.setState({
                text: '',
            })
        })
    }

    render() {
        return (
            <View style={styles.contentContainer}>
                <Text style={styles.title}>What is the title of your new deck?</Text>
                <TextInput
                    style={styles.titleInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                    placeholder='Deck Title'
                />
                <TextButton style={{backgroundColor: black, color: white}} onPress={this.submitDeck}>
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
    title: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 55,
    },
    titleInput: {
        height: 25,
        borderColor: black,
        borderWidth: 1,
        marginBottom: 20,
    }
})

export default NewDeckView