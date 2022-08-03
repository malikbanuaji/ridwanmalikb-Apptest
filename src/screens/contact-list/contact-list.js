import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
// import BottomSheet from '@gorhom/bottom-sheet';
import {AlertModal} from '../../components';
import colors from '../../theme/colors';
import ContactItem from './contact-item';
import Header from './header';
import ModalContent from './modal-content';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllContact,
  selectAllContact,
} from '../../features/contact/contactSlice';

const LIST_CONTACT = {
  data: [
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo: 'N/A',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
    {
      id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Bilbo',
      lastName: 'Baggins',
      age: 111,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    },
  ],
};

const modalContentAction = [
  {
    key: 'view',
    label: 'View',
    onPress: () => {},
  },
  {
    key: 'edit',
    label: 'Edit',
    onPress: () => {},
  },
  {
    key: 'delete',
    label: 'Delete',
    onPress: () => {},
  },
];

const ContactList = ({navigation}) => {
  const [selectedContact, setSelectedContact] = useState({
    id: null,
    index: null,
  });

  const dispatch = useDispatch();
  const contactList = useSelector(selectAllContact);

  useEffect(() => {
    dispatch(fetchAllContact());
  }, [dispatch]);

  const _renderItem = ({item, index}) => {
    return (
      <ContactItem
        profilePicture={item.photo}
        firstName={item.firstName}
        lastName={item.lastName}
        onPress={() =>
          navigation.navigate('ContactAdd', {type: 'view', index, id: item.id})
        }
        onLongPress={() => {
          setSelectedContact({id: item.id, index});
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Header onPressAdd={() => navigation.navigate('ContactAdd')} /> */}
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={contactList}
        keyExtractor={(item, index) => `${item.id} ${index}`}
        renderItem={_renderItem}
      />
      <AlertModal
        onBackButtonPress={() => setSelectedContact({id: null, index: null})}
        onBackdropPress={() => setSelectedContact({id: null, index: null})}
        isVisible={selectedContact.id !== null}>
        <View style={styles.modalContentContainer}>
          <ModalContent
            // data={contactList[selectedContact.index]}
            actions={modalContentAction}
          />
          <View />
        </View>
      </AlertModal>
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
