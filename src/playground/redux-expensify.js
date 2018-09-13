import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

//	ADD_EXPENSE
const addExpense = ({
	description = '',
	note = '',
	amount = 0,
	createdAt = 0,
} = {}) => ({
	type: 'ADD_EXPENSE',
	expense: {
		id: uuid(),
		description,
		note,
		amount,
		createdAt,
	},
});

//	EDIT_EXPENSE
const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates,
});

//	REMOVE_EXPENSE
const removeExpense = ({ id = '' } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id,
});

//	SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
	type: 'SET_TEXT_FILTER',
	text,
});

//	SORT_BY_DATE
const sortByDate = () => ({
	type: 'SORT_BY_DATE',
});
//	SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: 'SORT_BY_AMOUNT',
});
//	SET_START_DATE
const setStartDate = (startDate = undefined) => ({
	type: 'SET_START_DATE',
	startDate,
});
//	SET_END_DATE
const setEndDate = (endDate = undefined) => ({
	type: 'SET_END_DATE',
	endDate,
});

//	Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch (action.type) {
		case 'ADD_EXPENSE':
			return [...state, action.expense];
		case 'REMOVE_EXPENSE':
			return state.filter(expense => expense.id !== action.id);
		case 'EDIT_EXPENSE':
			return state.map(expense => {
				if (expense.id === action.id) {
					return {
						...expense,
						...action.updates,
					};
				} else {
					return expense;
				}
			});
		default:
			return state;
	}
};

// Filters Reducer
const filtersReducerDefaultState = {
	text: '',
	sortBy: 'date',
	startDate: undefined,
	endDate: undefined,
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
			return {
				...state,
				text: action.text,
			};
		case 'SORT_BY_DATE':
			return {
				...state,
				sortBy: 'date',
			};
		case 'SORT_BY_AMOUNT':
			return {
				...state,
				sortBy: 'amount',
			};
		case 'SET_START_DATE':
			return {
				...state,
				startDate: action.startDate,
			};
		case 'SET_END_DATE':
			return {
				...state,
				endDate: action.endDate,
			};
		default:
			return state;
	}
};

//	timestamps
//	Unix Epoch is 0
//	January 1st, 1970
//	33400, 10, -203

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses
		.filter(expense => {
			const startDateMatch =
				typeof startDate !== 'number' || expense.createdAt >= startDate;
			const endDateMatch =
				typeof endDate !== 'number' || expense.createdAt <= endDate;
			const textMatch = expense.description
				.toLowerCase()
				.includes(text.toLowerCase());
			//	check if the expense.description has the text string inside it

			return startDateMatch && endDateMatch && textMatch;
		})
		.sort((a, b) => {
			if (sortBy === 'date') {
				return a.createdAt < b.createdAt ? 1 : -1;
			} else if (sortBy === 'amount') {
				return a.amount < b.amount ? 1 : -1;
			}
		});
};

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer,
	}),
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const { expense: expense1 } = store.dispatch(
	addExpense({ description: 'Rent', amount: 100, createdAt: -21000 }),
);
const { expense: expense2 } = store.dispatch(
	addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }),
);

// store.dispatch(removeExpense({ id: expense1.id }));

// store.dispatch(editExpense(expense1.id, { amount: 500 }));

// store.dispatch(setTextFilter('fe'));
// store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// // store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
	expenses: [
		{
			id: '432ntdjskl;',
			description: 'January Rent',
			note: 'Some note about the expense',
			amount: 54500,
			createdAt: 0,
		},
		{
			id: '432ntdjskfdsafds;',
			description: 'February Rent',
			note: 'Some note about the expense',
			amount: 54500,
			createdAt: 0,
		},
	],
	filters: {
		text: 'rent',
		sortBy: 'date', // date or amount
		startDate: undefined,
		endDate: undefined,
	},
};
