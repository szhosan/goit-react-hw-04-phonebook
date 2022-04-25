import { useState, useEffect } from 'react';
import Section from './Section/Section';
import AddContactForm from './AddContactForm/AddContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import ContactSearch from './ContactSearch/ContactSearch';

const LOCAL_STORAGE_KEY = 'contacts';

const useLocalStorage = defaultValue => {
  const [state, setState] = useState(() => {
    return JSON.parse(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? defaultValue
    );
  });

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

function App() {
  const [contacts, setContacts] = useLocalStorage([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  const nameAlreadyExist = (contacts, nameToAdd) => {
    return contacts.find(
      contact => contact.name.toLowerCase() === nameToAdd.toLowerCase()
    );
  };

  const formSubmitHandler = data => {
    setContacts(prevState => {
      if (nameAlreadyExist(prevState, data.name)) {
        alert(`${data.name} is already in contacts`);
        return [...prevState];
      }
      return [...prevState, { id: nanoid(), ...data }];
    });
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleSearchContact = e => {
    setFilter(e.currentTarget.value);
  };

  const onDeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  return (
    <>
      <Section title="Phonebook">
        <AddContactForm onSubmit={formSubmitHandler} />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts">
          <ContactSearch value={filter} onChange={handleSearchContact} />
          <ContactsList
            contacts={getFilteredContacts()}
            onDeleteContact={onDeleteContact}
          />
        </Section>
      )}
    </>
  );
}

export default App;
