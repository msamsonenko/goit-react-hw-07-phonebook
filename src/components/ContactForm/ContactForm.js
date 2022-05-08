import { useState } from 'react';
import shortid from 'shortid';
import { add } from 'redux/actions';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContactFormContainer,
  ContactFormLabel,
  ContactFormInput,
  ContactFormBtn,
} from './ContactForm.styled';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  const handleInputChange = e => {
    const { name } = e.target;

    switch (name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'number':
        setNumber(e.target.value);
        break;
      default:
        return;
    }
    setId(shortid.generate());
  };
  const onFormSubmit = e => {
    e.preventDefault();
    const isUserAdded = contacts.find(contact => contact.name === name);
    if (isUserAdded) {
      return alert(`User ${name} is already in contacts`);
    }
    dispatch(add({ name, number, id }));
    reset();
  };

  const reset = () => {
    setId('');
    setName('');
    setNumber('');
  };
  return (
    <ContactFormContainer onSubmit={onFormSubmit}>
      <ContactFormLabel>Name</ContactFormLabel>
      <ContactFormInput
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
        aoutocomplete="off"
      />
      <ContactFormLabel>Number</ContactFormLabel>
      <ContactFormInput
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
      />
      <ContactFormBtn type="submit">Add Contact</ContactFormBtn>
    </ContactFormContainer>
  );
}
