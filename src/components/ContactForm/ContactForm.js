import React, { Component } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  phoneInputId = nanoid();

  reset = () => {
    this.setState({ number: '', name: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmitHandle({
      name: this.state.name,
      number: this.state.number,
    });
    this.reset();
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.formLabel} htmlFor={this.nameInputId}>
          Name
        </label>
        <input
          className={css.formInput}
          type="text"
          pattern="[a-zA-Z\s'\-]*"
          name="name"
          id={this.nameInputId}
          onChange={this.handleChange}
          value={this.state.name}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.formLabel} htmlFor={this.phoneInputId}>
          Number
        </label>
        <input
          className={css.formInput}
          type="tel"
          name="number"
          id={this.phoneInputId}
          onChange={this.handleChange}
          value={this.state.number}
          pattern="[0-9\s\-]+"
          title="Phone number must be digits and can contain spaces and dashes"
          required
        />
        <button className={css.formButton} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmitHandle: PropTypes.func.isRequired,
};
