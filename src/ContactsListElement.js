import {createStoreAndActions} from 'flux-es6';

import ContactsListStore from './ContactsListStore';
import ContactsListActions from './ContactsListActions';

import '../style/index.css!';
import contactsListTemplate from '../template/contactsList.text!';

export class ContactsListElement extends HTMLElement {
	// Fires when an instance of the ContactsListElement is created
	createdCallback() {
		var [contactsListStore, contactsListActions] = createStoreAndActions(ContactsListStore, ContactsListActions);

		this.innerHTML = contactsListTemplate;
		this.contactsListStore = contactsListStore;
		this.contactsListActions = contactsListActions;
	}

	// Fires when the instance is inserted into the document
	attachedCallback() {
		this.contactsListStore.addChangeListenerAndNotify(this.contactsListStoreChanged, this);
	}

	// Fires when the instance is removed from the document
	detachedCallback() {}

	// Fires when an attribute is added, removed, or updated
	attributeChangedCallback(attr, oldVal, newVal) {}

	render() {
	}

	contactsListStoreChanged() {
		this.props = this.contactsListStore.getState();
		this.render();
	}

	get contactsListDispatcher() {
		return this.contactsListActions.contactsListDispatcher;
	}

	_onContactSelected() {
		this.contactsListActions.contactSelected(contact);
	}
}