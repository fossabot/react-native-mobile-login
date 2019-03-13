import React from 'react';
import { SafeAreaView, Alert, Linking, StyleSheet, Button, View, WebView } from 'react-native';
import { randomString, generateUAFUrl } from './helpers';
import { UAF_OPERATION_TYPES } from './const';
import Base64 from './base64';

export default class App extends React.Component {
  state = {};

  handleDiscoverPress () {
    const stateKey = randomString(32);
    this.setState({ stateKey });
    Linking.openURL(
      generateUAFUrl(
        UAF_OPERATION_TYPES.DISCOVER,
        UAF_OPERATION_TYPES.DISCOVER_RESULT,
        stateKey, {}));
  }

  handleCheckPolicyPress () {
    const stateKey = randomString(32);
    this.setState({ stateKey });
    Linking.openURL(
      generateUAFUrl(
        UAF_OPERATION_TYPES.CHECK_POLICY,
        UAF_OPERATION_TYPES.CHECK_POLICY_RESULT,
        stateKey, {}));
  }

  handleUAFOperationPress (op) {
    return () => {
      const stateKey = randomString(32);
      this.setState({ stateKey });
      Linking.openURL(
        generateUAFUrl(
          UAF_OPERATION_TYPES.UAF_OPERATION,
          UAF_OPERATION_TYPES.UAF_OPERATION_RESULT,
          stateKey, { op }));

    };
  }

  componentDidMount () {
    Linking.addEventListener('url', (event) => this.handleUrl(event.url));
  }

  handleUrl (url) {
    const { state, json } = Expo.Linking.parse(url).queryParams;
    console.log(JSON.parse(Base64.atob(json)));
    const { code, uafToken } = JSON.parse(Base64.atob(json));
    if (state && this.state.stateKey === state) {
      const alertText = code === 0
        ? 'UAF operation completed successfully'
        : `UAF operation completed with return code ${code}`;
      Alert.alert('', alertText);
      this.setState({ token: uafToken });
      console.log(JSON.parse(Base64.atob(json)));
    }
  }

  render () {
    const { token } = this.state;
    console.log(token);
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 1, background: 'green' }}>
          {/*<Button onPress={this.handleDiscoverPress} title='Call DISCOVER operation'/>*/}
          {/*<Button onPress={this.handleCheckPolicyPress} title='Call CHECK_POLICY operation'/>*/}
          <Button onPress={this.handleUAFOperationPress('Auth')} title='Login'/>
          <Button onPress={this.handleUAFOperationPress('Reg')} title='Register'/>
          <Button onPress={this.ref && this.ref.reload} title='Reload protected page'/>
        </View>
        <View style={{ flex: 1, background: 'red' }}>
          <WebView
            ref={ref => (this.ref = ref)}
            source={{ uri: `https://ultraauth-demo.herokuapp.com/api/example?token=${token}` }}/>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
