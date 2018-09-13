import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseForm with expense data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {},
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
	const value = 'New Description';
	const wrapper = shallow(<ExpenseForm />);
	wrapper
		.find('input')
		.at(0)
		.simulate('change', {
			target: { value },
		});
	expect(wrapper.state('description')).toBe(value);
});

test('should set note on textarea change', () => {
	const value = 'New Note';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('textarea').simulate('change', {
		target: { value },
	});
	expect(wrapper.state('note')).toBe(value);
});

test('should set amount on valid input', () => {
	const value = '25.99';
	const wrapper = shallow(<ExpenseForm />);
	wrapper
		.find('input')
		.at(1)
		.simulate('change', {
			target: { value },
		});
	expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount on invalid input', () => {
	const value = '25.99999';
	const wrapper = shallow(<ExpenseForm />);
	wrapper
		.find('input')
		.at(1)
		.simulate('change', {
			target: { value },
		});
	expect(wrapper.state('amount')).toBe('');
});

test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(
		<ExpenseForm onSubmit={onSubmitSpy} expense={expenses[1]} />,
	);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {},
	});
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[1].description,
		amount: expenses[1].amount,
		note: expenses[1].note,
		createdAt: expenses[1].createdAt,
	});
});

test('should set new date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toBe(now);
});

test('should set calendarFocused to true on focus change', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({
		focused,
	});
	expect(wrapper.state('calendarFocused')).toBe(focused);
});
