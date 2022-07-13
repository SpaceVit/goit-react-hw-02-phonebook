import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Box } from './Box';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addToContact = ({ name, number }) => {
    const lowerCasedName = name.toLowerCase();
    const { contacts } = this.state;
    let added = false;

    contacts.forEach(el => {
      if (el.name.toLowerCase() === lowerCasedName) {
        alert(`${name} is already in contacts`);
        added = true;
      }
    });

    if (added) {
      return;
    }

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filteredContacts = () => {
    const { filter, contacts } = this.state;
    const lowerCasedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCasedFilter)
    );
  };

  deleteContact = deleteContactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== deleteContactId
      ),
    }));
  };

  render() {
    const { filter } = this.state;
    const addToContact = this.addToContact;
    const changeFilter = this.changeFilter;
    const filteredContacts = this.filteredContacts();
    const deleteContact = this.deleteContact;

    return (
      <Box as="main" p={3}>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={addToContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContact}
        />
      </Box>
    );
  }
}
