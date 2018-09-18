import * as firebase from 'firebase';

var config = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// //	child_removed sub
// database.ref('expenses').on('child_removed', snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// //	child_changed sub
// database.ref('expenses').on('child_changed', snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// //	child_added
// database.ref('expenses').on('child_added', snapshot => {
// 	console.log(snapshot.key, snapshot.val());
// });

// const expensesSub = database.ref('expenses').on('value', snapshot => {
// 	const expenses = [];
// 	snapshot.forEach(child => {
// 		expenses.push({
// 			id: child.key,
// 			...child.val(),
// 		});
// 	});
// 	console.log(expenses);
// });

// setTimeout(() => {
// 	database.ref('expenses').push({
// 		description: 'Coffee Beans',
// 		note: 'Expensive blend',
// 		amount: 4500,
// 		createdAt: 5954343,
// 	});
// }, 3000);

// database.ref('expenses').push({
// 	description: 'Coffee',
// 	note: 'Expensive blend',
// 	amount: 450,
// 	createdAt: 5999,
// });

// database.ref('expenses').push({
// 	description: 'Scone',
// 	note: 'Fancy',
// 	amount: 300,
// 	createdAt: 5999,
// });

// database.ref('expenses').push({
// 	description: 'Roast Beef',
// 	note: 'Like they make in the old country',
// 	amount: 20000,
// 	createdAt: 4399999,
// });

// database
// 	.ref()
// 	.set({
// 		name: 'Daniel',
// 		age: 20,
// 		stressLevel: 7,
// 		job: {
// 			title: 'Software Dev',
// 			company: 'CORE',
// 		},
// 		location: {
// 			city: 'Frisco',
// 			country: 'USA',
// 			street: 'Hickory',
// 		},
// 	})
// 	.then(() => {
// 		console.log('Data is saved!');
// 	})
// 	.catch(e => {
// 		console.log(e);
// 	});

// // database.ref().set('This is my data');

// // database.ref('age').set(27);

// // database.ref('name').set('Daniel Cender');
// // database.ref('location/city').set('Dallas');
