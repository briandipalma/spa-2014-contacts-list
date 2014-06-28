# spa-2014-contacts-list

Topic - WebComponents
---------------------

http://slides.com/kybernetikos/webcomponents

Workshop - Contacts List
------------------------

The next package that we look at is the contacts list.
It is a custom element that shows a list of contacts for our chat application.

To start

    git clone https://github.com/briandipalma/spa-2014-contacts-list

1. Open `index.html`

	There is one new `script` tag.
	It's the Custom Elements polyfill, part of the polymer project.
	https://github.com/Polymer/CustomElements
	
	`System.config` has `css` and `text` loading plugins which allow the `System` module loader to load css and text.
	The CSS plugin automatically attaches the css to the head as soon as you import the css module.
	The text plugin returns the content of the file as a javascript string.
	The other packages are for integration later.

2. Open `src/index.js`

	This is our package's entry point. It's also the module that's loaded in the `index.html` file.
	You can see that it re-exports `ContactsListElement` from the `'./ContactsListElement'` module.
	The name it re-exports it as is `ContactsListElement`.

3. Open `src/ContactsListElement.js`

	The module exports a class that extends `HTMLElement` and has the Custom Element callbacks as methods.
	
	A Custom Element is just a HTML element so standard DOM methods will work on it.
	For example in the `createdCallback` callback the element injects its template into its DOM structure.
	
	```javascript
	this.innerHTML = contactsListTemplate;
	```
	
	All DOM methods can be now run on the `this` pointer. 
	For instance if you wanted to add an event listener to your element you would write.
	
	```javascript    
	this.addEventListener('event', (event) => console.log('click'));
	```

4. Serve the package

	All these packages can be served by a static server rooted at the package directory.
	One is included in the package and can be launched with the command.
	
	```bash
	$ npm run serve
	```
	
	The included server will serve the package at http://127.0.0.1:8080
	Opening the console should show none of the log lines from the element.

5. Register the custom element

	For the browser to match up a Custom Element tag name with your JS Custom Element class you need to register it.
	The method to use for registration is `document.registerElement`.
	It expects the element type (tagname) and then the element class to be passed in.
	
	Inside `index.html` register `ContactsListElement` under the name `spa2014-contacts-list`.
	The module object will provide the element as `module.ContactsListElement` since it's exported by `index`.
	
	Now add a `spa2014-contacts-list` tag to the body of the page.
	Refresh and verify that the element logs are in the console.

6. Create the custom element template

	Custom Elements may have static and dynamic content.
	For storing static content you may find templates convenient.
	Templates, the Web Components specification, is one way of representing an element's template.
	For this package we are instead showing how you can use the ES6 module loader to achieve the same effect.

	This package's template is kept in `template/contactsList.text`, opening it you will see it's empty.

	The template should have a header with the text 'Contacts', an `<hr>` and a `<section>` for the contacts to be
	placed. Something like this would be the simplest.

	```html
	<div>Contacts</div>
	<hr>
	<section>
	</section>
	```

	Reloading should show your template inside the Custom Element.
	You can use the browser development tools to investigate the internals of the element.

	As you will add the contacts to the `<section>` element you might find it useful to have a reference to it.
	The best place to do this would be after the element is attached to the DOM in `attachedCallback`.
	As the class is an element you can use `this.querySelector(...)` to find the section element.
	Store it as a class member variable named `this.contactsContainer`.

7. Model

	As there is no default model solution for Web Components we've had to provide our own.
	This custom element is already wired up to be notified of model changes.
	`render` is the function that's called whenever the state changes.
	
	The `state` member variable holds the information that needs to be added to the DOM, it's an ES6 Map.
	It's keys are usernames and the values are a objects containing contact data.

	The contact data has the keys `status` (value of `online` or `offline`) and `imageSource` which is an avatar URL.

	Here is an example contact data Object.

	```javascript
	{
		status: "online",
		imageSource: "https://avatars0.githubusercontent.com/u/598730?s=140"
	}
	```

	Verify that state has contact data by using the `forEach()` Map method and logging the data.
	The callback that you provide `forEach()` is given the value as the first argument.
	As you are only interested in two fields on the contact data this would an opportunity to use destructuring.
	You can also use an arrow function to reduce the boilerplate.

	If you don't remember how destructuring works here's an example.

	```javascript
	({status}) => {}
	```

	Once you reload you should see logging for a couple of contacts.

8. Render the contacts

	We will use a document fragment to hold the DOM to add while iterating over the `state` Map.
	If you are unsure how document fragements work at the top of your `render` method add

	```javascript
	var documentFragment = document.createDocumentFragment();
	```

	After your `forEach()` attach the document fragment to the contacts container.

	```javascript
	this.contactsContainer.appendChild(documentFragment);
	```

	Inside your Map iteration create a `contactRow` `div` to hold the contact data using `document.createElement`.
	Create a `span` for the contact name and an `img` for the `imageSource` value for the contact avatar.
	Set the contact name using `textContent` on your `contactName` `span` and `imageSource` on the `img` `src`.

	Using `appendChild` add the avatar and contact name to the `contactRow` and the row to the document fragment.
	When you reload you should now have your contacts displayed.

9. Add an event listener 

	We will add an event listener to react to contact selection.
	Like other DOM methods `addEventListener` is called with the class as the target of the method.
	The `attachedCallback` is the most logical place to register the event listener.

	```javascript
	this.addEventListener('click', callback);
	```

	You can use either arrow functions or function binding to callback the `_onContactSelected` method.
	Pass the mouse event in to `_onContactSelected` if you are using arrow functions. Like so

	```javascript
	(mouseEvent) => this._onContactSelected(mouseEvent)
	```

	In `_onContactSelected` use destructuring to extract the relevant details from the event.
	Destructuring works to multiple levels. You want two values from the event `target`, `tagName` and `textContent`.

	We only want to react to clicks on the contact row.
	So verify that the tag name is a `DIV` before executing the action.

	```javascript
	if (tagName === 'DIV') {
		this.contactsListActions.contactSelected(textContent);
	}
	```

	Reload the page in the browser, and click on one of the contact rows. You should see a log line in the console.
	Look at `contactSelected` in `src/ContactsListActions.js` to see the log line which uses String templates.

Now it's time to integrate this Custom Element in an application.
