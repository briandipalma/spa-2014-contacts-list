import {Store} from 'flux-es6';

import {ContactsListConstants} from './ContactsListConstants';

var contacts = new Map();

export default class extends Store {
	getState() {
	}

	handleAction(payload) {
		var action = payload.action;

		switch (action.actionType) {
			case ContactsListConstants.CONTACT_STATUS_CHANGED:
				var contact = action.contact;
				contacts.get(contact).status = action.status;
				break;
			case ContactsListConstants.CONTACTS_LIST_RECEIVED:
				contacts = action.contacts;
				break;
			default:
				return true;
		}

		this.emitChange();

		return true;
	}
}