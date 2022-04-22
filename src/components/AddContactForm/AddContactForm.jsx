import { useState } from 'react';
import s from './AddContactForm.module.css';
import PropTypes from 'prop-types';

function AddContactForm({ onSubmit }) {
  const [state, setState] = useState({ name: '', number: '' });

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const reset = () => {
    setState({ name: '', number: '' });
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(state);

    reset();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.form_label}>
        Name
        <br />
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={state.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Number
        <br />
        <input
          type="tel"
          name="number"
          required
          value={state.number}
          onChange={handleChange}
        />
      </label>
      <br />
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

AddContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };

export default AddContactForm;
