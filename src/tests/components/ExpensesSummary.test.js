import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should correctly render an expense summary for 3 expenses', () => {
	const wrapper = shallow(
		<ExpensesSummary expenseCount={3} expensesTotal={300} />,
	);
	expect(wrapper).toMatchSnapshot();
});

test('should correctly render summary for 2 expenses', () => {
	const wrapper = shallow(
		<ExpensesSummary expenseCount={2} expensesTotal={500} />,
	);
	expect(wrapper).toMatchSnapshot();
});
