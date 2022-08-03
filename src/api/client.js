import axios from 'axios';

const client = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com/',
  timeout: 3000,
});

const getAllContact = () => client.get('/contact');

const addContact = payload => client.post('/contact', payload);

const getContact = id => client.get(`/contact/${id}`);

const updateContact = (id, payload) => client.put(`/contact/${id}`, payload);

const deleteContact = (id, payload) => client.delete(`/contact/${id}`, payload);

export const contactAPI = {
  getAllContact,
  addContact,
  getContact,
  updateContact,
  deleteContact,
};
