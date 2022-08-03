import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {contactAPI} from '../../api/client';

export const fetchAllContact = createAsyncThunk(
  'contact/fetchAllContact',
  async () => {
    const response = await contactAPI.getAllContact();
    return response.data;
  },
);

export const fetchContactById = createAsyncThunk(
  'contact/fetchContactById',
  async contactId => {
    const response = await contactAPI.getContact(contactId);
    return response.data;
  },
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: [],
    errors: {
      fetchContactById: false,
      fetchAllContact: false,
      fetchAddContact: false,
      fetchUpdateContact: false,
      fetchDelteContact: false,
    },
  },
  reducers: {
    initContactData: (state, action) => {
      state.data = action.payload;
    },
    addContact: (state, action) => {
      state.data.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.data.splice(action.payload.index, 1);
    },
    updateContact: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAllContact.fulfilled, (state, action) => {
      state.data = action.payload.data;
    });
  },
});

export const selectAllContact = state => state.contact.data;

// Action creators are generated for each case reducer function
export const {initContactData, addContact, deleteContact, updateContact} =
  contactSlice.actions;

export default contactSlice.reducer;
