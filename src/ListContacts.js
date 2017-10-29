import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import escapteRegExp from 'escape-string-regexp'
import sortBy from 'sort-by';

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        removeContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({
            query: ''
        })
    }

    render() {

        const { contacts, removeContact } = this.props
        const { query } = this.state;
        let shwoingContacts

        if (query) {
            const match = new RegExp(escapteRegExp(query), 'i')
            shwoingContacts = contacts.filter((contact) => match.test(contact.name))
        } else {
            shwoingContacts = this.props.contacts
        }

        shwoingContacts.sort(sortBy('name'))

        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input type="text"
                           className="search-contacts"
                           placeholder="Search Contacts"
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link to="/create" className="add-contact">Add Contact</Link>
                </div>

                {shwoingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now Showing {shwoingContacts.length} of {contacts.length}</span>
                        <button onClick={this.clearQuery}>Show All</button>
                    </div>
                )}

                <ol className="contact-list">
                    {
                        shwoingContacts.map((contact, index) => (
                            <li key={index} className="contact-list-item">
                                <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL})`}} />
                                <div className="contact-details">
                                    <p>{contact.name}</p>
                                    <p>{contact.email}</p>
                                </div>
                                <button onClick={() => removeContact(contact)} className="contact-remove">
                                    Remove
                                </button>
                            </li>
                        ))
                    }
                </ol>
            </div>
        )
    }
}

export default ListContacts;