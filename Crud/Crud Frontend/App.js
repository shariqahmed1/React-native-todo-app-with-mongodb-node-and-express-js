import React from 'react';
import TodoList from './screens/todolist.js';
import { createStackNavigator,createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  Home: {
    screen: TodoList
  }
});

const AppNav =  createAppContainer(AppNavigator);

export default class App extends React.Component {
  
  state = {
    isLoading : true,
  }  

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    .then(()=>{
      this.setState({isLoading:false})
    });
  }

  render() {
    return (
      !this.state.isLoading && <AppNav />
    );
  }
}
