import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllContact,
  selectAllContact,
} from '../../features/contact/contactSlice';
import colors from '../../theme/colors';
import ContactItem from './components/contact-item';

const ContactList = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const contactList = useSelector(selectAllContact);

  const _handleOnRefresh = async () => {
    setLoading(true);
    await dispatch(fetchAllContact());
    setLoading(false);
  };

  useEffect(() => {
    const fetchContact = async () => {
      setLoading(true);
      await dispatch(fetchAllContact());
      setLoading(false);
    };
    fetchContact();
  }, [dispatch]);

  const _handleOnPressItem = ({id, index}) => {
    navigation.navigate('ContactAdd', {type: 'view', index, id: id});
  };

  const _renderItem = ({item, index}) => {
    return (
      <ContactItem
        id={item.id}
        index={index}
        profilePicture={item.photo}
        firstName={item.firstName}
        lastName={item.lastName}
        onPress={_handleOnPressItem}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        testID="ContactList"
        refreshing={loading}
        onRefresh={_handleOnRefresh}
        contentContainerStyle={styles.flatListContentContainer}
        data={contactList}
        keyExtractor={(item, index) => `${item.id} ${index}`}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.chat,
    flex: 1,
  },
  modalContentContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: 'center',
  },
  flatListContentContainer: {
    paddingTop: 5,
    paddingBottom: 20,
  },
});

export default ContactList;
