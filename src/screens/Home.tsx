import {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '../navigation';
import {NavigationState} from '@react-navigation/native';
import {Folders} from '../constants';

const getRandomFolder = () =>
  Folders[Math.floor(Math.random() * Folders.length)];

///main screen

const Home = ({route, navigation}: StackScreenProps<'Home'>) => {
  const scrollRef = useRef<ScrollView>(null);

  //scroll to end and set current screen name
  //use UseEffect instead of useLayoutEffect to avoid flickering when scrolling to end on Android
  useEffect(() => {
    scrollRef.current?.scrollToEnd({animated: false});
  }, []);

  useLayoutEffect(() => {
    if (route.params?.name) navigation.setOptions({title: route.params?.name});
  }, [navigation, route.params?.name]);

  //generate random folder name for dynamic naming
  const Name = getRandomFolder();
  ///current navigation state
  const NavigationData = navigation.getState();

  //navigate to new screen
  const gotoNewScreen = useCallback(() => {
    navigation.push('Home', {name: Name});
  }, [Name]);

  //navigate to specific screen
  //here i used pop to navigate back to the specific screen without loosing state
  const navigateToSpecific = useCallback(
    (item: NavigationState['routes'][0]) => {
      const targetIndex = NavigationData.routes.findIndex(
        route => route.key === item.key,
      );

      //if we find the target screen and it's index is less than current screen index then pop to that screen
      if (targetIndex !== -1 && targetIndex < NavigationData.index) {
        navigation.pop(NavigationData.index - targetIndex);
      }
    },
    [NavigationData],
  );

  return (
    <View style={styles.App}>
      <View style={styles.crumbs}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          ref={scrollRef}>
          {/* mapped through all the routes and displayed the name of the screen */}
          {NavigationData.routes.map((item, index) => (
            <Text
              key={index.toString()}
              style={styles.text}
              onPress={navigateToSpecific.bind(null, item)}>
              {item?.params?.name ? item.params?.name : route.name}
              {' >   '}
            </Text>
          ))}
        </ScrollView>
      </View>

      <Pressable onPress={gotoNewScreen} style={styles.press}>
        <Text style={styles.text}>
          {Name}
          {'   >'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  App: {flex: 1},
  press: {
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: '#e8e6e9',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 5,
    elevation: 8,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {color: '#000000'},
  crumbs: {padding: 10},
});

export default memo(Home);
