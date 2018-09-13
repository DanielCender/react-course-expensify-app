import expensesReducer from '../../reducers/expenses';
import expenses from './../fixtures/expenses';

test('should set state to default values', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[0].id,
	};

	const state = expensesReducer(expenses, action);
	expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '123abc',
	};

	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

test('should add an expense', () => {
	const expense = {
		id: '5',
		description: 'Rent',
		amount: 109500,
		createdAt: 0,
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense,
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
	const description = 'A new one';
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			description,
		},
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].description).toBe(description);
});

test('should not edit expense if expense not found', () => {
	const description = 'A new one';
	const action = {
		type: 'EDIT_EXPENSE',
		id: '123abd',
		updates: { description },
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});
