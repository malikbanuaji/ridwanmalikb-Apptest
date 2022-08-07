import * as React from 'react';
import {useRoute} from '@react-navigation/native';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {contactAPI} from '../../api/client';
import {Button, Pressable, ProfilePicture, ProfileText} from '../../components';
import Constants from '../../constants/constants';
import {fetchAllContact} from '../../features/contact/contactSlice';
import colors from '../../theme/colors';
import fontSize from '../../typography/fontSize';
import TextInputController from './components/text-input-controller';
import useContactAdd from './hooks/useContactAdd';

const size = 130;

const SubmittingBadge = () => (
  <View>
    <Text style={styles.submitText}>Submitting..</Text>
  </View>
);

const ContactAdd = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();

  const route = useRoute();
  const userId = route.params?.id;
  const navigationType = route.params?.type;

  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isValid},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      photo: 'N/A',
    },
  });

  useContactAdd({
    reset,
    setValue,
    navigationType,
    userId,
  });

  const {firstName, lastName} = watch();

  const _handleOnPressImage = onChange => () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 200,
      height: 200,
      cropping: true,
    })
      .then(image => {
        onChange(`data:${image.mime};base64,${image.data}`);
      })
      .catch(() => {});
  };

  const _submitUpdateContact = async data => {
    try {
      // setLoading(true);
      await contactAPI.updateContact(userId, {
        ...data,
        photo: data.photo ? data.photo : 'N/A',
      });
      ToastAndroid.show('Contact saved', ToastAndroid.SHORT);
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      ToastAndroid.show('Failed to update contact', ToastAndroid.SHORT);
    } finally {
      // setLoading(false);
    }
  };

  const _submitAddContact = async data => {
    try {
      // setLoading(true);
      await contactAPI.addContact({
        ...data,
        photo: data.photo ? data.photo : 'N/A',
      });
      console.log(data);
      ToastAndroid.show('New contact has been added', ToastAndroid.SHORT);
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Failed to add new contact', ToastAndroid.SHORT);
    } finally {
      // setLoading(false);
    }
  };

  const _deleteContact = async () => {
    try {
      // setLoading(true);
      await contactAPI.deleteContact(userId);
      ToastAndroid.show('Contact deleted', ToastAndroid.SHORT);
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      ToastAndroid.show('Failed to delete contact', ToastAndroid.SHORT);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.formContainer}>
          <Controller
            name="photo"
            control={control}
            render={({field: {onChange, value}}) => {
              return (
                <View style={styles.imageFormContainer}>
                  {value === 'N/A' ? (
                    <View style={styles.profilePictureAbs}>
                      <ProfileText
                        fontSize={52}
                        firstName={firstName}
                        lastName={lastName}
                        size={size}
                      />
                    </View>
                  ) : (
                    <View style={styles.profilePictureAbs}>
                      <ProfilePicture size={size} photoUri={value} />
                    </View>
                  )}
                  <Pressable onPress={_handleOnPressImage(onChange)}>
                    <View style={styles.overlayIcon}>
                      <Icon
                        name="edit"
                        size={50}
                        color={'rgba(255,255,255,0.5)'}
                      />
                    </View>
                  </Pressable>
                </View>
              );
            }}
          />
          <TextInputController
            rules={{
              required: 'This is required',
              pattern: {
                value: /^[A-Za-z0-9]+$/gm,
                message: 'Only alpha-numeric allowed',
              },
              minLength: {
                value: 3,
                message: 'Min. length 3',
              },
              maxLength: {
                value: 30,
                message: 'Max. length 30',
              },
            }}
            control={control}
            errors={errors}
            name="firstName"
            label="First name"
            placeholder="e.g. John"
          />
          <TextInputController
            rules={{
              required: 'This is required',
              pattern: {
                value: /^[A-Za-z0-9]+$/gm,
                message: 'Only alpha-numeric allowed',
              },
              minLength: {
                value: 3,
                message: 'Min. length 3',
              },
              maxLength: {
                value: 30,
                message: 'Max. length 30',
              },
            }}
            control={control}
            errors={errors}
            name="lastName"
            label="Last name"
            placeholder="e.g. Doe"
          />
          <TextInputController
            keyboardType="number-pad"
            rules={{
              required: 'This is required',
              min: {
                value: 1,
                message: 'Minimum age is 1',
              },
              max: {
                value: 100,
                message: 'Minimum age is 100',
              },
              pattern: {
                value: /^[0-9]+$/gm,
                message: 'Must be number only',
              },
            }}
            control={control}
            errors={errors}
            name="age"
            label="Age"
            placeholder="e.g. 20"
          />
        </View>
        {loading ? (
          <SubmittingBadge />
        ) : (
          <View style={styles.buttonContainer}>
            {navigationType === Constants.CONTACT_ADD_ACTION_TYPE.ADD ? (
              <Button
                disabled={!isValid}
                title="Add Contact"
                onPress={handleSubmit(_submitAddContact)}
                type="primary"
              />
            ) : (
              <>
                <Button
                  disabled={!isValid}
                  title="Save Contact"
                  onPress={handleSubmit(_submitUpdateContact)}
                  type="primary"
                />
                <View style={styles.deleteButton}>
                  <Button
                    title="Delete Contact"
                    onPress={() =>
                      Alert.alert(
                        'Deleting',
                        'Are you you want to delete this contact?',
                        [
                          {text: 'CANCEL'},
                          {
                            text: 'YES',
                            onPress: _deleteContact,
                          },
                        ],
                        {cancelable: false},
                      )
                    }
                    type="danger"
                  />
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ContactAdd;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.chat,
    flex: 1,
  },
  textInput: {
    fontSize: fontSize.normal,
    paddingHorizontal: 0,
    paddingVertical: 5,
    color: colors.white,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  textInputError: {
    borderBottomColor: colors.high,
  },
  errorMessageContainer: {
    marginTop: 4,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  deleteButton: {
    marginTop: 10,
  },
  textInputControl: {
    marginTop: 15,
  },
  formContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: colors.server,
    borderRadius: 8,
  },
  imageFormContainer: {
    borderRadius: 8,
    justifyContent: 'center',
    height: size,
    alignItems: 'center',
    overflow: 'hidden',
  },
  profilePictureAbs: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayIcon: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    fontSize: fontSize.normal,
    color: colors.grey,
    textAlign: 'center',
  },
});
