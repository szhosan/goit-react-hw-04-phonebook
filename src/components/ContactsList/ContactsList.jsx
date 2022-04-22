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

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ContactsList;
