import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddContact = contact => {
    const { contacts } = this.state;
    if (
      contacts.find(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} is already in contacts :)`);
      return;
    }
    const id = nanoid();
    console.log(contact);
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, ...contact }],
    }));
  };

  handleDelete = event => {
    event.preventDefault();
    const idToDelete = event.target.id;
    const { contacts } = this.state;
    const indexToDelete = contacts.findIndex(
      contact => contact.id === idToDelete
    );
    contacts.splice(indexToDelete, 1);
    this.setState({ contacts: contacts });
  };

  render() {
    const { contacts, filter } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmitHandle={this.handleAddContact} />
        <h2>Contacts</h2>
        <Filter onChangeHandle={this.handleChange} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteHandle={this.handleDelete}
        />
      </div>
    );
  }
}
