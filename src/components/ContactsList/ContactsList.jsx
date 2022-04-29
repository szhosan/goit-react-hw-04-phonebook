import PropTypes from 'prop-types';
import React from 'react';
import s from './ContactsList.module.css';

const ContactsList = ({ contacts, onDeleteContact }) => (
  <>
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id}>
          <div className={s.listItemContainer}>
            {name}: {number}
            <button className={s.button} onClick={() => onDeleteContact(id)}>
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
};

export default ContactsList;
