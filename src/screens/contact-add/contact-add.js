import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import colors from '../../theme/colors';
import fontSize from '../../typography/fontSize';
import {Pressable, ProfilePicture, Button} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import {contactAPI} from '../../api/client';
import Constants from '../../constants/constants';
import ProfileText from '../../components/profile-picture/profile-text';
import {useDispatch} from 'react-redux';
import {
  deleteContact,
  fetchAllContact,
} from '../../features/contact/contactSlice';

const ErrorMessage = ({name, errors}) => {
  return (
    <Text
      style={{
        color: '#ff3800',
        fontSize: fontSize.small,
        letterSpacing: 0.1,
      }}>
      {errors[name] && errors[name].message}
    </Text>
  );
};

const TextInputEnhanced = ({
  onBlur,
  onChangeText,
  value,
  label,
  placeholder,
  isError,
}) => {
  const borderStyle = useMemo(
    () => (isError ? styles.textInputError : {}),
    [isError],
  );
  return (
    <View>
      <Text style={{color: colors.grey, fontSize: fontSize.small}}>
        {label}
      </Text>
      <TextInput
        style={{...styles.textInput, ...borderStyle}}
        placeholder={placeholder}
        placeholderTextColor={'#6c757a'}
        onBlur={onBlur}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const size = 130;

const TextInputController = ({
  control,
  errors,
  name,
  rules,
  label,
  placeholder,
}) => (
  <View style={styles.textInputControl}>
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
      }}
      render={({field: {onChange, onBlur, value}}) => (
        <TextInputEnhanced
          placeholder={placeholder}
          label={label}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          isError={errors[name]}
        />
      )}
    />
    <View style={styles.errorMessageContainer}>
      <ErrorMessage name={name} errors={errors} />
    </View>
  </View>
);

const SubmittingBadge = () => (
  <View>
    <Text style={styles.submitText}>Submitting..</Text>
  </View>
);

const ContactAdd = ({navigation}) => {
  const [loading, setLoading] = useState();
  const {
    watch,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors, isValid, isSubmitting},
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: '',
      photo: 'N/A',
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(isSubmitting);
  }, [isSubmitting]);

  const route = useRoute();

  const contactDetail = useRef();

  const userId = route.params?.id;
  const userIndex = route.params?.index;
  const navigationType = route.params?.type;
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
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (navigationType === 'view' && userId) {
      contactAPI.getContact(userId).then(response => {
        contactDetail.current = response.data.data;
        reset({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          photo: response.data.data.photo,
        });
        setValue('age', `${response.data.data.age}`, {shouldValidate: true});
      });
    }
  }, [navigationType, reset, setValue, userId]);

  const _submitUpdateContact = async data => {
    setLoading(true);
    try {
      await contactAPI.updateContact(userId, {
        ...data,
        photo: data.photo ? data.photo : 'N/A',
      });
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      // ignore error
    } finally {
      setLoading(false);
    }
  };

  const _submitAddContact = async data => {
    setLoading(true);
    try {
      await contactAPI.addContact({
        ...data,
        photo: data.photo ? data.photo : 'N/A',
      });
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      // ignore error
    } finally {
      setLoading(false);
    }
  };

  const _deleteAddContact = async () => {
    setLoading(true);
    try {
      await contactAPI.deleteContact(userId);
      dispatch(fetchAllContact());
      navigation.goBack();
    } catch (error) {
      // ignore error
    } finally {
      setLoading(false);
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
                            onPress: _deleteAddContact,
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
