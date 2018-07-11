import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { orange, gray } from '../utils/colors'


class DeckListRow extends Component {
    render() {

        const { id, title, numbers, clickDetail } = this.props

        return (
            <TouchableWithoutFeedback onPress={() => clickDetail(id, title, numbers)}>
                <View style={styles.listItem}>
                    <Text style={[styles.listText, { fontSize: 25 }]}>{title}</Text>
                    <Text style={[styles.listText, {color: gray}]}>{numbers} cards</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: orange,
        margin: 5,
        paddingTop: 12,
        paddingBottom: 12,
    },
    listText: {
        textAlign: 'center',
    }
});

export default DeckListRow