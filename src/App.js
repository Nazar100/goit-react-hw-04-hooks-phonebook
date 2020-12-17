import shortid from 'shortid';

import React, { useState, useEffect } from 'react';
import './App.css';

import ContactsForm from './components/Form/ContactsForm';
import Contacts from './components/Contacts/Contacts';
import Filter from './components/Filter/Filter';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const [filterState, setFilterState] = useState('');

  const checkExistingContacts = name => {
    const isExistingContact = !!contacts.find(contact => {
      return contact.name === name;
    });

    isExistingContact && alert(`${name} is already in your contacts`);

    return !isExistingContact;
  };

  const addContact = contact => {
    const newContact = {
      id: shortid.generate(),
      ...contact,
    };

    setContacts(contacts => [...contacts, newContact]);
  };

  const deleteContact = e => {
    const key = e.target.dataset.key;

    const leftContacts = contacts.filter(contact => {
      return contact.id !== key;
    });
    setContacts(leftContacts);
  };

  const filterChange = e => {
    setFilterState(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filterState.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  const filteredContacts = getVisibleContacts();

  return (
    <div className="container">
      <div>
        <h1>Phonebook</h1>
        <ContactsForm
          onSubmit={addContact}
          checkExistingContacts={checkExistingContacts}
        />
        <Filter value={filterState} onChange={filterChange} />
      </div>
      <div>
        <h2>Contacts</h2>
        <Contacts contacts={filteredContacts} deleteContact={deleteContact} />
      </div>
    </div>
  );
}

export default App;
