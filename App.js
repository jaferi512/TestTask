/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Nav} from './src/Navigation/Nav';
import {store} from './src/Redux/store';
import {Provider} from 'react-redux';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};

export default App;
