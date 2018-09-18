import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';
import { start } from 'repl';

let startLogout, wrapper;

beforeEach(() => {
	startLogout = jest.fn();
	wrapper = shallow(<Header startLogout={startLogout} />);
});

test('should render Header correctly', () => {
	const wrapper = shallow(<Header startLogout={startLogout} />);
	expect(wrapper).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
	wrapper.find('button').simulate('click', {});
	expect(startLogout).toHaveBeenCalled();
});

test('LoginPage test file -> should call startLogin on button click', () => {});
