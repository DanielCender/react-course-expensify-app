// const person = {
// 	name: 'Daniel',
// 	age: '20',
// 	location: {
// 		city: 'Frisco',
// 		temp: 68,
// 	},
// };

// const { name: firstName = 'Anon', age = 'unknown' } = person;
// console.log(`${firstName} is ${age}.`);

// const { city = 'Dallas', temp: temperature } = person.location;
// if (city && temperature) {
// 	console.log(
// 		`He lives in ${city}, where it is ${temperature} degrees right now.`,
// 	);
// }

// const book = {
// 	title: 'Ego is the Enemy',
// 	author: 'Ryan Holiday',
// 	publisher: {
// 		name: 'Penguin',
// 	},
// };

// const { name: publisherName = 'Self-Published' } = book.publisher;
// console.log(publisherName);

//
//	Array destructuring
//

// const address = ['1299 S Juniper Street', 'Frisco', 'Texas', '75033'];
// const [, city = 'New York', state = 'New York'] = address; // No renaming syntax, cause you already control naming
// console.log(`You are in ${city}, ${state}`);

const item = ['Coffee (hot)', '$3.00', '$4.50', '$4.75'];

const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);
