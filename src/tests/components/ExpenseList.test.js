import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';

import { ExpenseList } from '../../components/ExpenseList';

test('should correctly render ExpenseList', () => {
	const wrapper = shallow(<ExpenseList expenses={expenses} />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
	const wrapper = shallow(<ExpenseList expenses={[]} />);
	expect(wrapper).toMatchSnapshot();
});
