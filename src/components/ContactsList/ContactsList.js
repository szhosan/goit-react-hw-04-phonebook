import PropTypes from 'prop-types';
import React from 'react';
import s from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact, children }) => (
  <>
    {children}
    <ul className={s.list}>
      {contacts.map(contact => (
        <li key={contact.id}>
          <div className={s.listItemContainer}>
            {contact.name}: {contact.number}
            <button
              className={s.button}
              onClick={() => onDeleteContact(contact.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  </>
);
export default ContactsList;

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
};
