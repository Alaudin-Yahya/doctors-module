import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from './Home';
import { Details } from './details';

export const FeedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: 'Twitter' }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerTitle: 'Tweet' }}
      />
    </Stack.Navigator>
  );
};