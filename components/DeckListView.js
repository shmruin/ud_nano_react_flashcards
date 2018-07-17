import React, { Component } from 'react'
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native'
import { getDecks } from '../utils/helper'
import DeckListRow from './DeckListRow'
import { white } from '../utils/colors'


class DeckListView extends Component {
    state= {
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

    clickDetail = (id, title, cards) => {
        this.props.navigation.navigate('DeckDetail' ,{
            id: id,
            title: title,
            cards: cards,
        })
    }

    render() {
        const { rows } = this.state

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {  
                    rows !== null
                    ? Object.keys(rows).map((item, index) => (
                        <DeckListRow key={index} id={item} title={rows[item].title} numbers={rows[item].questions.length || 0} clickDetail={this.clickDetail}/>
                    ))
                    : null
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: white,
        paddingVertical: 20,
    }
})

export default DeckListView