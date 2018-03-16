import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';


test('check amount of visible expenses with 1 expense', () => {
    const wrapper = shallow(
        <ExpensesSummary
         expenses={[expenses[0]]} 
        />);
    expect(wrapper).toMatchSnapshot();
});

test('check total of visible expenses with multiple expenses', () => {
    const wrapper = shallow(
        <ExpensesSummary
         expenses={expenses} 
        />);
    expect(wrapper).toMatchSnapshot();    
});