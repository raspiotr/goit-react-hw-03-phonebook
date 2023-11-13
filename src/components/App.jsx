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

    try {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      const contactsFromStorage = JSON.parse(localStorage.getItem('contacts'));
      if (contactsFromStorage.length === 0) {
        localStorage.removeItem('contacts');
      }
    } catch (error) {
      alert(error);
    }
  };

  componentDidMount() {
    try {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        this.setState({
          contacts: JSON.parse(storedContacts),
        });
      }
    } catch (error) {
      alert(error);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      try {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      } catch (error) {
        alert(error);
      }
    }
  }

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
