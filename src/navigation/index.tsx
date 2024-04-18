'use strict;';
import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Home from '../screens/Home';

type StackParamList = {Home: {name: string}};

export type StackScreenProps<S extends keyof StackParamList> = {
  route: RouteProp<StackParamList, S>;
  navigation: NativeStackNavigationProp<StackParamList, S>;
};

const Stack = createNativeStackNavigator<StackParamList>();

///root navigator

const Root = memo(() => {
  return (
    <View style={styles.Root}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{animation: 'default', headerBackTitleVisible: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
});

const styles = StyleSheet.create({
  Root: {flex: 1},
});

export default Root;
