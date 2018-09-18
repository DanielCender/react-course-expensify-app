import {
	addExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense,
	startAddExpense,
	setExpenses,
	startSetExpenses,
} from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from '../../firebase/firebase';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const uid = 'thisisatestuid';
const createMockStore = configureMockStore([thunk]);

beforeEach(done => {
	const expensesData = {};

	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt };
	});

	database
		.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done());
});

test('should remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc',
	});
});

test('should remove expense from firebase', done => {
	const store = createMockStore({ auth: { uid } });
	const id = expenses[0].id;
	store
		.dispatch(startRemoveExpense({ id }))
		.then(() => {
			const actions = store.getActions();
			expect(actions).toEqual([
				{
					type: 'REMOVE_EXPENSE',
					id,
				},
			]);
			return database.ref(`users/${uid}/expenses/${id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toBeFalsy();
			done();
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

test('should edit expense in firebase database', done => {
	const store = createMockStore({ auth: { uid } });
	const id = expenses[1].id;
	const updates = {
		amount: 100000000,
	};
	store
		.dispatch(startEditExpense(id, updates))
		.then(() => {
			const actions = store.getActions();
			expect(actions[0]).toEqual({
				type: 'EDIT_EXPENSE',
				id,
				updates,
			});
			return database.ref(`users/${uid}/expenses/${id}`).once('value');
		})
		.then(snapshot => {
			expect(snapshot.val().amount).toBe(updates.amount);
			done();
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
	const store = createMockStore({ auth: { uid } });

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
			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData);
			done();
		});
});

test('should add expense with defaults to database and store', done => {
	const store = createMockStore({ auth: { uid } });

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
			return database
				.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
				.once('value');
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults);
			done();
		});
});

test('should setup set expense action object with data', () => {
	const result = setExpenses(expenses);
	expect(result).toEqual({
		type: 'SET_EXPENSES',
		expenses,
	});
});

test('should fetch the current expenses from firebase', done => {
	const store = createMockStore({ auth: { uid } });
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses,
		});
		done();
	});
});
