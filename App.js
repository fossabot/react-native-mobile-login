import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { generateUAFUrl } from './helpers';
import { UAF_OPERATION_TYPES } from './const';

export default class App extends React.Component {
  handlePress () {
    Linking.openURL(
      generateUAFUrl(
        UAF_OPERATION_TYPES.DISCOVER, UAF_OPERATION_TYPES.DISCOVER_RESULT, 'asd', 'as'));
  }

  render () {
    return (
      <View style={styles.container}>
        <Text onPress={this.handlePress}>Click me and open url</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
