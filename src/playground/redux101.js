import { createStore } from 'redux';

//	Action generators - functions that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy,
});

const setCount = ({ count = 0 } = {}) => ({
	type: 'SET',
	count,
});

const resetCount = () => ({
	type: 'RESET',
});

//	Reducers
//	1. Reducers are pure functions - they don't interact with anything outside them
//	2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return Object.assign({}, state, {
				count: action.incrementBy,
			});
		case 'DECREMENT':
			return Object.assign({}, state, {
				count: state.count - action.decrementBy,
			});
		case 'RESET':
			return Object.assign({}, state, {
				count: 0,
			});
		case 'SET':
			return Object.assign({}, state, {
				count: action.count,
			});
		default:
			return state;
	}
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
});

//	Increment the count
store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(incrementCount());

//	Reset the count to zero
store.dispatch(resetCount());

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(setCount({ count: -101 }));
