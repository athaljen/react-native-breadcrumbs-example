'use strict;';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Root from './src/navigation';

const App = () => {
  return <Root />;
};

const styles = StyleSheet.create({
  App: {flex: 1},
});

export default memo(App);
