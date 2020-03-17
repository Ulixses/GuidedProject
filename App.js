// import App from './part1'
// export default App;

import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './part2/HomeScreen';
import AddIngredient from './part2/AddIngredient';
import ViewAll from './part2/ViewAll';
import DeleteIngredient from './part2/DeleteIngredient';

const App = createStackNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
  ViewAll: {
    screen: ViewAll,
    navigationOptions: {
      title: 'View All',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
  Add: {
    screen: AddIngredient,
    navigationOptions: {
      title: 'Add',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
  Delete: {
    screen: DeleteIngredient,
    navigationOptions: {
      title: 'Delete',
      headerStyle: { backgroundColor: '#3a59b7' },
      headerTintColor: '#ffffff',
    },
  },
});
export default createAppContainer(App);