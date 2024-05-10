/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, { useEffect } from 'react';
import {

  StyleSheet,
  Text,
  View,
} from 'react-native';


import { initializeSslPinning,addSslPinningErrorListener} from 'react-native-ssl-public-key-pinning';


const App = () => {
  useEffect(() => {
    const setupSslPinning = async () => {
      try {
        await initializeSslPinning({
          'google.com': {
            includeSubdomains: true,
            publicKeyHashes: [
              'CLOmM1/OXvSPjw5UOYbAf9GKOxImEp9hhku9W90fHMk=',
              'hxqRlPTu1bMS/0DITB1SSu0vd4u/8l8TjPgfaAp63Gc=',
              'Vfd95BwDeSQo+NUYxVEEIlvkOlWY2SalKK1lPhzOx78=',
              'QXnt2YHvdHR3tJYmQIr0Paosp6t/nggsEGD4QJZ3Q0g=',
              'mEflZT5enoR1FuXLgYYGqnVEoZvmf9c2bVBpiOjYQ0c=',
            ],
          },
        });
        console.log('SSL pinning initialized successfully');
      } catch (error) {
        console.error('Failed to initialize SSL pinning', error);
      }
    };

    setupSslPinning();
    // This request will have public key pinning enabled
    const callApi = async() => {
      try {
      const response = await fetch('https://www.google.com');//await axios.get('https://www.google.com');
      //console.log(response);
    } catch (error) {
      console.log(error);
    }
    }
    callApi();
  }, []);
  useEffect(() => {
    const subscription = addSslPinningErrorListener((error) => {
      // Triggered when an SSL pinning error occurs due to pin mismatch
      console.log(error.serverHostname);
      console.log(error.message);
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SSL Pinning Initialized!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});


export default App;
