import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import { Box } from './Box';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addToContact = ({ name, number }) => {
    const lowerCasedName = name.toLowerCase();
    const { contacts } = this.state;
    let added = contacts.find(
      contact => contact.name.toLowerCase() === lowerCasedName
    );

    if (added) {
      alert(`${name} is already in contacts`);
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

  renderCondition = () => {
    const { contacts } = this.state;
    if (contacts.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { filter } = this.state;
    const addToContact = this.addToContact;
    const changeFilter = this.changeFilter;
    const filteredContacts = this.filteredContacts();
    const deleteContact = this.deleteContact;

    return (
      <Box as="main" py={3} width="100%">
        <Container>
          <h2>Phonebook</h2>
          <ContactForm onSubmit={addToContact} />

          {this.renderCondition() ? (
            <>
              <h2>Contacts</h2>
              <Filter value={filter} onChange={changeFilter} />
              <ContactList
                contacts={filteredContacts}
                onDeleteContact={deleteContact}
              />
            </>
          ) : (
            'There is no contacts'
          )}
        </Container>
      </Box>
    );
  }
}
