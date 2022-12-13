import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import StickyFooter from './Screens/StickyFooter';
import Gallery from './Screens/Gallery';
import TestScreen from './Screens/Test';
import LoginScreen from './Screens/LoginScreen';
import DotAnimation from './Screens/DotAnimation';
import TryScreen from './Screens/TryScreen';
import AnimatedTabs from './Screens/AnimatedTabs';


function App() {

  const { Screen, Navigator } = createStackNavigator();

  return(
    <NavigationContainer>
      <Navigator initialRouteName={'AccordionMenu'}>
        <Screen name='StickyFooter' component={StickyFooter} options={{headerShown: false}} />
        <Screen name='Gallery' component={Gallery} options={{headerShown: false}}/>
        <Screen name='TestScreen' component={TestScreen} options={{headerShown: false}}/>
        <Screen name='LoginScreen' component={LoginScreen} options={{headerShown: false}}/>
        <Screen name='DotAnimation' component={DotAnimation} options={{headerShown: false}}/>
        <Screen name='AnimatedTabs' component={AnimatedTabs} options={{headerShown: false}}/>
        <Screen name='TryScreen' component={TryScreen} options={{headerShown: false}}/>
        <Screen name='AccordionMenu' component={AccordionMenu} options={{headerShown: false}}/>
      </Navigator>
    </NavigationContainer>
  );
}

export default App;
