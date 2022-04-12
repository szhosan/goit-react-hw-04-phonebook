import React, { Component } from 'react';
import Section from './Section/Section';
import AddContactForm from './AddContactForm/AddContactForm';
import { nanoid } from 'nanoid';
import ContactsList from './ContactsList/ContactsList';
import ContactSearch from './ContactSearch/ContactSearch';

const LOCAL_STORAGE_KEY = 'contacts';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(nextContacts));
    }
  }

  nameAlreadyExist(contacts, nameToAdd) {
    return contacts.find(
      contact => contact.name.toLowerCase() === nameToAdd.toLowerCase()
    );
  }

  formSubmitHandler = data => {
    this.setState(prevState => {
      if (this.nameAlreadyExist(prevState.contacts, data.name)) {
        alert(`${data.name} is already in contacts`);
        return { contacts: [...prevState.contacts] };
      }
      return { contacts: [...prevState.contacts, { id: nanoid(), ...data }] };
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleSearchContact = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  onDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <AddContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        {this.state.contacts.length > 0 && (
          <Section title="Contacts">
            <ContactsList
              contacts={this.getFilteredContacts()}
              onDeleteContact={this.onDeleteContact}
            >
              <ContactSearch
                value={this.filter}
                onChange={this.handleSearchContact}
              />
            </ContactsList>
          </Section>
        )}
      </>
    );
  }
}

export default App;
