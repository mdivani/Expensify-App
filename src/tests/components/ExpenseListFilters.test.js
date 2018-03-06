import React from 'react';
import {shallow} from 'enzyme';
import {ExpenseListFilter} from '../../components/ExpenseListFilter';
import { filter, altFilter } from '../fixtures/filters';
import moment from 'moment';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilter
            filter={filter}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    )
});

test('should render expenseListFilter correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render alt Filter correctly', () => {
    wrapper.setProps({
        filter: altFilter
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', ()=>{
    const value='rent';
    wrapper.find('input').simulate('change', {
        target: {value}
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', ()=>{
    const value = 'date';
    wrapper.setProps({
        filter: altFilter
    });
    wrapper.find("select").simulate('change', {
        target: { value }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', ()=>{
    const value = 'amount';
    wrapper.find("select").simulate('change', {
        target: { value }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

test('shoud handle date changes', ()=>{
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus change', ()=>{
    const calendarFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});
