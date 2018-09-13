import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize-css/normalize.css';
import './styles/styles.scss';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const state = store.getState();
store.dispatch(
	addExpense({
		description: 'A Gas bill',
		amount: 2000,
		createdAt: 1000,
	}),
);

store.dispatch(
	addExpense({
		description: 'A water bill',
		amount: 4000,
	}),
);

store.dispatch(
	addExpense({
		description: 'Rent',
		amount: 109500,
	}),
);
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
