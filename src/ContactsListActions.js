import {ContactsListConstants} from "./ContactsListConstants";

export default class {
	constructor(contactsListDispatcher) {
		this.contactsListDispatcher = contactsListDispatcher;
	}

	contactSelected(contact) {
		this.contactsListDispatcher.handleViewAction({
			actionType: ContactsListConstants.CONTACT_SELECTED,
			contact: contact
		});
	}

	contactStatusChanged(contact) {
		this.contactsListDispatcher.handleServerAction({
			actionType: ContactsListConstants.CONTACT_STATUS_CHANGED,
			contact: contact
		});
	}

	contactStatusChanged(contacts) {
		this.contactsListDispatcher.handleServerAction({
			actionType: ContactsListConstants.CONTACTS_LIST_RECEIVED,
			contacts: contacts
		});
	}
};