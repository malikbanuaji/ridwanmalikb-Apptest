/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import BottomSheet from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ContactList, ContactAdd} from './src/screens';
import Header from './src/components/header/header';
import {Pressable} from './src/components';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import colors from './src/theme/colors';

const Stack = createNativeStackNavigator();
import store from './src/app/store';
import {Provider} from 'react-redux';
import Constants from './src/constants/constants';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                title: 'Contact',
                header: props => {
                  return (
                    <Header
                      title={props.options.title}
                      rightElement={() => (
                        <Pressable
                          onPress={() => {
                            props.navigation.navigate('ContactAdd', {
                              type: Constants.CONTACT_ADD_ACTION_TYPE.ADD,
                            });
                          }}>
                          <View style={styles.addIconContainer}>
                            <Icon name="plus" size={24} color={colors.white} />
                          </View>
                        </Pressable>
                      )}
                    />
                  );
                },
              }}
              name="ContactList"
              component={ContactList}
            />
            <Stack.Screen
              options={{
                title: 'Contact Detail',
                header: props => {
                  return <Header canGoBack title={props.options.title} />;
                },
              }}
              name="ContactAdd"
              component={ContactAdd}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  addIconContainer: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
