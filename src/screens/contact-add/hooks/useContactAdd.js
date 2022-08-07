import {useEffect, useState} from 'react';
import {contactAPI} from '../../../api/client';

const useContactAdd = ({reset, setValue, navigationType, userId}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (navigationType === 'view' && userId) {
      const runGetContact = async () => {
        setLoading(true);
        const response = await contactAPI.getContact(userId);
        reset({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          photo: response.data.data.photo,
        });
        setValue('age', `${response.data.data.age}`, {shouldValidate: true});
        setLoading(false);
      };
      runGetContact();
    }
  }, [navigationType, reset, setValue, userId]);

  return {
    contactDetailLoading: loading,
  };
};

export default useContactAdd;
