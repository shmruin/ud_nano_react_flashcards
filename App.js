import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator, SafeAreaView, HeaderBackButton } from 'react-navigation'
import { Constants } from 'expo'
import { setDummyData } from './utils/api'
import { setNotification } from './utils/helper'
import { white } from './utils/colors'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import IndividualDeckView from './components/IndividualDeckView'
import QuizView from './components/QuizView'
import QuizResult from './components/QuizResult'
import NewQuestion from './components/NewQuestionView'


function FlashCardStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Deck: {
    screen: DeckListView,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  NewDeck: {
    screen: NewDeckView,
    navigationOptions: {
      tabBarLabel: 'NEWDECK',
    }
  },
}, {
    navigationOptions: {
      header: null
    }, tabBarOptions: {
      height: 56,
    }
  }
)

const Stacks = createStackNavigator({
  Home: { screen: Tabs,
    navigationOptions: {
     header: null,
  }
},
  DeckDetail: { 
    screen: IndividualDeckView,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.title,
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 }
    })
  },
  Quiz: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz',
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 },
    })
  },
  QuizResult: {
    screen: QuizResult,
    navigationOptions: ({ navigation }) => ({
      title: 'Quiz Result',
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 },
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Home')} />
    })
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: ({ navigation }) => ({
      title: 'Add A New Card',
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 },
    })
  }
})

export default class App extends React.Component {

  componentDidMount = () => {
    setDummyData()
    setNotification()

    if (Platform.OS === "android") {
      SafeAreaView.setStatusBarHeight(0);
    }
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <FlashCardStatusBar backgroundColor={white} barStyle="light-content" />
        <Stacks />
      </View>
    );
  }
}