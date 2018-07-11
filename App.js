import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { createMaterialTopTabNavigator, createStackNavigator, SafeAreaView } from 'react-navigation'
import { white } from './utils/colors'
import DeckListView from './components/DeckListView'
import NewDeckView from './components/NewDeckView'
import { Constants } from 'expo'
import { setDummyData } from './utils/api'
import IndividualDeckView from './components/IndividualDeckView'
import QuizView from './components/QuizView'


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
      title: 'Give me the Deck title',
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 }
    })
  },
  Quiz: {
    screen: QuizView,
    navigationOptions: ({ navigation }) => ({
      title: 'Give me the Quiz title',
      headerStyle: { height: 56 },
      headerTitleStyle: { textAlign: 'left', flex: 1 },
    })
  }
})

export default class App extends React.Component {

  componentDidMount = () => {
    setDummyData()

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