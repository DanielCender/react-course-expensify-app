import {
	addExpense,
	editExpense,
	removeExpense,
	startAddExpense,
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const createMockStore = configureMockStore([thunk]);

test('should remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc',
	});
});

test('should edit expense action object', () => {
	const action = editExpense('123abc', {
		note: 'new note',
	});
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'new note',
		},
	});
});

test('should add expense action object', () => {
	const action = addExpense(expenses[1]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenses[1],
		},
	});
});

test('should add expense to database and store', done => {
	const store = createMockStore({});

	const expenseData = {
		description: 'Mouse',
		amount: 3099,
		note: 'A better one',
		createdAt: 1999,
	};

	store
		.dispatch(startAddExpense(expenseData))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData,
				},
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', () => {
	const store = createMockStore({});

	const expenseDefaults = {
		description: '',
		amount: 0,
		note: '',
		createdAt: 0,
	};

	store
		.dispatch(startAddExpense({}))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseDefaults,
				},
			});
			return database.ref(`expenses/${actions[0].expense.id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

// test('should setup add expense action object with default values', () => {
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			description: '',
// 			note: '',
// 			amount: 0,
// 			createdAt: 0,
// 			id: expect.any(String),
// 		},
// 	});
// });
