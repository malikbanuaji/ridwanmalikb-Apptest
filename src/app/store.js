import {configureStore} from '@reduxjs/toolkit';
import contactSlice from '../features/contact/contactSlice';

export default configureStore({
  reducer: {
    contact: contactSlice,
  },
});
