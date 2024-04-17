'use strict;';
import {
  NavigationContainer,
  NavigationState,
  RouteProp,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React, {memo, useCallback, useEffect, useMemo, useRef} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type StackParamList = {Home: {name: string}};

type StackScreenProps<S extends keyof StackParamList> = {
  route: RouteProp<StackParamList, S>;
  navigation: NativeStackNavigationProp<StackParamList, S>;
};

const Stack = createNativeStackNavigator<StackParamList>();

const Home = ({route, navigation}: StackScreenProps<'Home'>) => {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({animated: false});
    if (route.params?.name) navigation.setOptions({title: route.params?.name});
  }, [navigation, route.params?.name]);

  const Name = useMemo(() => Math.ceil(Math.random() * 10000), []);

  const NavigationData = useMemo(
    () => navigation.getState(),
    [route, navigation],
  );

  const gotoNewScreen = useCallback(() => {
    navigation.push('Home', {name: Name.toString()});
  }, [Name]);

  const navigateToSpecific = useCallback(
    (item: NavigationState['routes'][0]) => {
      const targetIndex = NavigationData.routes.findIndex(
        route => route.key === item.key,
      );

      if (targetIndex !== -1 && targetIndex < NavigationData.index) {
        navigation.pop(NavigationData.index - targetIndex);
      }
    },
    [NavigationData],
  );

  return (
    <View style={styles.App}>
      <View>
        <ScrollView horizontal ref={scrollRef}>
          {NavigationData.routes.map((item, index) => (
            <Text
              key={index.toString()}
              style={styles.text}
              onPress={navigateToSpecific.bind(null, item)}>
              {item?.params?.name ? item.params?.name : route.name}
              {'>'}
            </Text>
          ))}
        </ScrollView>
      </View>

      <Pressable onPress={gotoNewScreen} style={styles.press}>
        <Text style={styles.text}>{Name}</Text>
      </Pressable>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.App}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{animation: 'slide_from_right'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  App: {flex: 1},
  press: {alignSelf: 'center', marginTop: 100},
  text: {marginRight: 10, color: '#000000'},
});

export default memo(App);
